const router = require("express").Router()
const cors = require("cors");
const { RemoveProductInCart, GetCartByAUser, AddProduct, addProductOne, getAllCart } = require("../controllers/Cart");

router.use(cors())

router.route("/add-product").post(AddProduct)
router.route("/remove-product/:idProduct/:idUser").delete(RemoveProductInCart)
router.route("/user/:id").get(GetCartByAUser)
router.route("/addProductOne").put(addProductOne)
router.route("/getCart").get(getAllCart)

module.exports = router