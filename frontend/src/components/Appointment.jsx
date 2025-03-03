import React, { useState } from 'react';
import axios from 'axios';
import './Appointment.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    sex: '',
    phoneNumber: '',
    doctor: '',
    date: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const doctors = [
    "Dr. Aditi Sharma - Cardiologist",
    "Dr. Kavita Verma - Pediatrician",
    "Dr. Rajesh Mehta - Dermatologist"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', formData);
      setMessage('Appointment booked successfully!');
      setFormData({
        name: '',
        email: '',
        age: '',
        sex: '',
        phoneNumber: '',
        doctor: '',
        date: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error booking appointment');
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Sex:</label>
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Doctor:</label>
          <select name="doctor" value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment; 