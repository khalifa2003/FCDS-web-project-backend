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

const authService = require("../controllers/auth-controller");
const router = express.Router();

router
  .route("/")
  .get(getReviews)
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setMovieIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    authService.protect,
    authService.allowedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTo("user", "manager", "admin"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
