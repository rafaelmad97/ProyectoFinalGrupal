const server = require("express").Router();
const { Product, Category, Product_Category } = require("../db.js");
const cors = require("cors");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { sendImage } = require("../config/cloudinary.js")

server.use(cors());

server.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      const allProducts = await Product.findAll();
      res.status(200).json(allProducts);
    } else {
      // const nameProduct = await Product.findAll({
      // 	where: {
      // 	  name: {
      // 		[Op.iLike]: `%${search}%`
      // 	  }
      // 	}
      // })
      const allProducts = await Product.findAll();
      const nameProduct = allProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      res.status(200).json(nameProduct);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//si le pongo :id SEARCH PRODUCT QUERYS NO FUNCIONA
server.get("/:id", (req, res, next) => {
  if (req.params.id) {
    var idProd = req.params.id;
    Product.findOne({
      where: {
        id: idProd,
      },
    })
      .then((productoEncontrado) => {
        res.json(productoEncontrado);
      })
      .catch(next);
  }
});

// Crear producto
server.post("/", async (req, res, next) => {

  const image = req.files ? req.files['image'] : req.body.urlImage
  let imageUrl


  if (req.files) {
    const data = await sendImage(req.files.image.tempFilePath)
    imageUrl = data.url
  } else imageUrl = image


  await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    urlImage: imageUrl,
    categoryId: req.body.categoryId,
    isactive: req.body.isactive
  })
    .then((c) => {
      return res.json(c);
    })
    .catch(next);
});

// Modificar producto
server.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const result = await Product.findByPk(id);

  const image = req.files ? req.files['image'] : req.body.urlImage
  let imageUrl

  if (req.files) {
    const data = await sendImage(req.files.image.tempFilePath)
    imageUrl = data.url
  } else imageUrl = image

  if (result !== null) {
    try {
      await result.update({ ...req.body, urlImage: imageUrl }, { where: { id: id } });
      res.status(200).json({ ...req.body, urlImage: imageUrl });
    } catch (e) {
      res.status(400).json(e.message);
    }
  } else {
    res.status(404).json("el producto no existe");
  }
});

// Borrar producto
server.delete("/delete/:id", (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(200);
    res.send("Producto eliminada");
  });
});

// posible ruta para buscar por nombre
// server.get('/search/:id', (req, res, next) => {

// 	if (req.params.id) {

// 		var idProd = req.params.id;
// 		Product.findAll({
// 			where: {
// 				name: {
// 					[Sequelize.Op.iLike]: `%${req.params.id}%`
// 				}
// 			}
// 		})
// 			.then(productoEncontrado => {
// 				res.json(productoEncontrado);
// 			})
// 			.catch(next)
// 	}

// })

server.post("/category", (req, res, next) => {
  Category.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((c) => {
      return res.send(c.dataValues);
    })
    .catch(next);
});

server.delete("/category/:id", (req, res, next) => {
  Category.findByPk(req.params.id)
    .then((cat) => {
      cat.destroy();
      res.status(200).send(cat);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

server.get("/category", (req, res, next) => {
  Category.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

server.put("/category/:id", (req, res, next) => {
  let catId = req.params.id;
  let nuevosDatos = {
    id: req.body.id,
    name: req.body.nombre,
    description: req.body.descripcion,
  };
  Category.findOne({
    where: {
      id: catId,
    },
  }).then((cat) => {
    cat.update(nuevosDatos).then((newCat) => {
      res.json(newCat);
    });
  });
});

//GET /products/categoria/:nombreCat
//Retorna todos los productos de {nombreCat} Categoría.
server.get("/category/:nombreCat", (req, res, next) => {
  Category.findAll({
    where: {
      name: req.params.nombreCat,
    },
    include: Product,
  })
    .then((cat) => {
      res.send(cat);
    })
    .catch(next);
});

module.exports = server;
