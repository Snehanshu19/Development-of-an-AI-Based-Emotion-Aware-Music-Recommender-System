// import React, { useState } from "react";
// import WebcamCapture from "./WebcamCapture";
// import SongCard from "./SongCard";
// import Filters from "./Filters";
// import EmotionBox from "./EmotionBox";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const API_URL = "http://127.0.0.1:5000";

// function Moodify() {
//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [emotion, setEmotion] = useState(null);
//   const [confidence, setConfidence] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [numSongs, setNumSongs] = useState(10);
//   const [langFilter, setLangFilter] = useState([]);
//   const [artistFilter, setArtistFilter] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [artists, setArtists] = useState([]);
//   const [method, setMethod] = useState("upload");
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(true); // theme state

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   // Detect emotion function
//   const detectEmotion = async (imgData) => {
//     if (!imgData) return;
//     setLoading(true);
//     try {
//       const blob = await (await fetch(imgData)).blob();
//       const formData = new FormData();
//       formData.append("file", blob, "image.jpg");

//       const res = await fetch(`${API_URL}/detect-emotion`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (!data.error) {
//         setEmotion(data.emotion);
//         setConfidence(data.confidence);
//         fetchSongs(data.emotion);
//       } else alert(data.error);
//     } catch (err) {
//       alert(err);
//     }
//     setLoading(false);
//   };

//   // Fetch songs function
//   const fetchSongs = async (detectedEmotion) => {
//     if (!detectedEmotion) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/recommendations`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ emotion: detectedEmotion, num_songs: 50 }),
//       });
//       const data = await res.json();
//       if (!data.error) {
//         const fetchedSongs = data.songs || [];
//         setSongs(fetchedSongs);
//         const langs = [...new Set(fetchedSongs.map((s) => s.language))];
//         const arts = [...new Set(fetchedSongs.map((s) => s.artist))];
//         setLanguages(langs);
//         setArtists(arts);
//         setLangFilter(langs);
//         setArtistFilter(arts);
//       } else {
//         alert(data.error);
//         setSongs([]);
//       }
//     } catch (err) {
//       alert(err);
//       setSongs([]);
//     }
//     setLoading(false);
//   };

//   const filteredSongs =
//     songs &&
//     songs.length > 0 &&
//     langFilter.length > 0 &&
//     artistFilter.length > 0
//       ? songs
//           .filter(
//             (s) =>
//               langFilter.includes(s.language) &&
//               artistFilter.includes(s.artist)
//           )
//           .slice(0, numSongs)
//       : [];

//   return (
//     <>
//       {/* Navbar outside app-container */}
//       <nav className={darkMode ? "navbar dark-mode" : "navbar light-mode"}>
//         <div className="nav-container">
//           <div className="logo" onClick={() => navigate("/")}>
//             <i className="fas fa-music"></i>
//             <span>ManoRaag</span>
//           </div>
//           <div className="nav-links">
//             <button className="nav-link" onClick={() => navigate("/home")}>
//               Home
//             </button>
//             <button className="nav-link" onClick={() => navigate("/detection")}>
//               Detect Emotion
//             </button>
//             <button className="nav-link" onClick={() => navigate("/mood_companion")}>
//               Mood Companion
//             </button>
//             {/* Theme toggle button */}
//             <button className="theme-toggle" onClick={toggleTheme}>
//               {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Page container (separate from navbar) */}
//       <div className={darkMode ? "app-container dark-mode" : "app-container light-mode"}>
//         {/* Page Header */}
//         <header className="moodify-header">
//           <div className="header-content">
//             <div className="header-text">
//               <h1>
//                 🎵 ManoRaag: <span className="gradient-text">Music That Feels You</span>
//               </h1>
//               <p>✨ Experience AI-powered music recommendations based on your mood ✨</p>
//             </div>
//           </div>
//         </header>

//         {/* Image upload/webcam */}
//         <div className="input-method">
//           <button
//             onClick={() => setMethod("upload")}
//             className={method === "upload" ? "active" : ""}
//           >
//             Upload Image
//           </button>
//           <button
//             onClick={() => setMethod("webcam")}
//             className={method === "webcam" ? "active" : ""}
//           >
//             Use Webcam
//           </button>
//         </div>

