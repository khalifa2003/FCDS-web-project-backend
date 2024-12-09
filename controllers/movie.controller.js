const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Movie = require("../models/movie.model");

// GET all movies
exports.getAllMovies = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const movies = await Movie.find()
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("genres production_companies cast crew");
  res.status(200).json(movies);
});

// GET a single movie by ID
exports.getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).populate(
    "genres production_companies cast crew"
  );
  if (!movie) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json(movie);
});

// CREATE a new movie
exports.createMovie = asyncHandler(async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res
    .status(201)
    .json({ message: "Movie created successfully", movie: newMovie });
});

// UPDATE a movie by ID
exports.updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedMovie) {
    return next(new ApiError("Movie not found", 404));
  }
  res
    .status(200)
    .json({ message: "Movie updated successfully", movie: updatedMovie });
});

// DELETE a movie by ID
exports.deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) {
    return next(new ApiError("Movie not found", 404));
  }
  res.status(200).json({ message: "Movie deleted successfully" });
});

// GET movies by genre
exports.getMoviesByGenre = asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const movies = await Movie.find({ genres: genreId }).populate("genres");
  res.status(200).json(movies);
});

// GET trending movies (based on popularity)
exports.getTrendingMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find().sort({ popularity: -1 }).limit(10);
  res.status(200).json(movies);
});
