import React from "react";
import "./AdminDashboard.css";
import doctorImage from "../assets/doctor.jpg";
import AdminSidebar from "./AdminSideBar";

const AdminDashboard = () => {
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
              <h2>1500</h2>
            </div>
            <div className="dashboard-card doctors">
              <h4>Registered Doctors</h4>
              <h2>10</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
