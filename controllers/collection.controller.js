const Collection = require("../models/collections.model"); // Import the Collection model
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Get all collections
// @route   GET /api/v1/collections
// @access  Public
exports.getAllCollections = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const collections = await Collection.find()
    .skip((page - 1) * limit)
    .populate("movies", "title poster_path");
  res.status(200).json({ results: collections.length, data: collections });
});

// @desc    Get a collection by ID
// @route   GET /api/v1/collections/:id
// @access  Public
exports.getCollectionById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const collection = await Collection.findById(id).populate(
    "movies",
    "title poster_path"
  );

  if (!collection) {
    return next(new ApiError(`No collection found with ID: ${id}`, 404));
  }

  res.status(200).json({ data: collection });
});

// @desc    Create a new collection
// @route   POST /api/v1/collections
// @access  Admin
exports.createCollection = asyncHandler(async (req, res) => {
  const { title, overview, poster_path, backdrop_path, movies } = req.body;

  const collection = await Collection.create({
    title,
    overview,
    poster_path,
    backdrop_path,
    movies,
  });

  res.status(201).json({ data: collection });
});

// @desc    Update a collection
// @route   PUT /api/v1/collections/:id
// @access  Admin
exports.updateCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const collection = await Collection.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!collection) {
    return next(new ApiError(`No collection found with ID: ${id}`, 404));
  }

  res.status(200).json({ data: collection });
});

// @desc    Delete a collection
// @route   DELETE /api/v1/collections/:id
// @access  Admin
exports.deleteCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const collection = await Collection.findByIdAndDelete(id);

  if (!collection) {
    return next(new ApiError(`No collection found with ID: ${id}`, 404));
  }

  res.status(204).json({ message: "Collection deleted successfully" });
});
