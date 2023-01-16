require("dotenv").config();
const express = require('express')
const connectToDB = require("./database/db")

const app = express()
const port = process.env.PORT || 3000;

connectToDB();

app.get("/hello", (req,res) => {
  res.send("Hello");
})

app.listen(port,() => console.log(`Servidor Rodando em http://localhost:${port}`))