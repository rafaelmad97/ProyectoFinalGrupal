// const mercadopago = require("mercadopago")
// const { User, Product } = require("../db");
// require('dotenv').config();

// function configMercadoPago() {
//     mercadopago.configure({
//         access_token: process.env.MERCADOPAGOTOKEN
//     })
// }


// module.exports = {
//     CreateOrder: async (req, res, next) => {
//         configMercadoPago()

//         const { id } = req.body

//         if (id != undefined) {
//             const user = await User.findByPk(id).catch(next)
//             const carts = await user.getCarts()

//             const products = await Promise.all(carts.map(async (productInCart) => {
//                 const { dataValues } = await Product.findOne({ where: { id: productInCart.ProductId } });

//                 return {
//                     id: dataValues.id,
//                     title: dataValues.name,
//                     unit_price: Number(dataValues.price),
//                     quantity: productInCart.dataValues.Quantity,
//                     currency_id: "ARS"
//                 };
//             }));



//             const result = await mercadopago.preferences.create({
//                 items: products,
//                 back_urls: {
//                     success: `${process.env.URLFRONT}/home`,
//                     failure: `${process.env.URLFRONT}/payment/failure`,
//                     pending: `${process.env.URLFRONT}/payment/pending`,
//                 },
//                 notification_url: `${process.env.URLBACK}/payment/webhook`
//             }).catch(next)

//             return res.status(200).json({ url: result.body.init_point })

//         }

//     },
//     receiveWebhook: async (req, res, next) => {
//         configMercadoPago()
//         console.log(req.query)
//         if (req.query.type === "payment") {
//             const data = await mercadopago.payment.findById(req.query['data.id'])
//             console.log(data)
//         }
//         return res.json("webhook")
//     }
// }