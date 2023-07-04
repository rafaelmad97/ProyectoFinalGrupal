const mercadopago = require("mercadopago")
require('dotenv').config();

function configMercadoPago() {
    mercadopago.configure({
        access_token: process.env.MERCADOPAGOTOKEN
    })
}

module.exports = {
    CreateOrder: (req, res, next) => {
        configMercadoPago()

        mercadopago.preferences.create({
            items: [
                { q }
            ]
        })

    }
}