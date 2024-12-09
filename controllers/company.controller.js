const asyncHandler = require("express-async-handler");
const Company = require("../models/company.model");
const ApiError = require("../utils/apiError");

// @desc    Get all companies
// @route   GET /api/v1/companies
// @access  Public
exports.getAllCompanies = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const companies = await Company.find().skip((page - 1) * limit);
  res.status(200).json({
    status: "success",
    results: companies.length,
    data: companies,
  });
});

// @desc    Get a single company by ID
// @route   GET /api/v1/companies/:id
// @access  Public
exports.getCompanyById = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(new ApiError(`No company found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

// @desc    Create a new company
// @route   POST /api/v1/companies
// @access  Admin
exports.createCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.create(req.body);
  res.status(201).json({
    status: "success",
    data: company,
  });
});

// @desc    Update an existing company
// @route   PUT /api/v1/companies/:id
// @access  Admin
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation rules are applied
  });

  if (!company) {
    return next(new ApiError(`No company found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: company,
  });
});

// @desc    Delete a company
// @route   DELETE /api/v1/companies/:id
// @access  Admin
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return next(new ApiError(`No company found with ID ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
