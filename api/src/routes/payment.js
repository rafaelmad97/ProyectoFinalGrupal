// const router = require("express").Router()
// const cors = require("cors")
// const { CreateOrder, receiveWebhook } = require("../controllers/payment")

// router.use(cors())

// router.route("/create-order").post(CreateOrder)

// router.route("/webhook").post(receiveWebhook)


// module.exports = router

const { Router } = require("express");
const mercadopago = require("mercadopago");
const router = Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Transaccion, User, Product } = require("../db");
const sendEmail = require("../controllers/Email");


mercadopago.configure({ access_token: process.env.MERCADOPAGOTOKEN });

const IVA = 1.18;

router.post("/", (req, res) => {
  const { carrito, type } = req.body;
  const id = req.user ? req.user.id : undefined

  console.log(req.session)

  let preference = {
    items: [],
    back_urls: {
      success: `${process.env.FRONTEND}/home`,
      failure: `${process.env.FRONTEND}/home`,
      pending: `${process.env.FRONTEND}/home`,
    },
    auto_return: "approved",
    binary_mode: true,
    external_reference: id,
    notification_url: `${process.env.BACKEND}/payment/feedback`

  };
  console.log(preference);
  if (Array.isArray(carrito)) {
    carrito.forEach((item) => {
      preference.items.push({
        id: item.id,
        title: item.title,
        currency_id: "ARS",
        quantity: item.quantity,
        unit_price: Number(item.price * IVA),
      });
    });
  } else {
    preference.items.push({
      title: carrito.title,
      currency_id: "ARS",
      quantity: carrito.quantity,
      unit_price: Number(carrito.price * IVA),
    });
  }

  mercadopago.preferences
    .create({ ...preference })
    .then((response) => {
      if (response.body.init_point) {

        const transaction = Transaccion.create({
          monto_total: calcularMontoTotal(preference.items),
          items_vendidos: JSON.stringify(preference.items),

        })
          .then((transaccion) => {

            res.status(200).json({
              init_point: response.body.init_point,
              transaccionId: transaccion.id,
            });

          })
          .catch((error) => {
            res.status(500).send({ error: 'Error al guardar la transacción' });
          });


      } else {
        res.status(400).send({ error: 'No init_point found in the response' });
      }
    })
    .catch((error) => res.status(400).send({ error: error.message }));
});

router.post("/feedback", async function (req, res) {
  const data = req.query;
  console.log(data)
  if (data.type === "payment") {
    const { response } = await mercadopago.payment.findById(req.query['data.id'])
    console.log(response.additional_info)
    if (response.status == "approved") {
      let user
      if (response.external_reference != undefined) {
        user = await User.findByPk(Number(response.external_reference))
        const previousCart = await user.getCarts()

        previousCart.map(async (cart) => {
          await user.removeCart(cart.id)
        })

        sendEmail(process.env.EMAILACCOUNT, user.email, "Compra Realizada", require("../email-templates/payment"))
      }
      response.additional_info.items.map(async item => {
        const product = await Product.findByPk(item.id)
        product.stock -= item.quantity
        await product.save()
        if (product.stock <= 0) {
          product.isactive = false;
          await product.save()
        }
      })


    }
  }

  return res.status(200).json(data)
});

module.exports = router;


function calcularMontoTotal(items) {
  let total = 0;

  items.forEach((item) => {
    total += item.unit_price * item.quantity;
  });

  return total;
}