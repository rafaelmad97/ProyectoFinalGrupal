const { Router } = require("express");
const user = require("./user");
const admin = require("./Admin");
const productRouter = require("./product.js");
const router = Router();
const categoria = require("./category");
const Cart = require("./Cart");
const login = require("./login");
<<<<<<< HEAD
const filter = require("./filterAndSort");
=======
const filter = require("./filters");
const email = require("./email");
>>>>>>> 813b0484310a0634d5eabaf48998dacc15cef7e4

router.use("/products", productRouter);
router.use("/users", user);
router.use("/admin", admin);
router.use("/categoria", categoria);
router.use("/cart", Cart);
router.use("/login", login);
router.use("/filters", filter);
<<<<<<< HEAD

=======
router.use("/email", email);
>>>>>>> 813b0484310a0634d5eabaf48998dacc15cef7e4
module.exports = router;
