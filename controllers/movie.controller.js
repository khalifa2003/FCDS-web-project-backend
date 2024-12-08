const Movie = require("../models/movie.model"); // Import the Movie model
const Genre = require("../models/genre.model"); // Import the Genre model (if needed for references)

// GET all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate(
      "genres production_companies cast crew"
    );
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movies", error: error.message });
  }
};

// GET a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate(
      "genres production_companies cast crew"
    );
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie", error: error.message });
  }
};

// CREATE a new movie
const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating movie", error: error.message });
  }
};

// UPDATE a movie by ID
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res
      .status(200)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating movie", error: error.message });
  }
};

// DELETE a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting movie", error: error.message });
  }
};

// GET movies by genre
const getMoviesByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const movies = await Movie.find({ genres: genreId }).populate("genres");
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching movies by genre",
        error: error.message,
      });
  }
};

// GET trending movies (based on popularity)
const getTrendingMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ popularity: -1 }).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching trending movies",
        error: error.message,
      });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
  getTrendingMovies,
};
