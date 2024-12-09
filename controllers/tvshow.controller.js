const asyncHandler = require("express-async-handler");
const TVShow = require("../models/tvShow.model");
const ApiError = require("../utils/apiError");

// Get all TV shows
// @route GET /api/tvshows
exports.getAllTVShows = asyncHandler(async (req, res) => {
  const tvshows = await TVShow.find()
    .populate("genres", "name")
    .populate("production_companies", "name logo_path")
    .exec();

  res.status(200).json(tvshows);
});

// Get a TV show by ID
// @route GET /api/tvshows/:id

exports.getTVShowById = asyncHandler(async (req, res) => {
  const tvshow = await TVShow.findById(req.params.id)
    .populate("genres", "name")
    .populate("production_companies", "name logo_path")
    .populate("cast", "name profile_path")
    .exec();

  if (!tvshow) {
    return next(new ApiError(`TV Show not found`, 404));
  }

  res.status(200).json(tvshow);
});

// Create a new TV show
// @route POST /api/tvshows
exports.createTVShow = asyncHandler(async (req, res) => {
  const newTVShow = new TVShow(req.body);

  const savedTVShow = await newTVShow.save();
  res.status(201).json(savedTVShow);
});

// Update a TV show by ID
// @route PUT /api/tvshows/:id
exports.updateTVShow = asyncHandler(async (req, res) => {
  const updatedTVShow = await TVShow.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (!updatedTVShow) {
    return next(new ApiError(`TV Show not found`, 404));
  }

  res.status(200).json(updatedTVShow);
});

// Delete a TV show by ID
// @route DELETE /api/tvshows/:id
exports.deleteTVShow = asyncHandler(async (req, res) => {
  const deletedTVShow = await TVShow.findByIdAndDelete(req.params.id).exec();

  if (!deletedTVShow) {
    return next(new ApiError(`TV Show not found`, 404));
  }

  res
    .status(200)
    .json({ message: "TV Show deleted successfully", tvshow: deletedTVShow });
});
