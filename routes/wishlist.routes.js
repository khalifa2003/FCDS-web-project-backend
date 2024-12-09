const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  addMovieToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));
/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   post:
 *     summary: Add a movie to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: 64bf493f3c0d3c1a4bafc123
 *     responses:
 *       201:
 *         description: Movie added to the wishlist
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get the logged user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(addMovieToWishlist).get(getLoggedUserWishlist);

/**
 * @swagger
 * /api/v1/wishlist/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bf493f3c0d3c1a4bafc123
 *         description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: Product not found in wishlist
 *       401:
 *         description: Unauthorized
 */
router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
