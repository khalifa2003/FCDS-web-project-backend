const Review = require("../models/review.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// Nested route (Create)
exports.setMovieIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.movie) req.body.movie = req.params.movieId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res) => {
  const movie = req.query.movieId;
  const documents = await Review.find({ movie });
  res.status(200).json({ results: documents.length, data: documents });
});

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const document = await Review.find({ movie: req.params.movieId });
  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
exports.createReview = asyncHandler(async (req, res) => {
  const newDoc = await Review.create(req.body);
  res.status(201).json({ data: newDoc });
});

// // @desc    Update specific review
// // @route   PUT /api/v1/reviews/:id
// // @access  Private/Protect/User
exports.updateReview = asyncHandler(async (req, res, next) => {
  const document = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/Protect/User-Admin-Manager
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Review.findByIdAndDelete(id);
  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  res.status(204).send();
});
