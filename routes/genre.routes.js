const express = require("express");
const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controller");

const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags:
 *       - Genre
 *     description: Fetches a list of all genres.
 *     responses:
 *       200:
 *         description: A list of genres
 */
router.get("/", getAllGenres);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags:
 *       - Genre
 *     description: Fetches a single genre by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The genre details
 *       404:
 *         description: Genre not found
 */
router.get("/:id", getGenreById);

// Protected routes (Admin only)
router.use(authController.protect);
router.use(authController.allowedTo("admin"));

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags:
 *       - Genre
 *     description: Adds a new genre to the system.
 *     responses:
 *       201:
 *         description: Genre created successfully
 */
router.post("/", createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     tags:
 *       - Genre
 *     description: Updates a genre based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *       404:
 *         description: Genre not found
 */
router.put("/:id", updateGenre);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre by ID
 *     tags:
 *       - Genre
 *     description: Removes a genre from the system based on its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 */
router.delete("/:id", deleteGenre);

module.exports = router;
