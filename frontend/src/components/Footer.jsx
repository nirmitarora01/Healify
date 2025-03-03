import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Contact Us</h3>
          <p><FaPhone /> +91 12345 67890</p>
          <p><FaEnvelope /> support@healifi.com</p>
          <p><FaMapMarkerAlt /> Chandigarh, India</p>
        </div>
        
        <div className="social-icons">
          <h3>Follow Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
      
      <p>&copy; 2025 Healifi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
