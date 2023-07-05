

const server = require("express").Router();
const cors = require("cors");
const { Product_Category } = require("../db");

server.use(cors());


server.get('/', async (req, res, next) => {
    try {
        const inter = await Product_Category.findAll()
        res.status(200).json(inter)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})
module.exports = server