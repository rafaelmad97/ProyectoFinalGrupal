const router = require("express").Router()
const cors = require("cors");
const { RemoveProductInCart, GetCartByAUser, AddProduct } = require("../controllers/Cart");
const passport = require("passport");
require("../config/passport")

router.use(cors())

router.route("/").post((req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        console.log("password")
        if (err) return next(err)
        if (!user) return res.status(401).json({ message: "Login Failed" })
        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.status(200).json({ message: "Login with exite" })

        })
    })(req, res, next)
})

module.exports = router