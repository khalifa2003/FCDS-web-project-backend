const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre.model");
const ApiError = require("../utils/apiError");

// === Create a New Genre ===
exports.createGenre = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Check if the genre already exists
  const existingGenre = await Genre.findOne({ name });
  if (existingGenre) {
    return res.status(400).json({ message: "Genre already exists" });
  }

  const newGenre = new Genre({ name, description });
  const savedGenre = await newGenre.save();

  res
    .status(201)
    .json({ message: "Genre created successfully", genre: savedGenre });
});

// === Get All Genres ===
exports.getAllGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find();
  res.status(200).json(genres);
});

// === Get a Genre by ID ===
exports.getGenreById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    return next(new ApiError(`Genre not found`, 404));
  }

  res.status(200).json(genre);
});

// === Update a Genre ===
exports.updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const updatedGenre = await Genre.findByIdAndUpdate(
    id,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedGenre) {
    return next(new ApiError(`Genre not found`, 404));
  }

  res
    .status(200)
    .json({ message: "Genre updated successfully", genre: updatedGenre });
});

// === Delete a Genre ===
exports.deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedGenre = await Genre.findByIdAndDelete(id);
  if (!deletedGenre) {
    return next(new ApiError(`Genre not found`, 404));
  }

  res.status(200).json({ message: "Genre deleted successfully" });
});
