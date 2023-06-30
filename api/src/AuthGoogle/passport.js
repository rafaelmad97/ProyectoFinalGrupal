const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    /*
    A partir del usuario, solo toma el ID (para minimizar el tamaño de la cookie) y pásalo al callback "done" 
    solo con el ID del usuario.
    PD: No es necesario hacerlo exactamente así, generalmente se hace de esta manera.
    */
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    /*
    En lugar del usuario, esta función generalmente recibe el ID.
    Luego, utilizas el ID para seleccionar al usuario de la base de datos y pasar el objeto del usuario al callback "done".
    PD: Puedes acceder a estos datos más tarde en cualquier ruta utilizando "req.user".
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "879360385254-8jkso7qrnd05dpa9nqfb936tjoptnqp9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     Utiliza la información del perfil (principalmente el ID del perfil) para verificar si el usuario está registrado en tu base de datos.
     Si está registrado, selecciona al usuario y pásalo al callback "done".
     Si no está registrado, crea al usuario, luego selecciónalo y pásalo al callback.
    */
    return done(null, profile);
  }
));
