import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import "./App.css";
import './components/Chatbot.css';
import Appointment from "./components/Appointment";
import Navbar from "./components/NavBar";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
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
  );
};

export default App;
