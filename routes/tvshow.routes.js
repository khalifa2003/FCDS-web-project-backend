const express = require("express");
const router = express.Router();
const tvshowController = require("../controllers/tvshow.controller");

// Routes for TV show-related actions
router.get("/", tvshowController.getAllTVShows); // Get all TV shows
router.get("/:id", tvshowController.getTVShowById); // Get TV show by ID
router.post("/", tvshowController.createTVShow); // Create a new TV show
router.put("/:id", tvshowController.updateTVShow); // Update TV show details
router.delete("/:id", tvshowController.deleteTVShow); // Delete a TV show

module.exports = router;
