const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Genre", GenreSchema);
