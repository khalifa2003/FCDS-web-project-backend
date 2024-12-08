const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

// Routes for movie-related actions
router.get("/", movieController.getAllMovies); // Get all movies
router.get("/:id", movieController.getMovieById); // Get movie by ID
router.post("/", movieController.createMovie); // Create a new movie
router.put("/:id", movieController.updateMovie); // Update movie details
router.delete("/:id", movieController.deleteMovie); // Delete a movie

module.exports = router;
