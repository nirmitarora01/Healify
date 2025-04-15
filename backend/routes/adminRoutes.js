const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Using User model, since Admin is a role within User
const bcrypt = require("bcryptjs"); // Add this line to import bcrypt

// POST /api/admins/add
router.post("/add", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Admin with this email already exists." });
        }

        // Create a new admin user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: "Admin", // Set the role as Admin
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin added successfully." });
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
