import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import "./DoctorsPage.css";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-container">
      <AdminSideBar />
      <div className="doctors-content">
        <h1>Doctors List</h1>
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <img
                  src={doctor.image}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="doctor-image"
                />
                <h3>
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p>Email: {doctor.email}</p>
                <p>Mobile: {doctor.mobileNumber}</p>
                <p>NIC: {doctor.NIC}</p>
                <p>DOB: {new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
                <p>Gender: {doctor.gender}</p>
                <p>Department: {doctor.department}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
