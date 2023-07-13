const { User } = require("../db");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env["GOOGLE_CLIENT_ID"],
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
    callbackURL: "/oauth2/redirect/google",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    state: true,
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {

      const user = await User.findByPk(profile.id)
      if(user===null) {
       

         await  User.create({
            id: Number(profile.id),
            name: profile.displayName,
            lastName: "google",
            email: profile.emails[0]?.value,
            password: "google123",
            phone: "google",
            isactive: true,
            isadmin: false,
          })
        
      }
      cb(null, {
        accessToken,
        refreshToken,
        profile,
          id:profile.id,
          isadmin: user === null? false:  user.isadmin,
          isactive: user === null? true:  user.isactive
        
      })
    } catch(e){
      cb(null, null)
    }
      
       
    
    
  }
);

module.exports = googleStrategy;
