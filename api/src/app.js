require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require("passport");

const fileUpload = require("express-fileupload")

const session = require("express-session");

const { Product } = require("./db.js");
var db = require("./db");

const server = express();
// server.use(cors())

server.name = "API";
server.use(cors({ origin: true, credentials: true }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));

server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//inicializa passport y recupera el estado de autenticacion de la sesion

server.use(passport.initialize());
server.use(passport.session());

server.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads"
}))

// server.use(express.static('public'));
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
