const { User } = require("../db.js");
const server = require("express").Router();
const cors = require("cors");
const Sequelize = require("sequelize");

server.use(cors());

//ACTUALIZAR ROL DE USUARIO

server.put("/promote/:id", (req, res, next) => {
  const { name, lastName, email, password, phone } = req.body;
  var admin = "admin";
  var userUpdate = {
    name,
    lastName,
    email,
    password,
    phone,
    rol: admin,
  };

  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((usuarioEncontrado) => {
      usuarioEncontrado.update(userUpdate).then((newUser) => {
        newUser.save();
        res.status(200);
        return res.json(newUser);
      });
    })
    .catch(next);
});

//BUSCAR USUARIOS

server.get("/search/:id", (req, res, next) => {
  const { id } = req.params;
  User.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${id}%`,
          },
        },
        {
          lastName: {
            [Sequelize.Op.iLike]: `%${id}%`,
          },
        },
        {
          email: {
            [Sequelize.Op.iLike]: `%${id}%`,
          },
        },
      ],
    },
  })
    .then((usuarioEncontrado) => {
      res.json(usuarioEncontrado);
    })
    .catch(next);
});

module.exports = server;
