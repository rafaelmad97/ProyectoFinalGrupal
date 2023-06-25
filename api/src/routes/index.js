const { Router } = require("express");
const user = require("./user");
const admin = require("./Admin");
const productRouter = require('./product.js');
const router = Router();

router.use('/products', productRouter);
router.use("/users", user);
router.use("/admin", admin);

module.exports = router;
