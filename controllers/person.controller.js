const asyncHandler = require("express-async-handler");
const Person = require("../models/person.model");

// Get all persons with pagination and filtering
exports.getAllPersons = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const persons = await Person.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json({ success: true, data: persons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a single person by ID
exports.getPersonById = asyncHandler(async (req, res) => {
  try {
    const person = await Person.findById(req.params.id).populate(
      "movie_credits tv_credits"
    );
    if (!person) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }
    res.status(200).json({ success: true, data: person });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new person
exports.createPerson = asyncHandler(async (req, res) => {
  try {
    const person = new Person(req.body); // Expecting a JSON body with person details
    await person.save();
    res.status(201).json({ success: true, data: person });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update an existing person
exports.updatePerson = asyncHandler(async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run on update
    });
    if (!person) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }
    res.status(200).json({ success: true, data: person });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a person by ID
exports.deletePerson = asyncHandler(async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
