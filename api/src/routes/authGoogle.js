const Express = require("express");
const passport = require("passport");
const googleStrategy = require("../config/passport-google-strategy");
passport.initialize();
passport.use(googleStrategy);

function serializeUser(user, done) {
  done(null, user);
}

function deserializeUser(user, done) {
  done(null, user);
}

passport.deserializeUser(deserializeUser);
passport.serializeUser(serializeUser);

var Router = Express.Router();
Router.get("/login/federated/google", passport.authenticate("google"));

Router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: `${process.env.FRONTEND}/home`,
    failureRedirect: `${process.env.FRONTEND}/login`,
  })
);

Router.get("/authenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ status: "f en chat" });
  }
});

Router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});

module.exports = Router;
