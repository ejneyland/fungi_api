const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const apiV1Routes = require("./routes");

const phyla = ["Chytridiomycota", "Zygomycota", "Ascomycota", "Basidiomycota"];

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Fungi Forager API" });
});

app.get("/phylum", (req, res) => res.send(phyla));

app.use("/api/v1", apiV1Routes);

module.exports = app