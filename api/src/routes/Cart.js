const router = require("express").Router()
const cors = require("cors");
const { RemoveProductInCart, GetCartByAUser, AddProduct } = require("../controllers/Cart");

router.use(cors())

router.route("/add-product").post(AddProduct)
router.route("/remove-product").delete(RemoveProductInCart)
router.route("/user/:id").get(GetCartByAUser)

module.exports = router