const express = require('express')
// requires / imports the express framework into the app

const phyla = ["Chytridiomycota", "Zygomycota", "Ascomycota", "Basidiomycota"];

const app = express() // applies the express framrwork to the app
const port = 4000 // defines a port address for the api to run

app.get('/', (req, res) => {
  res.send({ info: "Fungi Forager API" })
})
// http request and response through the middleware

app.get('/phylum', (req, res) => res.send(phyla))

app.listen(port, () => console.log(`App running at http:localhost:${port}/`))
// launches the api and outputs an optional message / function