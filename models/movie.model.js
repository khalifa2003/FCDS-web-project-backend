const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    original_title: { type: String },
    tagline: { type: String },
    overview: { type: String },
    runtime: { type: Number },
    release_date: { type: Date },
    status: {
      type: String,
      enum: ["Released", "Post-production", "Cancelled", "Rumored"],
      default: "Released",
    },
    language: { type: String },
    budget: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    poster_path: { type: String },
    backdrop_path: { type: String },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    production_companies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    ],
    production_countries: [{ country: String, iso_3166_1: String }],
    spoken_languages: [{ language: String, iso_639_1: String }],
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    crew: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Keyword" }],
    collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    vote_count: { type: Number, default: 0 },
    vote_average: { type: Number, default: 0.0 },
    popularity: { type: Number, default: 0.0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
