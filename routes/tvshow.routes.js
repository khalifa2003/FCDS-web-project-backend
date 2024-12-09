const express = require("express");
const {
  getAllTVShows,
  getTVShowById,
  createTVShow,
  updateTVShow,
  deleteTVShow,
} = require("../controllers/tvshow.controller");

const authService = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /tvshows:
 *   get:
 *     summary: Get all TV Shows
 *     tags:
 *       - TV Shows
 *     responses:
 *       200:
 *         description: A list of TV Shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVShow'
 */
router.get("/", getAllTVShows);

/**
 * @swagger
 * /tvshows/{id}:
 *   get:
 *     summary: Get a TV Show by ID
 *     tags:
 *       - TV Shows
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the TV Show
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single TV Show
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TVShow'
 *       404:
 *         description: TV Show not found
 */
router.get("/:id", getTVShowById);

/**
 * @swagger
 * /tvshows:
 *   post:
 *     summary: Create a new TV Show
 *     tags:
 *       - TV Shows
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TVShow'
 *     responses:
 *       201:
 *         description: TV Show created successfully
 */
router.post(
  "/",
  authService.protect,
  authService.allowedTo("manager", "admin"),
  createTVShow
);

/**
 * @swagger
 * /tvshows/{id}:
 *   put:
 *     summary: Update a TV Show by ID
 *     tags:
 *       - TV Shows
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the TV Show
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TVShow'
 *     responses:
 *       200:
 *         description: TV Show updated successfully
 *       404:
 *         description: TV Show not found
 */
router.put(
  "/:id",
  authService.protect,
  authService.allowedTo("manager", "admin"),
  updateTVShow
);

/**
 * @swagger
 * /tvshows/{id}:
 *   delete:
 *     summary: Delete a TV Show by ID
 *     tags:
 *       - TV Shows
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the TV Show
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: TV Show deleted successfully
 *       404:
 *         description: TV Show not found
 */
router.delete(
  "/:id",
  authService.protect,
  authService.allowedTo("manager", "admin"),
  deleteTVShow
);

module.exports = router;
