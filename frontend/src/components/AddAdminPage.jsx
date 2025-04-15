import React, { useState } from "react";
import axios from "axios";
import AdminSideBar from "./AdminSideBar";
import "./AddAdminPage.css";

const AddAdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/admins/add", formData);
      setMessage("✅ Admin added successfully!");
      setIsSuccess(true);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add admin. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="add-admin-container">
      <AdminSideBar />

      <div className="add-admin-content">

        <form className="add-admin-form" onSubmit={handleSubmit}>
          <h1>Add a New Admin</h1>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
            />
          </div>

          <button type="submit">Add Admin</button>

          {message && (
            <div className={`add-admin-message ${isSuccess ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAdminPage;
