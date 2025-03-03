import React from "react";
import doctor1 from "../assets/doctor1.webp";
import doctor2 from "../assets/doctor2.webp";
import doctor3 from "../assets/doctor3.jpg";

const doctors = [
  {
    id: 1,
    name: "Dr. Aditi Sharma",
    specialty: "Cardiologist",
    image: doctor1,
  },
  {
    id: 2,
    name: "Dr. Kavita Verma",
    specialty: "Pediatrician",
    image: doctor2,
  },
  {
    id: 3,
    name: "Dr. Rajesh Mehta",
    specialty: "Dermatologist",
    image: doctor3,
  },
];

const FeaturedDoctors = () => {
  return (
    <section className="featured-doctors">
      <h2>Meet Our Expert Doctors</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <button className="doctor-btn">Book Appointment</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDoctors;
