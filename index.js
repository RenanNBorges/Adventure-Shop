require("dotenv").config();
const express = require('express')
const connectToDB = require("./database/db")
const path = require("path");
const Produto = require("./model/ProdutoModel");
const router = require('./routes/Router')

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());

connectToDB();

app.get('/', (req, res) => {
  Produto.find({category: "Barraca"}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/index', {items: items});
    }
  });
});

app.get('/barracas', (req, res) => {
  Produto.find({category: "Barraca"}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/barracas', {items: items});
    }
  });
});




app.get('/mochilas', (req, res) => {
  Produto.find({category: "Mochila"}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/mochilas', {items: items});
    }
  });
});


app.get("/login", (req,res) => {

  res.render("pages/login");
})


app.get("/cart", (req,res)=> {
  res.render("pages/cart");
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