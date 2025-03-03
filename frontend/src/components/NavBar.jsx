import React, { useState } from "react";
import AuthModal from "./AuthModal";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const openAuthModal = (signup = false) => {
    setIsSignup(signup);
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src={logo} alt="Healifi Logo" /></div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#doctors">Doctors</a>
        </li>
        <li>
          <a href="#appointments">Appointments</a>
        </li>
        <li>
          <a href="#footer">Contact</a>
        </li>
      </ul>
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => openAuthModal(false)}>
          Login
        </button>
        <button
          className="nav-btn signup-btn"
          onClick={() => openAuthModal(true)}
        >
          Sign Up
        </button>
      </div>
      {/* Auth Modal Component */}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          isSignup={isSignup}
          onClose={closeAuthModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
