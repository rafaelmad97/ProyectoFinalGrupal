var GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env["GOOGLE_CLIENT_ID"],
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
    callbackURL: "/oauth2/redirect/google",
    scope: ["profile", "email"],
    state: true,
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile, cb);
    cb(null, {
      accessToken,
      refreshToken,
      profile,
    });
  }
);

module.exports = googleStrategy;
