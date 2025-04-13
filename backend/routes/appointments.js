const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

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

/*
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
});*/

// Update appointment status and send email
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;  

    // Update appointment status in the database
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Get the email address and appointment details from the document
    const userEmail = appointment.email;
    const appointmentDate = new Date(appointment.date).toLocaleDateString(); // Format the date
    const doctorName = appointment.doctor; 
    const patientName = appointment.name; 

    // Set the email subject and message based on the status
    let subject = "Healifi Appointment Status Update";
    let message = `Dear ${patientName},\n\nYour appointment with ${doctorName} scheduled on ${appointmentDate} has been updated.\n\n`;

    // Add status-specific messages
    switch (status) {
      case "Accepted":
        message += "Congratulations! Your appointment has been accepted. We look forward to seeing you soon.\n\n";
        break;
      case "Rejected":
        message += `We’re sorry. Your appointment has been rejected.\nReason: ${"The doctor is unavailable on the specific date:("}\n\n`;
        break;
      case "Waiting":
        message += "Your appointment is on hold. We will get back to you within 24 hours. If not, please consider the appointment rejected and rebook.\n\n";
        break;
      default:
        message += `Your appointment status is now: ${status}.\n\n`;
    }

    // Add helpline number and closing
    message += `For any further inquiries, please contact our helpline at +91 12345 67890.\n\nThank you for choosing Healifi.\n\nBest regards,\nHealifi Team`;

    // Send the email
    await sendEmail(userEmail, subject, message);

    // Send response back to the client
    res.json({ message: "Status updated and email sent!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
});

module.exports = router;