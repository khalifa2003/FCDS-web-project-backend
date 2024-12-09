const express = require("express");
const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/review.validator");
const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  setMovieIdAndUserIdToBody,
} = require("../controllers/reviews.controller");

const authService = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
 *     description: Fetches a list of all reviews.
 *     responses:
 *       200:
 *         description: A list of reviews
 */
router.route("/").get(getReviews);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags:
 *       - Reviews
 *     description: Adds a new review to a movie (User only).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setMovieIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags:
 *       - Reviews
 *     description: Fetches a specific review by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The review details
 *       404:
 *         description: Review not found
 */
router.route("/:id").get(getReviewValidator, getReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags:
 *       - Reviews
 *     description: Updates an existing review based on the provided ID (User only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router
  .route("/:id")
  .put(
    authService.protect,
    authService.allowedTo("user"),
    updateReviewValidator,
    updateReview
  );

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags:
 *       - Reviews
 *     description: Deletes an existing review based on the provided ID (Admin, Manager, User only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router
  .route("/:id")
  .delete(
    authService.protect,
    authService.allowedTo("user", "manager", "admin"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
