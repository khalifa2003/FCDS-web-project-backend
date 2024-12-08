const Genre = require("../models/genre.model");

// === Create a New Genre ===
exports.createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const newGenre = new Genre({ name, description });
    const savedGenre = await newGenre.save();

    res
      .status(201)
      .json({ message: "Genre created successfully", genre: savedGenre });
  } catch (error) {
    console.error("Error creating genre:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// === Get All Genres ===
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// === Get a Genre by ID ===
exports.getGenreById = async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// === Update a Genre ===
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res
      .status(200)
      .json({ message: "Genre updated successfully", genre: updatedGenre });
  } catch (error) {
    console.error("Error updating genre:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// === Delete a Genre ===
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGenre = await Genre.findByIdAndDelete(id);
    if (!deletedGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
