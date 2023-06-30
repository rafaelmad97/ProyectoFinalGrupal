const server = require("express").Router();
const { Product, Category } = require("../db.js");
const cors = require("cors");

server.use(cors());

server.get("/categories", async (req, res) => {
  try {
    const {
      memorias,
      almacenamiento,
      motherboard,
      perifericos,
      placasDeVideo,
      procesadores,
      fuentes,
      gabinetes,
      sillasGamer,
      monitores,
    } = req.query;
    let filteredProducts = [];

    if (memorias) {
      // Filtrar por categoría "gabinetes"
      const memoriasProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "memorias",
          },
        },
      });
      if (memoriasProducts.length > 0) {
        filteredProducts = filteredProducts.concat(memoriasProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría memorias",
        });
      }
    }

    if (almacenamiento) {
      // Filtrar por categoría "gabinetes"
      const almacenamientoProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "almacenamiento",
          },
        },
      });
      if (almacenamientoProducts.length > 0) {
        filteredProducts = filteredProducts.concat(almacenamientoProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría almacenamiento",
        });
      }
    }

    if (motherboard) {
      // Filtrar por categoría "Motherboard"
      const motherboardProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "Motherboard",
          },
        },
      });
      if (motherboardProducts.length > 0) {
        filteredProducts = filteredProducts.concat(motherboardProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría Motherboard",
        });
      }
    }

    if (perifericos) {
      // Filtrar por categoría "Perifericos"
      const perifericosProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "Perifericos",
          },
        },
      });
      if (perifericosProducts.length > 0) {
        filteredProducts = filteredProducts.concat(perifericosProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría Perifericos",
        });
      }
    }

    if (placasDeVideo) {
      // Filtrar por categoría "gabinetes"
      const placasDeVideoProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "placasDeVideo",
          },
        },
      });
      if (placasDeVideoProducts.length > 0) {
        filteredProducts = filteredProducts.concat(placasDeVideoProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría placasDeVideo",
        });
      }
    }

    if (procesadores) {
      // Filtrar por categoría "gabinetes"
      const procesadoresProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "procesadores",
          },
        },
      });
      if (procesadoresProducts.length > 0) {
        filteredProducts = filteredProducts.concat(procesadoresProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría procesadores",
        });
      }
    }

    if (fuentes) {
      // Filtrar por categoría "gabinetes"
      const fuentesProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "fuentes",
          },
        },
      });
      if (fuentesProducts.length > 0) {
        filteredProducts = filteredProducts.concat(fuentesProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría fuentes",
        });
      }
    }

    if (gabinetes) {
      // Filtrar por categoría "gabinetes"
      const gabinetesProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "gabinetes",
          },
        },
      });
      if (gabinetesProducts.length > 0) {
        filteredProducts = filteredProducts.concat(gabinetesProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría gabinetes",
        });
      }
    }

    if (gabinetes) {
      // Filtrar por categoría "gabinetes"
      const gabinetesProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "gabinetes",
          },
        },
      });
      if (gabinetesProducts.length > 0) {
        filteredProducts = filteredProducts.concat(gabinetesProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría gabinetes",
        });
      }
    }

    if (sillasGamer) {
      // Filtrar por categoría "monitores"
      const sillasGamerProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "sillasGamer",
          },
        },
      });
      if (sillasGamerProducts.length > 0) {
        filteredProducts = filteredProducts.concat(sillasGamerProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría sillasGamer",
        });
      }
    }

    if (monitores) {
      // Filtrar por categoría "monitores"
      const monitoresProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: "monitores",
          },
        },
      });
      if (monitoresProducts.length > 0) {
        filteredProducts = filteredProducts.concat(monitoresProducts);
      } else {
        return res.status(404).json({
          msg: "No se encontraron productos para la categoría monitores",
        });
      }
    }

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = server;
