require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const chatbotRoutes = require('./chatbot/chatbotRoutes');
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointments");
const User = require("./models/User"); // Import User model
const bcrypt = require("bcryptjs"); // For hashing admin password
const paymentRoutes = require("./routes/payments"); // Import payment routes
require("./jobs/reminderJob");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Allow frontend to communicate with backend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Function to auto-create default admin
const createDefaultAdmin = async () => {
  const email = "nirmitarora@gmail.com";
  const password = "Nirmitarora@01";

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      password: hashedPassword,
      role: "Admin"
    });
    await admin.save();
    console.log("✅ Default admin user created.");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }
};

// Connect to MongoDB and start server
mongoose.connect("mongodb://127.0.0.1:27017/healify", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ MongoDB connected");
  await createDefaultAdmin(); // Ensure admin is created before server starts
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/payments", paymentRoutes); // Use payment routes

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Healifi Backend!");
});
