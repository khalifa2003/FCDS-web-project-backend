const express = require("express");
const {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/person.controller");

const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /persons:
 *   get:
 *     summary: Get all persons
 *     tags:
 *       - Person
 *     description: Fetches a list of all persons.
 *     responses:
 *       200:
 *         description: A list of persons
 */
router.get("/", getAllPersons);

/**
 * @swagger
 * /persons/{id}:
 *   get:
 *     summary: Get person by ID
 *     tags:
 *       - Person
 *     description: Fetches a single person by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the person
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The person details
 *       404:
 *         description: Person not found
 */
router.get("/:id", getPersonById);

// Protected routes (Admin only)
router.use(authController.protect);
router.use(authController.allowedTo("admin"));

/**
 * @swagger
 * /persons:
 *   post:
 *     summary: Create a new person
 *     tags:
 *       - Person
 *     description: Adds a new person to the system.
 *     responses:
 *       201:
 *         description: Person created successfully
 */
router.post("/", createPerson);

/**
 * @swagger
 * /persons/{id}:
 *   put:
 *     summary: Update a person by ID
 *     tags:
 *       - Person
 *     description: Updates a specific person based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the person
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person updated successfully
 *       404:
 *         description: Person not found
 */
router.put("/:id", updatePerson);

/**
 * @swagger
 * /persons/{id}:
 *   delete:
 *     summary: Delete a person by ID
 *     tags:
 *       - Person
 *     description: Deletes a person from the system based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the person
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person deleted successfully
 *       404:
 *         description: Person not found
 */
router.delete("/:id", deletePerson);

module.exports = router;
