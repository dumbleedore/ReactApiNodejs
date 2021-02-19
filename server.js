const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(cors());

const verifyJWT = require("./auth");
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  res.send("Hello World");
});

app.get("/clientes", verifyJWT, (req, res, send) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.json([{ id: 1, name: "Lucas" }]);
});

app.post("/login", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.body.user === "Lucas" && req.body.senha === "123") {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300,
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: "Login Invalido" });
});

app.post("/logout", (req, res, send) => {
  res.json({ auth: false, token: null });
});

app.listen(port, () => {
  console.log("Server on!");
});
