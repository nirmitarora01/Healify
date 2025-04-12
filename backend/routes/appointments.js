const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
});

// Update appointment status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Status updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
});

module.exports = router;