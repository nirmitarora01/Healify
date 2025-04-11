// src/components/ReviewList.js
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews");
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <h3>{review.name}</h3>
          <p>Rating: {review.rating}</p>
          <p>{review.reviewText}</p>
          {review.media_urls.map((url, index) => (
            url.endsWith(".mp4") ? 
            <video key={index} src={url} controls width="200" /> : 
            <img key={index} src={url} alt="media" width="200" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;


