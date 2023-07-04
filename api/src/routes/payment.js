const router = require("express").Router()
const cors = require("cors")
const { CreateOrder } = require("../controllers/payment")

router.use(cors())

router.route("/create-order").get()
router.route("/succes").get()
router.route("/webhook").get()
