const express = require("express");
const EntryModel = require("./db/entry_model");

const phyla = ["Chytridiomycota", "Zygomycota", "Ascomycota", "Basidiomycota"];

const app = express() 
const port = 4000 

app.use(express.json())

app.get("/", (req, res) => {
  res.send({ info: "Fungi Forager API" })
})

app.get("/phylum", (req, res) => res.send(phyla))

app.get("/entries", async (req, res) => {
  res.send(await EntryModel.find());
})

app.get("/entries/:id", async (req, res) => {
  res.send(await EntryModel.findById(req.params.id));
})

app.post("/entries", async (req, res) => {
  res.status(201).send(await EntryModel.create(req.body))
})

app.put("/entries/:id", async (req, res) => {
  res.send(
    await EntryModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
  )
})

app.delete("/entries/:id", async (req, res) => {
  EntryModel.findByIdAndDelete(req.params.id, () => res.sendStatus(204))
})

app.listen(port, () => console.log(`App running at http:localhost:${port}/`))