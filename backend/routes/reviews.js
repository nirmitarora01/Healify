const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Review = require("../models/Review"); 
const router = express.Router();

router.use(express.json());

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp|mp4|mkv|avi|mov|wmv|flv/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid File Type. Only photos and videos are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB file size limit
  fileFilter: fileFilter,
});

// Route to Add a New Review
router.post("/addReview", upload.array("media", 10), async (req, res) => {
  try {
    const { name, rating, reviewText } = req.body;
    if (!rating) {
      return res.status(400).json({ msg: "Rating is required" });
    }
    if (!reviewText) {
      return res.status(400).json({ msg: "Review text is required" });
    }

    let mediaUrls = [];
    if (req.files && req.files.length > 0) {
      mediaUrls = req.files.map((file) => {
        const mediaPath = file.path;
        return `${req.protocol}://${req.get("host")}/${mediaPath}`;
      });
    }

    const newReview = new Review({
      name: name || "Anonymous",
      rating,
      reviewText,
      media_urls: mediaUrls,
    });

    await newReview.save();

    res.status(201).json({
      msg: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error adding review", error: error.message });
  }
});

// Route to Fetch All Reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find(); 
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching reviews", error: error.message });
  }
});

module.exports = router;
