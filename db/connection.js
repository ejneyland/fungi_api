const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ejneyland:H1aFYchXJoxqq5U4@cluster0.jfa6lfl.mongodb.net/fungi?retryWrites=true&w=majority"
  )
  .then(() =>
    console.log(
      mongoose.connection.readyState == 1
        ? "Mongoose connected"
        : "Mongoose failed"
    )
  )
  .catch((err) => console.log(err));

module.exports = mongoose
