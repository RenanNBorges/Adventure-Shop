require("dotenv").config();
const express = require('express')
const connectToDB = require("./database/db")
const path = require("path");
const Produto = require("./model/Produto");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());

connectToDB();

app.get("/", (req,res) => {
  res.render("index");
})

app.get("/admin", (req,res) => {
  res.render("admin");
})

app.post("/create",async (req,res) => {
  const produto = req.body;
  await Produto.create(produto);
  res.redirect("/")
});


app.listen(port,() => console.log(`Servidor Rodando em http://localhost:${port}`))