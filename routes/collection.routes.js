const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collection.controller");
const authController = require("../controllers/auth.controller");

// Public routes
router.get("/", collectionController.getAllCollections);
router.get("/:id", collectionController.getCollectionById);

// Admin-only routes
router.use(authController.protect); // Protect routes
router.use(authController.allowedTo("admin")); // Restrict to admin

router.post("/", collectionController.createCollection);
router.put("/:id", collectionController.updateCollection);
router.delete("/:id", collectionController.deleteCollection);

module.exports = router;
