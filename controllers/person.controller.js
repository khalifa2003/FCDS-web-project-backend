const asyncHandler = require("express-async-handler");
const Person = require("../models/person.model");
const ApiError = require("../utils/apiError");

// Get all persons with pagination and filtering
exports.getAllPersons = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const persons = await Person.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.status(200).json({ success: true, page, data: persons });
});

// Get a single person by ID
exports.getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id).populate(
    "movie_credits tv_credits"
  );
  if (!person) {
    return next(new ApiError("Person not found", 404));
  }
  res.status(200).json({ success: true, data: person });
});

// Create a new person
exports.createPerson = asyncHandler(async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.status(201).json({ success: true, data: person });
});

// Update an existing person
exports.updatePerson = asyncHandler(async (req, res) => {
  const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation is run on update
  });
  if (!person) {
    return next(new ApiError("Person not found", 404));
  }
  res.status(200).json({ success: true, data: person });
});

// Delete a person by ID
exports.deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findByIdAndDelete(req.params.id);
  if (!person) {
    return next(new ApiError("Person not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Person deleted successfully" });
});
