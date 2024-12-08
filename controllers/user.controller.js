const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Environment variables (e.g., JWT secret)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Controller Functions

/**
 * Create a new user
 */
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user.", error: err.message });
  }
};

/**
 * Log in a user
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
};

/**
 * Get user profile
 */
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user profile.", error: err.message });
  }
};

/**
 * Update user profile
 */
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, profile_picture } = req.body;

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profile_picture },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user.", error: err.message });
  }
};

/**
 * Add a movie to the watchlist
 */
const addToWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.watchlist.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie is already in the watchlist." });
    }

    user.watchlist.push(movieId);
    await user.save();

    res
      .status(200)
      .json({
        message: "Movie added to watchlist.",
        watchlist: user.watchlist,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error adding movie to watchlist.",
        error: err.message,
      });
  }
};

/**
 * Remove a movie from the watchlist
 */
const removeFromWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.watchlist = user.watchlist.filter((id) => id.toString() !== movieId);
    await user.save();

    res
      .status(200)
      .json({
        message: "Movie removed from watchlist.",
        watchlist: user.watchlist,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error removing movie from watchlist.",
        error: err.message,
      });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToWatchlist,
  removeFromWatchlist,
};
