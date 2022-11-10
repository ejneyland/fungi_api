// checkout expressjs.com for learning tools/info for creating api/middleware
// https://mongoosejs.com/docs/api/model.html#model_Model.find for mongoose docs

const express = require("express")
// requires / imports the express framework into the app
const mongoose = require("mongoose")

const phyla = ["Chytridiomycota", "Zygomycota", "Ascomycota", "Basidiomycota"];

// const entries = [
//     { phylum: "Chytridiomycota", entry: "Chytridiomycota, microscopic zoosporic fungi" },
//     { phylum: "Basidiomycota", entry: "Basidiomycota, these include your typical mushroom" },
//     { phylum: "Ascomycota", entry: "Ascomycota, known as sac or cup fungi" }
//   ]

const app = express() // applies the express framrwork to the app
const port = 4000 // defines a port address for the api to run

mongoose
  .connect("mongodb+srv://ejneyland:H1aFYchXJoxqq5U4@cluster0.jfa6lfl.mongodb.net/fungi?retryWrites=true&w=majority")
  .then(() => console.log(mongoose.connection.readyState == 1 ? "Mongoose connected" : "Mongoose failed"))
  .catch((err) => console.log(err));

const entrySchema = new mongoose.Schema({
  phylum: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  }
})

const EntryModel = mongoose.model('Entry', entrySchema)

app.use(express.json())
// app.use tells the express app to execute the specified middleware
// at this point in the req-res cycle (sequentially ordered system)
// express.json takes the incoming post / req body and does a json.parse on it
// then sets the req.body
// puts the result into req.body so that later middleware / routes
// can access the parse object
// this needs to happen before any other middleware requires access to req.body

app.get('/', (req, res) => {
  res.send({ info: "Fungi Forager API" })
}) // http request and response through the middleware

app.get('/phylum', (req, res) => res.send(phyla))

// app.get('/entries', (req, res) => res.send(entries))
app.get('/entries', async (req, res) => {
  const entries = await EntryModel.find()
  res.send(entries)
})

// app.get('/entries/:id', (req, res) => res.send(entries[req.params.id]))
app.get("/entries/:id", async (req, res) => {
  const entry = await EntryModel.findById(req.params.id)
  res.send(entry);
})


app.post('/entries', async (req, res) => {
  const entry = { phylum: req.body.phylum, entry: req.body.entry}
  // entries.push(entry)
  const newEntry = await EntryModel.create(entry)
  res.status(201).send(newEntry)
  // res.send(req.body)
})

app.listen(port, () => console.log(`App running at http:localhost:${port}/`))
// launches the api and outputs an optional message / function