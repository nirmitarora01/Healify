const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  phoneNumber: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", AppointmentSchema); 