//         <div className="image-input">
//           {method === "upload" && (
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (!file) return;
//                 const reader = new FileReader();
//                 reader.onloadend = () => setImage(reader.result);
//                 reader.readAsDataURL(file);
//               }}
//             />
//           )}
//           {method === "webcam" && (
//             <WebcamCapture enabled={!image} onCaptureDataUrl={setImage} />
//           )}
//         </div>
        

//         {/* Image preview or placeholder */}
//         <div className="image-preview-container">
//           {image ? (
//             <div className="image-preview">
//               <img src={image} alt="Preview" />
//               <button onClick={() => detectEmotion(image)} disabled={loading}>
//                 {loading ? "Detecting..." : "Detect Emotion"}
//               </button>
//             </div>
//           ) : (
//             <div className="image-placeholder">
//               <p>No image uploaded yet. Upload an image or use your webcam.</p>
//             </div>
//           )}
//         </div>

//         {emotion && <EmotionBox emotion={emotion} confidence={confidence} />}

//         {/* Filters */}
//         {songs && songs.length > 0 && (
//           <Filters
//             languages={languages}
//             artists={artists}
//             langFilter={langFilter}
//             setLangFilter={setLangFilter}
//             artistFilter={artistFilter}
//             setArtistFilter={setArtistFilter}
//             numSongs={numSongs}
//             setNumSongs={setNumSongs}
//           />
//         )}

//         {loading && <p className="loading-text">Fetching songs...</p>}

//         {/* Songs */}
//         <div className="song-grid">
//           {filteredSongs.map((s, i) => (
//             <SongCard key={i} song={s} />
//           ))}
//           {filteredSongs.length === 0 && songs.length > 0 && (
//             <p>No songs match your filters.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Moodify;
























import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import SongCard from "./SongCard";
import Filters from "./Filters";
import EmotionBox from "./EmotionBox";
import AICompanion from "./AICompanion";
import { FloatingElements, ParticleSystem, BackgroundWaves } from "./FloatingElements";
import { AnimatedOrbs, MorphingShapes, AnimatedTextReveal, FloatingActionButton, MagneticCursor, StaggeredContainer } from "./EnhancedAnimations";
import { LoadingAnimation, SkeletonLoader } from "./LoadingAnimation";
import ImagePreview from "./ImagePreview";
import { showSuccess, showError, showInfo } from "./NotificationSystem";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://127.0.0.1:5000";

