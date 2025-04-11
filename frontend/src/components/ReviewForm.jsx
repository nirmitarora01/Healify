// src/components/ReviewForm.js
import { useState } from "react";
import axios from "axios";

const ReviewForm = () => {
  const [formData, setFormData] = useState({ name: "", rating: "", reviewText: "" });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    
    for (let file of files) {
      data.append("media", file);
    }
    
    try {
      const res = await axios.post("http://localhost:5000/addReview", data);
      setMessage(res.data.msg);
    } catch (error) {
      setMessage("Error submitting review");
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
        <textarea name="reviewText" placeholder="Your Review" onChange={handleChange} required></textarea>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Submit Review</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewForm;



