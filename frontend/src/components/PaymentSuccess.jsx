import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css'; // Import the CSS file

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;

  if (!appointment) {
    // If no appointment data is available in the state,
    // it might mean the user navigated directly to this page.
    // Redirect them to a relevant page (e.g., appointment list or home).
    navigate('/appointment'); // Or navigate('/');
    return null;
  }

  return (
    <div className="payment-success-container">
      <h2>Payment Successful!</h2>
      <p>Your appointment has been successfully booked and payment has been received.</p>
      <div className="appointment-details">
        <h3>Appointment Details:</h3>
        <p><strong>Name:</strong> {appointment.name}</p>
        <p><strong>Doctor:</strong> {appointment.doctor}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()} {new Date(appointment.date).toLocaleTimeString()}</p>
        {/* You can display other relevant appointment details here */}
        {/* Status Badge */}
        <p><strong>Status:</strong> 
        <span className="status-badge confirmed">Confirmed</span>
        </p>
      </div>
      <button onClick={() => navigate('/appointment')}>Go to Appointments</button>
      <button onClick={() => navigate('/')}>Go to Homepage</button>
    </div>
  );
};

export default PaymentSuccess;