// --- The component now correctly receives and uses the darkMode prop ---
function Moodify({ darkMode }) { 
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [songs, setSongs] = useState([]);
  const [numSongs, setNumSongs] = useState(10);
  const [langFilter, setLangFilter] = useState([]);
  const [artistFilter, setArtistFilter] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [artists, setArtists] = useState([]);
  const [method, setMethod] = useState("upload");
  const [loading, setLoading] = useState(false);
  
  // NOTE: These states are now managed by App.js and passed down via props, 
  // but we keep a local state for the animations toggle if App.js doesn't manage it globally.
  // Assuming showFloatingElements state is handled by App.js and passed down (as per the button logic in App.js)
  // For now, we will use a local state default if the prop isn't passed down.
  const [showFloatingElements, setShowFloatingElements] = useState(true); 
  const [isDragOver, setIsDragOver] = useState(false);

  const handleCompanionAction = (action) => {
    if (action === 'music' && emotion) {
      const musicSection = document.querySelector('.song-grid');
      if (musicSection) {
        musicSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFileSelect = (file) => {
    console.log('handleFileSelect called with:', file);
    if (!file) {
      console.log('No file provided');
      return;
    }
    
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      showError('Please select a valid image file (JPG, PNG, GIF)');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      console.log('File too large:', file.size);
      showError('Image size should be less than 10MB');
      return;
    }
    
    console.log('Starting file read...');
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('File read successfully');
      setImage(reader.result);
      showSuccess('Image uploaded successfully! Click "Detect Emotion" to analyze.');
    };
    reader.onerror = () => {
      console.log('File read error');
      showError('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const detectEmotion = async (imgData) => {
    if (!imgData) return;
    setLoading(true);
    try {
      const blob = await (await fetch(imgData)).blob();
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      const res = await fetch(`${API_URL}/detect-emotion`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.error) {
        setEmotion(data.emotion);
        setConfidence(data.confidence);
        showSuccess(`Emotion detected: ${data.emotion} (${(data.confidence * 100).toFixed(1)}% confidence)`, 4000);
        fetchSongs(data.emotion);
      } else {
        showError(data.error || "Failed to detect emotion. Please try again.");
      }
    } catch (err) {
      showError("Network error. Please check your connection and try again.");
      console.error("Detection error:", err);
    }
    setLoading(false);
  };

  const fetchSongs = async (detectedEmotion) => {
    if (!detectedEmotion) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion: detectedEmotion, num_songs: 50 }),
      });
      const data = await res.json();
      if (!data.error) {
        const fetchedSongs = data.songs || [];
        setSongs(fetchedSongs);
        const langs = [...new Set(fetchedSongs.map((s) => s.language))];
        const arts = [...new Set(fetchedSongs.map((s) => s.artist))];
        setLanguages(langs);
        setArtists(arts);
        setLangFilter(langs);
        setArtistFilter(arts);
        showInfo(`Found ${fetchedSongs.length} songs matching your ${detectedEmotion} mood!`, 3000);
      } else {
        showError(data.error || "Failed to fetch music recommendations.");
        setSongs([]);
      }
    } catch (err) {
      showError("Failed to load music recommendations. Please try again.");
      console.error("Music fetch error:", err);
      setSongs([]);
    }
    setLoading(false);
  };

  const filteredSongs =
    songs &&
    songs.length > 0 &&
    langFilter.length > 0 &&
    artistFilter.length > 0
      ? songs
          .filter(
            (s) =>
              langFilter.includes(s.language) &&
              artistFilter.includes(s.artist)
          )
          .slice(0, numSongs)
      : [];

  return (
    <>
      <MagneticCursor />
      <AnimatedOrbs emotion={emotion || 'neutral'} intensity="medium" />
      <MorphingShapes isActive={showFloatingElements} />
      <ParticleSystem theme={darkMode ? 'dark' : 'light'} intensity="medium" />
      <BackgroundWaves emotion={emotion} isActive={showFloatingElements} />
      
      {emotion && (
        <FloatingElements 
          emotion={emotion} 
          isActive={showFloatingElements && !loading} 
        />
      )}

      {/* Apply dark-mode or light-mode class based on prop */}
      <div className={darkMode ? "app-container dark-mode" : "app-container light-mode"}>
        <header className="moodify-header">
          <div className="header-content">
            <div className="header-text">
              <AnimatedTextReveal delay={300}>
                <h1>
                  🎵 ManoRaag: <span className="gradient-text">Music That Feels You</span>
                </h1>
              </AnimatedTextReveal>
              <AnimatedTextReveal delay={600}>
                <p>✨ Experience AI-powered music recommendations based on your mood ✨</p>
              </AnimatedTextReveal>
            </div>
          </div>
        </header>

        <div className="moodify-main-content">
          <AnimatedTextReveal delay={900}>
            <div className="input-method-container">
              <div className="method-selection">
                <FloatingActionButton
                  icon="fas fa-cloud-upload-alt"
                  onClick={() => {
                    setMethod("upload");
                    console.log('Upload method selected');
                    showInfo('Upload method selected. Click the upload area below to choose a file.');
                  }}
                  emotion={method === "upload" ? "happy" : "neutral"}
                >
                  📁 Upload Image
                </FloatingActionButton>
                <FloatingActionButton
                  icon="fas fa-video"
                  onClick={() => setMethod("webcam")}
                  emotion={method === "webcam" ? "happy" : "neutral"}
                >
                  📷 Use Webcam
                </FloatingActionButton>
              </div>

              <div className="image-input-section">
                {method === "upload" && (
                  <div className="upload-area">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        console.log('File input changed:', e.target.files);
                        handleFileSelect(e.target.files[0]);
                      }}
                    />
                    <label 
                      htmlFor="file-upload" 
                      className={`upload-label magnetic ${isDragOver ? 'drag-over' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => console.log('Upload label clicked')}
                    >
                      <div className="upload-content">
                        <i className="fas fa-cloud-upload-alt upload-icon"></i>
                        <h3>📁 Click to Upload Image</h3>
                        <p>Or drag and drop your image here</p>
                        <span className="upload-formats">
                          📸 Supports: JPG, PNG, GIF (Max 10MB)
                        </span>
                      </div>
                    </label>
                    <button 
                      className="backup-upload-btn floating-action-btn magnetic"
                      onClick={() => {
                        console.log('Backup button clicked');
                        document.getElementById('file-upload').click();
                      }}
                    >
                      🔍 Browse Files (Backup)
                    </button>
                  </div>
                )}
                {method === "webcam" && (
                  <div className="webcam-section">
                    
                    <WebcamCapture
                      enabled={true}
                      onCaptureDataUrl={(img, detectedEmotion, detectedSongs) => {
                       if (img) setImage(img); // only for manual capture
                       if (detectedEmotion) setEmotion(detectedEmotion);
                       if (detectedSongs && detectedSongs.length > 0) {
                        setSongs(detectedSongs);

      // Extract unique filters like in fetchSongs()
                        const langs = [...new Set(detectedSongs.map((s) => s.language))];
                        const arts = [...new Set(detectedSongs.map((s) => s.artist))];
                        setLanguages(langs);
                        setArtists(arts);
                        setLangFilter(langs);
                        setArtistFilter(arts);
                      }
                    }}
                  />

                  </div>
                )}
              </div>
            </div>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={1200}>
            {image ? (
              <ImagePreview
                image={image}
                onDetectEmotion={() => detectEmotion(image)}
                onClearImage={() => {
                  setImage(null);
                  setEmotion(null);
                  setConfidence(null);
                  setSongs([]);
                  showInfo('Image cleared. Upload a new image to continue.');
                }}
                loading={loading}
                emotion={emotion}
                confidence={confidence}
              />
            ) : (
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <i className="fas fa-image placeholder-icon"></i>
                  <h3>🖼️ No Image Selected</h3>
                  <p>Choose "Upload Image" or "Use Webcam" above to get started</p>
                  <div className="placeholder-features">
                    <span>✨ AI-powered emotion detection</span>
                    <span>🎵 Personalized music recommendations</span>
                    <span>🎭 Real-time mood analysis</span>
                  </div>
                </div>
              </div>
            )}
          </AnimatedTextReveal>

          {emotion && <EmotionBox emotion={emotion} confidence={confidence} />}

          {songs && songs.length > 0 && (
            <Filters
              languages={languages}
              artists={artists}
              langFilter={langFilter}
              setLangFilter={setLangFilter}
              artistFilter={artistFilter}
              setArtistFilter={setArtistFilter}
              numSongs={numSongs}
              setNumSongs={setNumSongs}
            />
          )}

          <LoadingAnimation 
            isVisible={loading} 
            message={emotion ? "Finding perfect songs for your mood..." : "Analyzing your emotion..."} 
            type={emotion ? "music" : "emotion"} 
          />
          
          {loading && songs.length === 0 && (
            <SkeletonLoader type="card" count={6} />
          )}

          <StaggeredContainer className="song-grid" staggerDelay={150}>
            {filteredSongs.map((s, i) => (
              <div key={i} className="magnetic">
                <SongCard song={s} />
              </div>
            ))}
            {filteredSongs.length === 0 && songs.length > 0 && (
              <AnimatedTextReveal>
                <p>No songs match your filters.</p>
              </AnimatedTextReveal>
            )}
          </StaggeredContainer>
        </div>
      </div>

      <AICompanion 
        currentEmotion={emotion}
        isDetecting={loading}
        onSuggestAction={handleCompanionAction}
        darkMode={darkMode}
      />
    </>
  );
}

export default Moodify;
