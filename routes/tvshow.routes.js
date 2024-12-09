const express = require("express");
const router = express.Router();
const {
  getAllTVShows,
  getTVShowById,
  createTVShow,
  updateTVShow,
  deleteTVShow,
} = require("../controllers/tvshow.controller");

router.get("/", getAllTVShows);
router.get("/:id", getTVShowById);
router.post("/", createTVShow);
router.put("/:id", updateTVShow);
router.delete("/:id", deleteTVShow);

module.exports = router;
