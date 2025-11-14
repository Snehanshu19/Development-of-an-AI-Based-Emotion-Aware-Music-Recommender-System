// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CoverPage from "./components/CoverPage";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// import ManoRaag from "./components/ManoRaag";
// import LandingPage from "./components/LandingPage";
// import ChatJournal from "./components/ChatJournal";
// import { GoogleOAuthProvider } from "@react-oauth/google";



// function App() {
//   return (
   
//       <GoogleOAuthProvider clientId="955368993073-oq4b6s3fbs5v50ics1tsdngek1qn2gvl.apps.googleusercontent.com">
//         <Router>
//           <Routes>
//             <Route path="/home" element={<CoverPage />} />
//             <Route path="/detection" element={<ManoRaag />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/mood_companion" element={<ChatJournal />} />
      
//           </Routes>
//         </Router>
//       </GoogleOAuthProvider>
   
//   );
// }

// export default App;







import React, { useState, useEffect } from "react";
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

  // This effect adds the correct theme class to the body
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);
  
  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <Router>
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          showFloatingElements={showFloatingElements}
          setShowFloatingElements={setShowFloatingElements}
        />
        <Routes>
          {/* Pass the darkMode and showEffects props to CoverPage */}
          <Route path="/home" element={<CoverPage darkMode={darkMode} showEffects={showFloatingElements} />} />
          
          {/* Other routes remain the same as your original file */}
          <Route path="/detection" element={<Moodify darkMode={darkMode} />} />
          <Route path="/signin" element={<SignIn darkMode={darkMode} />} />
          <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/mood_companion" element={<ChatJournal darkMode={darkMode} />} />
        </Routes>
        <NotificationSystem />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
