const server = require("express").Router();
const cors = require("cors");
const { User, Historial } = require("../db");
const sendEmail = require("../controllers/Email");
const { EMAILACCOUNT } = process.env;
const welcomeEmail = require("../email-templates/welcome");
const paymentEmail = require("../email-templates/payment");
const changePEmail = require("../email-templates/changePassword");
const bcrypt = require("bcrypt");
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
  })
    .then((usuario) => {
      // Envía el correo de notificación al usuario registrado
      const from = EMAILACCOUNT;
      const to = email; // Dirección de correo electrónico del destinatario
      const subject = "¡Registro exitoso!"; // Asunto del correo
      const html = welcomeEmail; // Contenido en HTML del cuerpo del correo
      sendEmail(from, to, subject, html);

      //Se guarda la actividad del usuario

      Historial.create({
        userId: usuario.id,
        tipoActividad: "registro",
        descripcion: `${name} ${lastName} se ha registrado`,
      });

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

//ACTUALIZAR CONTRASEÑA

server.put("/password/:id", (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ message: "Contraseña actual incorrecta" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      User.update({ password: hashedPassword }, { where: { id: user.id } })
        .then(() => {
          res
            .status(200)
            .json({ message: "Contraseña actualizada correctamente" });

          // Envía el correo de actualizacion al usuario

          const from = EMAILACCOUNT;
          const to = user.email; // Dirección de correo electrónico del destinatario
          const subject = "¡Cambio de contraseña exitoso!"; // Asunto del correo
          const html = changePEmail; // Contenido en HTML del cuerpo del correo
          sendEmail(from, to, subject, html);

          //Se guarda la actividad del usuario

          Historial.create({
            userId: id,
            tipoActividad: "actualizar contraseña",
            descripcion: `${user.name} ${user.lastName} actualizó su contraseña`,
          });
        })

        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Error al cambiar la contraseña" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al buscar el usuario" });
    });
});

//ELIMINAR USUARIO

server.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findByPk(id)
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Usuario no encontrado");
      }

      user = foundUser; // Asignar el valor de foundUser a user

      return foundUser.destroy();
    })
    .then(() => {
      res.status(200).send("Usuario eliminado");
      Historial.create({
        userId: id,
        tipoActividad: "eliminar usuario",
        descripcion: `${user.name} ${user.lastName} ha sido eliminado`,
      });
    })
    .catch((error) => {
      res.status(404);
      res.send(error.message);
    });
});

//ACTUALIZAR USUARIO

// server.put("/:id", (req, res, next) => {
//   const { name, lastName, email, password, phone, rol } = req.body;
//   var userUpdate = {
//     name,
//     lastName,
//     email,
//     password,
//     phone,
//     rol,
//   };

//   User.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((usuarioEncontrado) => {
//       usuarioEncontrado.update(userUpdate).then((newUser) => {
//         newUser.save();
//         res.status(200);
//         return res.json(newUser);
//       });
//     })
//     .catch(next);
// });

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
