const { User, Historial } = require("../db.js");
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

// OBTENER EL HISTORIAL DE UN USUARIO
server.get("/historial/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const historial = await Historial.findAll({
      where: { userId },
      order: [["fecha", "DESC"]],
    });

    res.json(historial);
  } catch (error) {
    console.error("Error al obtener el historial de actividades:", error);
    res.status(500).json({
      error: "Ocurrió un error al obtener el historial de actividades.",
    });
  }
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
