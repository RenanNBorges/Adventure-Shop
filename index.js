require("dotenv").config();
const express = require('express')
const connectToDB = require("./database/db")
const path = require("path");
const Produto = require("./model/ProdutoModel");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());

connectToDB();

app.get("/", async (req,res) => {
  const arrays_produtos = await Produto.find();
 
  res.render("pages/index",{arrays_produtos});
})

app.get("/login", (req,res) => {

  res.render("pages/login");
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