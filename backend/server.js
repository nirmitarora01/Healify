require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatbotRoutes = require('./chatbot/chatbotRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Import routes
// const appointmentRoutes = require("./routes/appointments");
// const doctorRoutes = require("./routes/doctors");

// // Use routes
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Healifi Backend!");
});

// Chatbot routes
app.use('/api/chatbot', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
