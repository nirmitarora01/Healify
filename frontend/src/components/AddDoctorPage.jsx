import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import "./AddDoctorPage.css";

const AddDoctorPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    NIC: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    department: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let base64Image = "";
      if (formData.image) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Error reading file"));
          reader.readAsDataURL(formData.image);
        });
      }

      const doctorData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        NIC: formData.NIC,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        password: formData.password,
        department: formData.department,
        image: base64Image,
      };

      console.log("Sending data to backend:", doctorData);
      await axios.post("http://localhost:5000/api/doctors", doctorData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        NIC: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        department: "",
        image: null,
      });
      setPreview(null);
      alert("Doctor added successfully!");
    } catch (error) {
      console.error(
        "Error adding doctor:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Failed to add doctor. Please try again. Check console for details."
      );
    }
  };

  return (
    <div className="add-doctor-container">
      <AdminSideBar />
      <div className="add-doctor-content">
        <h1>Register New Doctor</h1>
        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>NIC</label>
            <input
              type="text"
              name="NIC"
              value={formData.NIC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
          <button type="submit" className="register-button">
            Register New Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorPage;
