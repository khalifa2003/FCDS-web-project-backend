const express = require("express");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags:
 *       - Movies
 *     description: Fetches a list of all movies.
 *     responses:
 *       200:
 *         description: A list of movies
 */
router.get("/", getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags:
 *       - Movies
 *     description: Fetches a single movie by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The movie details
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);

// Admin-only routes
router.use(authController.protect);
router.use(authController.allowedTo("admin", "manager"));

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movies
 *     description: Adds a new movie to the system (Admin only).
 *     responses:
 *       201:
 *         description: Movie created successfully
 */
router.post("/", createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags:
 *       - Movies
 *     description: Updates a specific movie based on the provided ID (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */
router.put("/:id", updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags:
 *       - Movies
 *     description: Deletes a movie from the system based on the provided ID (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", deleteMovie);

module.exports = router;
