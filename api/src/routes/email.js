const sendEmail = require("../controllers/Email");
const server = require("express").Router();

server.post("/send", (req, res) => {
  try {
    const { from, to } = req.body;
    sendEmail(from, to);
    res.status(200).json("mail enviado");
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = server;
