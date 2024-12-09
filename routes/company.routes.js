const express = require("express");
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");

const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Wishlist management APIs
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags:
 *       - Company
 *     description: Fetches a list of all companies.
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get("/", getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags:
 *       - Company
 *     description: Fetches a single company by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The company details
 *       404:
 *         description: Company not found
 */
router.get("/:id", getCompanyById);

// Protected routes (Admin only)
router.use(authController.protect);
router.use(authController.allowedTo("admin"));

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags:
 *       - Company
 *     description: Creates a new company (Admin only).
 *     responses:
 *       201:
 *         description: Company created successfully
 */
router.post("/", createCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     description: Updates the details of a specific company (Admin only).
 *     tags:
 *       - Company
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 */
router.put("/:id", updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     tags:
 *       - Company
 *     description: Deletes a specific company (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
router.delete("/:id", deleteCompany);

module.exports = router;
