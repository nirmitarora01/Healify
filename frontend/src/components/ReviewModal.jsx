import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewModal.css";

const ReviewModal = ({ onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch reviews from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reviews/reviews")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  // Handle adding a new review
  const handleAddReview = async () => {
    if (!reviewText.trim()) return;

    const formData = new FormData();
    formData.append("name", name.trim() || "Anonymous");
    formData.append("rating", rating);
    formData.append("reviewText", reviewText);
    mediaFiles.forEach((file) => formData.append("media", file));

    try {
      const response = await axios.post("http://localhost:5000/api/reviews/addReview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReviews([response.data.review, ...reviews]);

      setSuccessMessage("Review added successfully!");
      setName("");
      setRating(5);
      setReviewText("");
      setMediaFiles([]);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Reviews</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Review List */}
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <strong>{review.name}</strong> ({review.rating} ⭐)
                <p>{review.reviewText}</p>
                {review.mediaUrls && review.media_urls.length > 0 && (
                  <div className="review-media">
                    {review.media_urls.map((url, i) => (
                      <img key={i} src={url} alt="Review media" className="review-image" />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Add Review Form */}
        <input
          type="text"
          className="review-name"
          placeholder="Your Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="review-input"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <select className="review-rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        {/* File Upload */}
        <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} />

        <button className="add-review-btn" onClick={handleAddReview}>
          Add Review
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
