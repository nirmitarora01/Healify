require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatbotRoutes = require('./chatbot/chatbotRoutes');
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointments");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Allow frontend to communicate with backend
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Change this if frontend is on a different port

mongoose.connect("mongodb://127.0.0.1:27017/healify", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/auth", authRoutes);

// Use routes
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Healifi Backend!");
});

// Chatbot routes
app.use('/api/chatbot', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
