const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Add Movie to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addMovieToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body._id },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Movie added successfully to your wishlist.",
    data: user.wishlist,
  });
});

// @desc    Remove Movie from wishlist
// @route   DELETE /api/v1/wishlist/:movieId
// @access  Protected/User
exports.removeMovieFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.movieId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Movie removed successfully from your wishlist.",
    data: user.wishlist,
  });
});

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
