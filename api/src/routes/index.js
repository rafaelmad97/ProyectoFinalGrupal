const { Router } = require("express");
const user = require("./user");
const admin = require("./Admin");
const productRouter = require("./product.js");
const router = Router();
const categoria = require("./category");
const Cart = require("./Cart");
const login = require("./login");
const filter = require("./filterAndSort");

router.use("/products", productRouter);
router.use("/users", user);
router.use("/admin", admin);
router.use("/categoria", categoria);
router.use("/cart", Cart);
router.use("/login", login);
router.use("/filters", filter);

module.exports = router;
