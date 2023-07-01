const server = require("express").Router();
const { Product, Category } = require("../db.js");
const cors = require("cors");

server.use(cors());

//FILTROS Y ORDENAMIENTO

server.get("/products", async (req, res) => {
  try {
    const {
      sortOrder,
      sortBy,
      priceRange,
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

    // Filtrar por categoría "memorias"

    if (memorias) {
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

    // Filtrar por categoría "almacenamiento"

    if (almacenamiento) {
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

    // Filtrar por categoría "motherboard"

    if (motherboard) {
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

    // Filtrar por categoría "perifericos"

    if (perifericos) {
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

    // Filtrar por categoría "placasDeVideo"

    if (placasDeVideo) {
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

    // Filtrar por categoría "procesadores"

    if (procesadores) {
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

    // Filtrar por categoría "fuentes"

    if (fuentes) {
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

    // Filtrar por categoría "gabinetes"

    if (gabinetes) {
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

    // Filtrar por categoría "monitores"

    if (sillasGamer) {
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

    // Filtrar por categoría "monitores"

    if (monitores) {
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

    //Filtrar por rango de Precio

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      let priceFilteredProducts = [];

      if (filteredProducts.length > 0) {
        // Si se aplicó algún filtro de categoría, filtrar por precio los productos filtrados
        priceFilteredProducts = filteredProducts.filter((product) => {
          const productPrice = parseFloat(product.price);
          return productPrice >= minPrice && productPrice <= maxPrice;
        });
      } else {
        // Si no se aplicó ningún filtro de categoría, filtrar por precio todos los productos
        const allProducts = await Product.findAll();
        priceFilteredProducts = allProducts.filter((product) => {
          const productPrice = parseFloat(product.price);
          return productPrice >= minPrice && productPrice <= maxPrice;
        });
      }

      filteredProducts = priceFilteredProducts;
    }

    //Ordenar por precio BARATO-CARO CARO-BARATO si de se desea

    if (sortBy === "price") {
      let sortedProducts = [];

      if (filteredProducts.length > 0) {
        // Si se aplicó algún filtro de categoría, ordenar por precio los productos filtrados
        sortedProducts = filteredProducts.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return priceA - priceB;
        });
      } else {
        // Si no se aplicó ningún filtro de categoría, ordenar por precio todos los productos
        const allProducts = await Product.findAll();
        sortedProducts = allProducts.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return priceA - priceB;
        });
      }

      if (sortOrder === "dsc") {
        // Si se desea orden descendente, invertir el orden del array
        sortedProducts.reverse();
      }

      filteredProducts = sortedProducts;
    }

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron productos para los filtros seleccionados.",
      });
    }

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = server;
