const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre.controller");

// Routes for genre-related actions
router.get("/", genreController.getAllGenres); // Get all genres
router.get("/:id", genreController.getGenreById); // Get genre by ID
router.post("/", genreController.createGenre); // Create a new genre
router.put("/:id", genreController.updateGenre); // Update genre details
router.delete("/:id", genreController.deleteGenre); // Delete a genre

module.exports = router;
