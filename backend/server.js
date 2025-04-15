require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const chatbotRoutes = require("./chatbot/chatbotRoutes");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointments");
const User = require("./models/User"); // Import User model
const bcrypt = require("bcryptjs"); // For hashing admin password
const paymentRoutes = require("./routes/payments"); // Import payment routes
const doctorRoutes = require("./routes/doctors");
const adminRoutes = require("./routes/adminRoutes");

require("./jobs/reminderJob");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" })); // Increase limit to 10MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // For form data if needed

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
      role: "Admin",
    });
    await admin.save();
    console.log("✅ Default admin user created.");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }
};

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/healify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected");
    await createDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/payments", paymentRoutes); // Use payment routes
app.use("/api/doctors", doctorRoutes);
app.use('/api/admins', adminRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Healifi Backend!");
});
