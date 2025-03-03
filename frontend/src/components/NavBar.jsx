import React, { useState } from "react";
import AuthModal from "./AuthModal";
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openAuthModal = (signup = false) => {
    setIsSignup(signup);
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">{/* <img src={logo} alt="Healifi Logo" /> */}</div>
      
      <div className="hamburger" onClick={toggleNav}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-content ${isNavOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => setIsNavOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/appointment" onClick={() => setIsNavOpen(false)}>Appointments</Link>
          </li>
          <li>
            <a href="#doctors" onClick={() => setIsNavOpen(false)}>Doctors</a>
          </li>
          <li>
            <a href="#footer" onClick={() => setIsNavOpen(false)}>Contact</a>
          </li>
        </ul>
        
        <div className="nav-buttons">
          {user ? (
            <>
              <div className="user-info">
                <FaUser />
                <span>{user.name}</span>
              </div>
              <button
                className="nav-btn logout-btn"
                onClick={() => {
                  handleLogout();
                  setIsNavOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-btn" onClick={() => {
                openAuthModal(false);
                setIsNavOpen(false);
              }}>
                Login
              </button>
              <button
                className="nav-btn signup-btn"
                onClick={() => {
                  openAuthModal(true);
                  setIsNavOpen(false);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          isSignup={isSignup}
          onClose={closeAuthModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;
