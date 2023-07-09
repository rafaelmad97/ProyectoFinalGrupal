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
const { Transaccion } = require("../db"); 

mercadopago.configure({ access_token: process.env.MERCADOPAGOTOKEN});

router.post("/", (req, res) => {
  const {carrito} = req.body;
  let preference = {
    items: [],
    back_urls: {
      success: `${process.env.FRONTEND}/resume`,
      failure: `${process.env.FRONTEND}/resume`,
      pending: `${process.env.FRONTEND}/home`,
    },
    auto_return: "approved",
    binary_mode: true,
   
  };
    console.log(carrito);
  if (Array.isArray(carrito)) {
    carrito.forEach((item) => {
      preference.items.push({
        title: item.title,
        currency_id: "ARS",
        quantity: item.quantity,
        price: item.price,
        unit_price: Number(item.price) ,
      });
    });
  } else {
    preference.items.push({
      title: carrito.title,
      currency_id: "ARS",
      quantity: carrito.quantity,
      price: carrito.price,
      unit_price: Number (carrito.price),
    });
  }
  console.log(carrito);
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      if (response.body.init_point) {
        
        Transaccion.create({
          monto_total: calcularMontoTotal(preference.items),
          items_vendidos: JSON.stringify(preference.items), 
          
        })
        .then((transaccion) => {
          
          res.json({
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

router.get("/feedback", function (req, res) {
  const { payment_id, status, merchant_order_id } = req.query;

  res.json({
    Payment: payment_id,
    Status: status,
    MerchantOrder: merchant_order_id,
  });
});

module.exports = router;


function calcularMontoTotal(items) {
  let total = 0;
  
  items.forEach((item) => {
    total += item.price * item.quantity;
    

  });
  return total;
}