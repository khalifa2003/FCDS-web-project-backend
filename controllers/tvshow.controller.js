const asyncHandler = require("express-async-handler");
const TVShow = require("../models/tvshow.model"); // TV Show Model

// Get all TV shows
// @route GET /api/tvshows
exports.getAllTVShows = asyncHandler(async (req, res) => {
  try {
    const tvshows = await TVShow.find()
      .populate("genres", "name")
      .populate("production_companies", "name logo_path")
      .exec();

    res.status(200).json(tvshows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching TV shows", error: error.message });
  }
});

// Get a TV show by ID
// @route GET /api/tvshows/:id

exports.getTVShowById = asyncHandler(async (req, res) => {
  try {
    const tvshow = await TVShow.findById(req.params.id)
      .populate("genres", "name")
      .populate("production_companies", "name logo_path")
      .populate("cast", "name profile_path")
      .exec();

    if (!tvshow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res.status(200).json(tvshow);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching TV show", error: error.message });
  }
});

// Create a new TV show
// @route POST /api/tvshows
exports.createTVShow = asyncHandler(async (req, res) => {
  try {
    const newTVShow = new TVShow(req.body);

    const savedTVShow = await newTVShow.save();
    res.status(201).json(savedTVShow);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating TV show", error: error.message });
  }
});

// Update a TV show by ID
// @route PUT /api/tvshows/:id
exports.updateTVShow = asyncHandler(async (req, res) => {
  try {
    const updatedTVShow = await TVShow.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!updatedTVShow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res.status(200).json(updatedTVShow);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating TV show", error: error.message });
  }
});

// Delete a TV show by ID
// @route DELETE /api/tvshows/:id
exports.deleteTVShow = asyncHandler(async (req, res) => {
  try {
    const deletedTVShow = await TVShow.findByIdAndDelete(req.params.id).exec();

    if (!deletedTVShow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res
      .status(200)
      .json({ message: "TV Show deleted successfully", tvshow: deletedTVShow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting TV show", error: error.message });
  }
});
