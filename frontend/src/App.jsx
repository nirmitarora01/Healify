import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import "./App.css";
import './components/Chatbot.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <Router>
        <div>
          {/* Define routes for the app */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

      {/* Chatbot toggle button */}
      <button 
            className="chat-toggle-btn" 
            onClick={toggleChat}  // Toggle the chatbot visibility
          >
            Chat
          </button>

          {/* Chatbot component, visible only when isChatOpen is true */}
          {isChatOpen && <Chatbot />}
      </div>
      </Router>
    
  );
};

export default App;
