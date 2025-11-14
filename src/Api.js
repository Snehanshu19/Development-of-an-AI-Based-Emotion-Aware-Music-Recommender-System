// // src/api.js
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// export const detectEmotion = (file) => {
//   const fd = new FormData();
//   fd.append("file", file);
//   return axios.post(`${API_URL}/detect-emotion`, fd, {
//     headers: { "Content-Type": "multipart/form-data" },
//     timeout: 20000,
//   });
// };

// export const getRecommendations = (emotion, num_songs = 50) => {
//   return axios.post(`${API_URL}/recommendations`, null, {
//     params: { emotion, num_songs },
//     timeout: 20000,
//   });
// };



















//Priyanshi Files
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CoverPage from "./components/CoverPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Moodify from "./components/Moodify";
import LandingPage from "./components/LandingPage";
import ChatJournal from "./components/ChatJournal";
import NotificationSystem from "./components/NotificationSystem";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

// This is the updated Header component. It will always render all buttons.
const Header = ({ darkMode, toggleTheme, showFloatingElements, setShowFloatingElements }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={darkMode ? "navbar dark-mode" : "navbar light-mode"}>
      <div className="nav-container">
        <div className="logo" onClick={() => navigate("/")}>
          <i className="fas fa-music"></i>
          <span>ManoRaag</span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="nav-link" onClick={() => navigate("/detection")}>
            Detect Emotion
          </button>
          <button className="nav-link" onClick={() => navigate("/mood_companion")}>
            Mood Companion
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button 
            className="theme-toggle" 
            onClick={() => setShowFloatingElements(!showFloatingElements)}
            title="Toggle animations"
          >
            {showFloatingElements ? "🎭 Hide Effects" : "✨ Show Effects"}
          </button>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showFloatingElements, setShowFloatingElements] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <GoogleOAuthProvider clientId="955368993073-oq4b6s3fbs5v50ics1tsdngek1qn2gvl.apps.googleusercontent.com">
      <Router>
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          showFloatingElements={showFloatingElements}
          setShowFloatingElements={setShowFloatingElements}
        />
        <Routes>
          <Route path="/home" element={<CoverPage />} />
          <Route path="/detection" element={<Moodify />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/mood_companion" element={<ChatJournal />} />
        </Routes>
        <NotificationSystem />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;