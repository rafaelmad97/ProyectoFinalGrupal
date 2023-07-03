const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../db");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    console.log("passport");
    //match Email's User
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: "Not User Found" });
    } else {
      const match = bcrypt.compareSync(password, user.password);

      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    }
  }
);

module.exports = localStrategy;
