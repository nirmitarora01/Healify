import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import doctorImage from "../assets/doctor.jpg";
import AdminSidebar from "./AdminSideBar";
import axios from "axios";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);

  const statusOptions = ["Pending", "Accepted", "Rejected", "Waiting"];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch appointments");
      setLoading(false);
      console.error("Error fetching appointments:", err);
    }
  };

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        status: newStatus
      });
      // Refresh appointments after update
      fetchAppointments();
      setEditingStatus(null);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(/,/, '');
  };

  if (loading) {
    return (
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        <div className="admin-dashboard">
          <div className="loading">Loading appointments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-wrapper">
        <AdminSidebar />
        <div className="admin-dashboard">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      <AdminSidebar />

      <div className="admin-dashboard">
        <div className="admin-header">
          <div className="admin-left">
            <img
              src={doctorImage}
              alt="Admin"
              className="admin-avatar"
            />
            <div className="admin-info">
              <h2>Hello, <span className="admin-name">Dr. Sam</span></h2>
              <p>
                Welcome to your Admin Dashboard. From here, you can manage appointments,
                monitor doctor registrations, and oversee platform activity.
              </p>
            </div>
          </div>

          <div className="admin-cards">
            <div className="dashboard-card appointments">
              <h4>Total Appointments</h4>
              <h2>{appointments.length}</h2>
            </div>
            <div className="dashboard-card doctors">
              <h4>Registered Doctors</h4>
              <h2>10</h2>
            </div>
          </div>
        </div>

        <div className="appointments-section">
          <h3>Appointments</h3>
          <div className="appointments-table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  // Extract department from doctor string
                  const [doctorName, department] = appointment.doctor.split(' - ');
                  
                  return (
                    <tr key={appointment._id}>
                      <td>
                        <div className="patient-info">
                          <div className="patient-name">{appointment.name}</div>
                          <div className="patient-details">
                            {appointment.age} yrs • {appointment.sex}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <div>{appointment.email}</div>
                          <div>{appointment.phoneNumber}</div>
                        </div>
                      </td>
                      <td>{doctorName}</td>
                      <td>{department}</td>
                      <td>{formatDate(appointment.date)}</td>
                      <td>
                        {editingStatus === appointment._id ? (
                          <select
                            className={`status-select ${appointment.status.toLowerCase()}`}
                            value={appointment.status}
                            onChange={(e) => updateStatus(appointment._id, e.target.value)}
                            onBlur={() => setEditingStatus(null)}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`status ${appointment.status.toLowerCase()}`}
                            onClick={() => setEditingStatus(appointment._id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {appointment.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
