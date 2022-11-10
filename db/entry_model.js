const mongoose = require("./connection");

const EntryModel = mongoose.model(
  "Entry",
  new mongoose.Schema({
    phylum: {
      type: String,
      required: true,
    },
    entry: {
      type: String,
      required: true,
    },
  })
);

module.exports = EntryModel;
