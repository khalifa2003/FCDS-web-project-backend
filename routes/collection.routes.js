const express = require("express");
const collectionController = require("../controllers/collection.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// Public routes
/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     tags:
 *       - Collection
 *     description: Retrieves a list of all movie collections.
 *     responses:
 *       200:
 *         description: A list of collections
 */
router.get("/", collectionController.getAllCollections);

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Get collection by ID
 *     description: Fetches a single collection by its ID.
 *     tags:
 *       - Collection
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The collection details
 *       404:
 *         description: Collection not found
 */
router.get("/:id", collectionController.getCollectionById);

// Admin-only routes
router.use(authController.protect);
router.use(authController.allowedTo("admin", "manager"));

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     description: Creates a new movie collection (Admin only).
 *     tags:
 *       - Collection
 *     responses:
 *       201:
 *         description: Collection created successfully
 */
router.post("/", collectionController.createCollection);

/**
 * @swagger
 * /collections/{id}:
 *   put:
 *     summary: Update a collection by ID
 *     description: Updates the details of a specific collection (Admin only).
 *     tags:
 *       - Collection
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *       404:
 *         description: Collection not found
 */
router.put("/:id", collectionController.updateCollection);

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Delete a collection by ID
 *     description: Deletes a specific collection (Admin only).
 *     tags:
 *       - Collection
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       404:
 *         description: Collection not found
 */
router.delete("/:id", collectionController.deleteCollection);

module.exports = router;
