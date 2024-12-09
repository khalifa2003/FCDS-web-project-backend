const mongoose = require("mongoose");

const CollectionsSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    overview: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { suppressReservedKeysWarning: true },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionsSchema);
