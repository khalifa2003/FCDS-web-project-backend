const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  tvShow: { type: mongoose.Schema.Types.ObjectId, ref: "TVShow" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
