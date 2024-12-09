const express = require("express");

const { signup, login } = require("../controllers/auth.controller");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/auth.validator");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

module.exports = router;
