const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// POST: Add a new doctor
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      NIC,
      dateOfBirth,
      gender,
      password,
      department,
      image,
    } = req.body;
    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      mobileNumber,
      NIC,
      dateOfBirth,
      gender,
      password,
      department,
      image,
    });
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding doctor", error: error.message });
  }
});

// GET: Fetch all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
});

module.exports = router;
