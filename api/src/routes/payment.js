const router = require("express").Router()
const cors = require("cors")
const { CreateOrder, receiveWebhook } = require("../controllers/payment")

router.use(cors())

router.route("/create-order").post(CreateOrder)

router.route("/webhook").post(receiveWebhook)

module.exports = router