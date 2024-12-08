const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    overview: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
