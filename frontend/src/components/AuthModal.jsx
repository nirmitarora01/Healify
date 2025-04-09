import React, { useState } from "react";
import axios from "axios";
import "./AuthModal.css";
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Backend URL should match your existing setup
  const API_BASE_URL = "http://localhost:5000"; // Change this if needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format!");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        // Login Request
        const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email,
          password,
        });

        login(res.data.user); // Use the login function from context
        onClose();
      } else {
        // Signup Request
        const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
          email,
          password,
        });

        alert(`Signup successful! You are registered as ${res.data.role}.`);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
