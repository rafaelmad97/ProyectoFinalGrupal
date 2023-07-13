const server = require("express").Router();
const cors = require("cors");
const { User } = require("../db");
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

server.post("/",async  (req, res, next) => {
  const { id,name, lastName, email, password, phone,isactive,isadmin} = req.body;
  const value = await User.count()
  console.log(value+1)
  await User.create({
    id:(value+1),
    name,
    lastName,
    email,
    password,
    phone,
    isactive,
    isadmin,
  })
    .then((usuario) => {
      // Envía el correo de notificación al usuario registrado
      const from = EMAILACCOUNT;
      const to = email; // Dirección de correo electrónico del destinatario
      const subject = "¡Registro exitoso!"; // Asunto del correo
      const html = welcomeEmail; // Contenido en HTML del cuerpo del correo
      try {
        sendEmail(from, to, subject, html)

      }catch(e){
        console.log("el email no se envio")
      }

      

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
  const { password, newPassword, email } = req.body;

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
          const to = email; // Dirección de correo electrónico del destinatario
          const subject = "¡Cambio de contraseña exitoso!"; // Asunto del correo
          const html = changePEmail; // Contenido en HTML del cuerpo del correo
          sendEmail(from, to, subject, html);
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

//ACTUALIZAR USUARIO

server.put("/:id", (req, res, next) => {
  const { name, lastName, email, password, phone , isactive, isadmin} = req.body;
  var userUpdate = {
    name,
    lastName,
    email,
    password,
    phone,
    isactive,
    isadmin
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
