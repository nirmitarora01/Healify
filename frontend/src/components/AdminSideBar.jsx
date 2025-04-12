import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserMd, FaUserPlus, FaUserNurse, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo3.png";
import "./AdminDashboard.css";
import { useAuth } from "../context/AuthContext";

const AdminSideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user
    navigate("/"); // go to home or login page
  };

  return (
    <aside className="admin-sidebar">
      <img src={logo} alt="Logo" className="admin-logo" />
      <nav className="admin-nav">
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
          <FaHome className="icon" /> Home
        </NavLink>
        <Link to="/doctors" title="Doctors">
          <FaUserMd className="icon" /> Doctors
        </Link>
        <Link to="/add-admin" title="Add new Admin">
          <FaUserPlus className="icon" /> Add Admin
        </Link>
        <Link to="/add-doctor" title="Add new Doctor">
          <FaUserNurse className="icon" /> Add Doctor
        </Link>
        <button
          onClick={handleLogout}
          className="logout-button"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "10px", textAlign: "left" }}
        >
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
