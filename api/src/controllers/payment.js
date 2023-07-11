const mercadopago = require("mercadopago")
const { User, Product, Historial, HistorialSells, Cart } = require("../db");
const sendEmail = require("./Email");
require('dotenv').config();

function configMercadoPago() {
    mercadopago.configure({
        access_token: process.env.MERCADOPAGOTOKEN
    })
}


module.exports = {
    CreateOrder: async (req, res, next) => {
        configMercadoPago()

        const { id } = req.body
        console.log(id)

        try {
            if (id != undefined) {
                const user = await User.findByPk(id).catch(next)
                if (user === null) throw new Error("User isn't exist")
                const carts = await user.getCarts()

                const products = await Promise.all(carts.map(async (productInCart) => {
                    const { dataValues } = await Product.findOne({ where: { id: productInCart.ProductId } });

                    return {
                        id: dataValues.id,
                        title: dataValues.name,
                        unit_price: Number(dataValues.price),
                        quantity: productInCart.dataValues.Quantity,
                        currency_id: "ARS"
                    };
                }));



                const result = await mercadopago.preferences.create({
                    items: products,
                    back_urls: {
                        success: `${process.env.URLFRONT}/home`,
                        failure: `${process.env.URLFRONT}/payment/failure`,
                        pending: `${process.env.URLFRONT}/payment/pending`,
                    },
                    notification_url: `${process.env.URLBACK}/payment/webhook`,
                    external_reference: user.id.toString()
                }).catch(next)

                return res.status(200).json({ url: result.body.init_point })

            }
        } catch (error) {
            return next(error)
        }

    },
    receiveWebhook: async (req, res, next) => {
        configMercadoPago()
        console.log(req.query)
        if (req.query.type === "payment") {
            const data = await mercadopago.payment.findById(req.query['data.id'])
            if (data.response.status == "approved") {

                const user = await User.findByPk(Number(data.response.external_reference))

                const historial = await Historial.create({
                    userId: user.id,
                    tipoActividad: "Compra de Productos",
                    description: user.name + "ha comprado productos"
                })

                const previousCart = await user.getCarts()

                const historialSells = await HistorialSells.create({
                    previousCart: previousCart
                })

                await historial.setHistorialSell(historialSells)

                previousCart.map(async (cart) => {
                    await user.removeCart(cart.id)
                })


                sendEmail(user.email, process.env.EMAILACCOUNT, "Compra Realizada", require("../email-templates/payment"))


            }
            return res.status(204)
        }
        return res.status(204)
    }
}