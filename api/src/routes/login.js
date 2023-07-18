const router = require("express").Router();
const cors = require("cors");
const {
  RemoveProductInCart,
  GetCartByAUser,
  AddProduct,
} = require("../controllers/Cart");
const passport = require("passport");

const localStrategy = require("../config/passport-localStrategy");
passport.use(localStrategy);

function serializeUser(user, done) {
  done(null, user.id);
}

async function deserializeUser(id, done) {
  await User.findByPk(id)
    .then((user) =>


      done(null, user)
    
  
    )
    .catch((err) => {
      done(err, false);
    });
}

// router.use(cors());

router.route("/").post((req, res, next) => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ message: "Login Failed" });
    if(!user.isactive) return res.status(400).json({message: "EL usuario esta deshabilitado"})
    req.logIn(user, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Login with exite" });
    });
  })(req, res, next);
});

router.get("/authenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ status: "no logged" });
  }
});

router.get("/logout", async (req, res) => {
  await req.session.destroy();

  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});
module.exports = router;
