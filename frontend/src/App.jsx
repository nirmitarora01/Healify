import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Appointment from "./components/Appointment";
import Navbar from "./components/NavBar";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdminDashboard from "./components/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import DoctorsPage from "./components/DoctorsPage";
import AddAdminPage from "./components/AddAdminPage";
import AddDoctorPage from "./components/AddDoctorPage";
import './App.css';
import './components/Chatbot.css';

import Payment from "./components/Payment";
import PaymentSuccess from "./components/PaymentSuccess"; // Import PaymentSuccess


const AppContent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  // Hide Navbar on admin-related pages (e.g., /admin, /add-admin, /add-doctor)
  const hideNavbar = ["/admin", "/add-admin", "/add-doctor", "/doctors"].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/add-admin" element={<AddAdminPage />} />
          <Route path="/add-doctor" element={<AddDoctorPage />} />
        </Routes>
      </main>

      {/* Conditionally render the chat component */}
      {!hideNavbar && (
        <>
          <button className="chat-toggle-btn" onClick={toggleChat}>
            Chat
          </button>
          {isChatOpen && <Chatbot />}
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>

        <AppContent />

        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/appointment"
                element={
                  <ProtectedRoute>
                    <Appointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            </Routes>
          </main>

          <button
            className="chat-toggle-btn"
            onClick={toggleChat}
          >
            Chat
          </button>

          {isChatOpen && <Chatbot />}
        </div>

      </Router>
    </AuthProvider>
  );
};

export default App;