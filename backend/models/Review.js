const mongoose = require("mongoose");

// Mongoose Schema and Model
const reviewSchema = new mongoose.Schema({
  reviewId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, 
  name: { type: String, default: "Anonymous" },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  media_urls: [String],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);