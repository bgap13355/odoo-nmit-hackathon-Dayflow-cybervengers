const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Make sure to install bcryptjs if you use hashing

// SIGNUP ROUTE (Handles full name, email, password from Sagarika's signup form)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Save new user to local MongoDB
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully! Please verify." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN ROUTE (Handles sign-in verification)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;