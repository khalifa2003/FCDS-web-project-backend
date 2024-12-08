const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToWatchlist,
  removeFromWatchlist,
} = require("../controllers/user.controller");

// Routes for user-related actions
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserProfile);
router.post("/:userId/watchlist", addToWatchlist);
router.delete("/:userId/watchlist", removeFromWatchlist);

module.exports = router;
