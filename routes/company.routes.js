const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");
const authController = require("../controllers/auth.controller");

// Public routes
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);

// Protected routes (Admin only)
router.use(authController.protect);
router.use(authController.allowedTo("admin"));
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
