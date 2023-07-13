const router = require("express").Router()
const cors = require("cors");
const { RemoveProductInCart, GetCartByAUser, AddProduct, UpdateProductCart, RemoveProducts } = require("../controllers/Cart");

router.use(cors())

router.route("/add-product").post(AddProduct)
router.route("/updateitem").put(UpdateProductCart)
router.route("/remove-product").post(RemoveProductInCart)
router.route("/removeAllProduct").post(RemoveProducts)
router.route("/user/:id").get(GetCartByAUser)

module.exports = router