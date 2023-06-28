const { Router } = require("express");
const user = require("./user");
const admin = require("./Admin");
const productRouter = require('./product.js');
const router = Router();
const categoria = require("./category")
const Cart = require("./Cart")

router.use('/products', productRouter);
router.use("/users", user);
router.use("/admin", admin);
router.use("/categoria", categoria);
router.use("/cart", Cart)

module.exports = router;
