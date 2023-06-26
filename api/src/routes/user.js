const server = require("express").Router();
const cors = require("cors");
const { User } = require("../db");

server.use(cors());

//TRAER TODOS LOS USUARIOS

server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

//CREAR USUARIO

server.post("/", (req, res, next) => {
  const { name, lastName, email, password, phone, rol } = req.body;
  User.create({
    name,
    lastName,
    email,
    password,
    phone,
    rol,
  })
    .then((usuario) => {
      return res.json(usuario);
    })
    .catch(next);
});

//VERIFICA SI YA EXISTE UN USUSARION CON EL MISMO EMAIL

server.get("/:email", (req, res, next) => {
  const { email } = req.params;

  var verify = User.findAll({
    where: {
      email,
    },
  })
    .then((verify) => {
      if (verify.length === 0) {
        res.json("El email esta disponible");
      } else {
        res.json("Ya existe un usuario con este email");
      }
    })
    .catch("error");
});

//ACTUALIZAR USUARIO

server.put("/:id", (req, res, next) => {
  const { name, lastName, email, password, phone, rol } = req.body;
  var userUpdate = {
    name,
    lastName,
    email,
    password,
    phone,
    rol,
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

//ELIMINAR USUARIO

server.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (user) {
        return user.destroy();
      } else {
        throw new Error("Usuario no encontrado");
      }
    })
    .then(() => {
      res.status(200);
      res.send("Usuario eliminado");
    })
    .catch((error) => {
      res.status(404);
      res.send(error.message);
    });
});


//AGREGAR ITEM AL CARRITO

// server.post("/:id/cart", (req, res, next) => {
//   let total = req.body.completo;
//   let cantidad = req.body.cantidad;
//   let arrayProductos = req.body.payload;

//   Carrito.create({
//     price: total,
//     cantidad: cantidad,
//     userId: req.params.id,
//     estado: "creada",
//   }).then(function (cart) {
//     return arrayProductos.map((ldo) => {
//       Lineadeorden.create({
//         cantidad: ldo.quantity,
//         price: ldo.price,
//         carritoId: cart.dataValues.id,
//         productId: ldo.id,
//       });
//       var cantidad = ldo.quantity;
//       Product.findOne({
//         where: {
//           id: ldo.id,
//         },
//       }).then((prodEncontrado) => {
//         var stock = prodEncontrado.stock;
//         var descuento = stock - cantidad;
//         prodEncontrado.update({
//           stock: descuento,
//         });
//       });
//     });
//   });
// });

//

module.exports = server;
