const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    biography: { type: String },
    birthday: { type: Date },
    deathday: { type: Date },
    place_of_birth: { type: String },
    profile_path: { type: String },
    known_for: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    roles: [
      { type: String, enum: ["Actor", "Director", "Writer", "Producer"] },
    ],
    movie_credits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    tv_credits: [{ type: mongoose.Schema.Types.ObjectId, ref: "TVShow" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", PersonSchema);
