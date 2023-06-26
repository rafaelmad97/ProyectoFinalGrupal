

const server = require("express").Router();
const cors = require("cors");
const { Product, Category } = require("../db");

server.use(cors());


server.get('/', (req, res, next) => {
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
})

module.exports = server