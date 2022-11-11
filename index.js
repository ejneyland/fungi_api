const express = require("express");
const apiV1Routes = require('./routes')

const phyla = ["Chytridiomycota", "Zygomycota", "Ascomycota", "Basidiomycota"];

const app = express() 
const port = 4000 

app.use(express.json())

app.get("/", (req, res) => {
  res.send({ info: "Fungi Forager API" })
})

app.get("/phylum", (req, res) => res.send(phyla))

app.use('/api/v1', apiV1Routes)

app.listen(port, () => console.log(`App running at http:localhost:${port}/`))