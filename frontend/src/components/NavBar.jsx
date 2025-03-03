import React from "react";
import logo from "../assets/logo.jpg"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src={logo} alt="Healifi Logo" /> */}
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#doctors">Doctors</a></li>
        <li><a href="#appointments">Appointments</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
      <div className="nav-buttons">
        <button className="nav-btn">Login</button>
        <button className="nav-btn signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
