const server = require("express").Router();
const { Product, Category } = require("../db.js");
const cors = require("cors");

server.use(cors());

//FILTROS Y ORDENAMIENTO

server.get("/products", async (req, res) => {
  try {
    const { category, sortOrder, sortBy, priceRange } = req.query;
    let filteredProducts = [];

    // Filtrar por categoría

    if (category) {
      const categoryProducts = await Product.findAll({
        include: {
          model: Category,
          where: {
            name: category,
          },
        },
      });

      if (categoryProducts.length > 0) {
        filteredProducts = categoryProducts;
      } else {
        return res.status(404).json({
          msg: `No se encontraron productos para la categoría ${category}`,
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

    // Ordenar por novedad (fecha)

    if (sortBy === "date") {
      let sortedProducts = [];

      if (filteredProducts.length > 0) {
        // Si se aplicó algún filtro de categoría, ordenar por novedad los productos filtrados
        sortedProducts = filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Ordenar de forma descendente (de más reciente a más antiguo)
        });
      } else {
        // Si no se aplicó ningún filtro de categoría, ordenar por novedad todos los productos
        const allProducts = await Product.findAll();
        sortedProducts = allProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Ordenar de forma descendente (de más reciente a más antiguo)
        });
      }

      if (sortOrder === "asc") {
        // Si se desea orden ascendente, invertir el orden del array
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
