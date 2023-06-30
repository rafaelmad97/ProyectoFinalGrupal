const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cors())

// Analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Analizar application/json
app.use(bodyParser.json())

// Para una aplicación real, deberías configurar esto con un tiempo de expiración, claves más seguras, proxy y seguridad
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['clave1', 'clave2']
}))

// Middleware de autenticación que verifica si el usuario ha iniciado sesión
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Inicializa passport y las sesiones de passport
app.use(passport.initialize());
app.use(passport.session());

// Ejemplo de rutas protegidas y no protegidas
app.get('/', (req, res) => res.send('¡Página de inicio de ejemplo!'))
app.get('/failed', (req, res) => res.send('¡Fallaste al iniciar sesión!'))

// En esta ruta puedes ver que si el usuario ha iniciado sesión, puedes acceder a su información en: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`¡Bienvenido, Sr. ${req.user.displayName}!`))

// Rutas de autenticación
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Autenticación exitosa, redirige a la página de inicio.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log(`¡Aplicación de ejemplo escuchando en el puerto ${3000}!`))
