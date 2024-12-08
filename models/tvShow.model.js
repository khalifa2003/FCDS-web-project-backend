const mongoose = require("mongoose");

const TVShowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    original_name: { type: String },
    overview: { type: String },
    first_air_date: { type: Date },
    last_air_date: { type: Date },
    status: {
      type: String,
      enum: ["Airing", "Ended", "Cancelled"],
      default: "Airing",
    },
    language: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    networks: [{ name: String, logo_path: String, country: String }],
    production_companies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    ],
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    crew: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    seasons: [
      {
        season_number: { type: Number },
        episode_count: { type: Number },
        air_date: { type: Date },
        poster_path: { type: String },
        overview: { type: String },
      },
    ],
    popularity: { type: Number, default: 0.0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TVShow", TVShowSchema);
