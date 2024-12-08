const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
