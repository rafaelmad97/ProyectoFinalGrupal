const { Router } = require("express");
const user = require("./user");
const admin = require("./Admin");
const productRouter = require("./product.js");
const router = Router();
const categoria = require("./category");
const Cart = require("./Cart");
const login = require("./login");
const filter = require("./filterAndSort");
const email = require("./email");
const authGoogle = require("./authGoogle");
const payment = require("./payment");
const reviewsRouter = require("./reviewsRouter")

router.use("/", authGoogle);
router.use("/products", productRouter);
router.use("/users", user);
router.use("/admin", admin);
router.use("/categoria", categoria);
router.use("/cart", Cart);
router.use("/login", login);
router.use("/filters", filter);
router.use("/email", email);
router.use("/payment", payment);
router.use("/reviews", reviewsRouter);

module.exports = router;
