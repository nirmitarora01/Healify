const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // User Model
const router = express.Router();

// Register (First user is admin)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists!" });

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "Admin" : "User"; // First user is Admin, rest are Users

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password!" });

    res.json({ 
      message: "Login successful!", 
      user: {
        email: user.email,
        role: user.role,
        name: user.email.split('@')[0] // Using email username as name for now
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
