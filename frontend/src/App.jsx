import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import "./App.css";
import './components/Chatbot.css';
import Appointment from "./components/Appointment";
import Navbar from "./components/NavBar";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <AuthProvider>
      <Router>
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
