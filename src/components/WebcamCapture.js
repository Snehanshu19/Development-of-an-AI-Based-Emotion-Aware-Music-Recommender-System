// // src/components/WebcamCapture.js
// import React, { useRef } from "react";
// import Webcam from "react-webcam";

// const WebcamCapture = ({ onCaptureDataUrl, enabled = false }) => {
//   const webcamRef = useRef(null);

//   const capture = () => {
//     if (!webcamRef.current) return;
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       onCaptureDataUrl(imageSrc);
//     }
//   };

//   if (!enabled) return null; // hide webcam if not enabled

//   return (
//     <div style={{ textAlign: "center", marginBottom: "20px" }}>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ width: 480, height: 360, facingMode: "user" }}
//         style={{
//           borderRadius: 12,
//           boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
//           marginBottom: 10,
//         }}
//       />
//       <br />
//       <button
//         onClick={capture}
//         style={{
//           padding: "10px 20px",
//           borderRadius: 12,
//           border: "1px solid #00f2fe",
//           background: "#1f1f1f",
//           color: "#00f2fe",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//       >
//         Capture Photo
//       </button>
//     </div>
//   );
// };

// export default WebcamCapture;



















// src/components/WebcamCapture.js
// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const WebcamCapture = ({ onCaptureDataUrl, enabled = true }) => {
//   const webcamRef = useRef(null);
//   const [isCapturing, setIsCapturing] = useState(false);

//   const capture = () => {
//     if (!webcamRef.current) return;
    
//     setIsCapturing(true);
    
//     // Add a small delay for visual feedback
//     setTimeout(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         onCaptureDataUrl(imageSrc);
//       }
//       setIsCapturing(false);
//     }, 200);
//   };

//   if (!enabled) return null;

//   const webcamStyle = {
//     borderRadius: "20px",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
//     border: "2px solid rgba(102, 126, 234, 0.3)",
//     transition: "all 0.3s ease",
//     filter: isCapturing ? "brightness(1.2)" : "brightness(1)",
//   };

//   const containerStyle = {
//     textAlign: "center",
//     marginBottom: "32px",
//     padding: "24px",
//     background: "rgba(255, 255, 255, 0.05)",
//     backdropFilter: "blur(20px)",
//     WebkitBackdropFilter: "blur(20px)",
//     borderRadius: "24px",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     maxWidth: "600px",
//     margin: "0 auto 32px auto",
//   };

//   const buttonStyle = {
//     padding: "14px 28px",
//     borderRadius: "50px",
//     border: "none",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "1rem",
//     marginTop: "16px",
//     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     position: "relative",
//     overflow: "hidden",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={{ marginBottom: "16px" }}>
//         <h3 style={{ 
//           color: "#f8fafc", 
//           marginBottom: "8px", 
//           fontSize: "1.25rem",
//           fontWeight: "600"
//         }}>
//           📸 Live Camera Feed
//         </h3>
//         <p style={{ 
//           color: "#cbd5e1", 
//           margin: "0",
//           fontSize: "0.95rem"
//         }}>
//           Position yourself in the frame and capture your emotion
//         </p>
//       </div>
      
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ 
//           width: 640, 
//           height: 480, 
//           facingMode: "user" 
//         }}
//         style={webcamStyle}
//       />
      
//       <button
//         onClick={capture}
//         disabled={isCapturing}
//         style={{
//           ...buttonStyle,
//           opacity: isCapturing ? 0.7 : 1,
//           transform: isCapturing ? "scale(0.95)" : "scale(1)",
//         }}
//         onMouseEnter={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(-2px)";
//             e.target.style.boxShadow = "0 12px 30px rgba(102, 126, 234, 0.6)";
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(0)";
//             e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
//           }
//         }}
//       >
//         <i className={`fas ${isCapturing ? 'fa-spinner fa-spin' : 'fa-camera'}`}></i>
//         {isCapturing ? "Capturing..." : "Capture Photo"}
//       </button>
//     </div>
//   );
// };

// export default WebcamCapture;
























// Webcam Capture + Preview
// src/components/WebcamCapture.js
// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";

// // ✅ WebcamCapture (untouched, only as you provided)
// const WebcamCapture = ({ onCaptureDataUrl, enabled = true }) => {
//   const webcamRef = useRef(null);
//   const [isCapturing, setIsCapturing] = useState(false);

//   const capture = () => {
//     if (!webcamRef.current) return;

//     setIsCapturing(true);

//     // Add a small delay for visual feedback
//     setTimeout(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         onCaptureDataUrl(imageSrc);
//       }
//       setIsCapturing(false);
//     }, 200);
//   };

//   if (!enabled) return null;

//   const webcamStyle = {
//     borderRadius: "20px",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
//     border: "2px solid rgba(102, 126, 234, 0.3)",
//     transition: "all 0.3s ease",
//     filter: isCapturing ? "brightness(1.2)" : "brightness(1)",
//   };

//   const containerStyle = {
//     textAlign: "center",
//     marginBottom: "32px",
//     padding: "24px",
//     background: "rgba(255, 255, 255, 0.05)",
//     backdropFilter: "blur(20px)",
//     WebkitBackdropFilter: "blur(20px)",
//     borderRadius: "24px",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     maxWidth: "600px",
//     margin: "0 auto 32px auto",
//   };

//   const buttonStyle = {
//     padding: "14px 28px",
//     borderRadius: "50px",
//     border: "none",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "1rem",
//     marginTop: "16px",
//     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     position: "relative",
//     overflow: "hidden",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={{ marginBottom: "16px" }}>
//         <h3
//           style={{
//             color: "#f8fafc",
//             marginBottom: "8px",
//             fontSize: "1.25rem",
//             fontWeight: "600",
//           }}
//         >
//           📸 Live Camera Feed
//         </h3>
//         <p
//           style={{
//             color: "#cbd5e1",
//             margin: "0",
//             fontSize: "0.95rem",
//           }}
//         >
//           Position yourself in the frame and capture your emotion
//         </p>
//       </div>

//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{
//           width: 640,
//           height: 480,
//           facingMode: "user",
//         }}
//         style={webcamStyle}
//       />

//       <button
//         onClick={capture}
//         disabled={isCapturing}
//         style={{
//           ...buttonStyle,
//           opacity: isCapturing ? 0.7 : 1,
//           transform: isCapturing ? "scale(0.95)" : "scale(1)",
//         }}
//         onMouseEnter={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(-2px)";
//             e.target.style.boxShadow =
//               "0 12px 30px rgba(102, 126, 234, 0.6)";
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(0)";
//             e.target.style.boxShadow =
//               "0 8px 20px rgba(102, 126, 234, 0.4)";
//           }
//         }}
//       >
//         <i
//           className={`fas ${
//             isCapturing ? "fa-spinner fa-spin" : "fa-camera"
//           }`}
//         ></i>
//         {isCapturing ? "Capturing..." : "Capture Photo"}
//       </button>
//     </div>
//   );
// };

// export default WebcamCapture;

// // ✅ WebcamPreview with face-api.js emotion detection
// export const WebcamPreview = ({ image, onRetake }) => {
//   const [emotion, setEmotion] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("/models");
//     };
//     loadModels();
//   }, []);

//   const detectEmotion = async () => {
//     if (!image) return;
//     setLoading(true);
//     const img = document.createElement("img");
//     img.src = image;
//     img.onload = async () => {
//       const detections = await faceapi
//         .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
//         .withFaceExpressions();

//       if (detections && detections.expressions) {
//         const sorted = Object.entries(detections.expressions).sort(
//           (a, b) => b[1] - a[1]
//         );
//         setEmotion(sorted[0][0]);
//       } else {
//         setEmotion("No face detected");
//       }
//       setLoading(false);
//     };
//   };

//   if (!image) return null;

//   const previewContainer = {
//     textAlign: "center",
//     marginBottom: "32px",
//     padding: "24px",
//     background: "rgba(255, 255, 255, 0.05)",
//     borderRadius: "24px",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     maxWidth: "600px",
//     margin: "0 auto 32px auto",
//   };

//   const imageStyle = {
//     maxWidth: "100%",
//     borderRadius: "16px",
//     marginBottom: "16px",
//     border: "2px solid rgba(102, 126, 234, 0.3)",
//     boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
//   };

//   const buttonGroup = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "12px",
//     marginTop: "12px",
//   };

//   const buttonStyle = {
//     padding: "12px 24px",
//     borderRadius: "50px",
//     border: "none",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "1rem",
//     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//   };

//   return (
//     <div style={previewContainer}>
//       <img src={image} alt="Captured preview" style={imageStyle} />
//       {emotion && (
//         <p style={{ color: "#fff", fontSize: "1.2rem", marginTop: "8px" }}>
//           {loading ? "Detecting..." : `Detected Emotion: ${emotion}`}
//         </p>
//       )}
//       <div style={buttonGroup}>
//         <button style={buttonStyle} onClick={onRetake}>
//           🔄 Retake
//         </button>
//         <button style={buttonStyle} onClick={detectEmotion} disabled={loading}>
//           😊 {loading ? "Detecting..." : "Detect Emotion"}
//         </button>
//       </div>
//     </div>
//   );
// };










































//Ram webcam
// src/components/WebcamCapture.js
// // src/components/WebcamCapture.js
// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";

// // Keep the API consistent: default noop so missing prop won't crash
// const noop = () => {};

// // ✅ WebcamCapture (keeps your styles; adds live face-api overlay & capture-with-overlay)
// const WebcamCapture = ({ onCaptureDataUrl = noop, enabled = true }) => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);

//   const [isCapturing, setIsCapturing] = useState(false);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [emotion, setEmotion] = useState("");
//   const [devices, setDevices] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState(null);

// const handleDetectedEmotion = async (emotion) => {
//   try {
//     const response = await fetch("http://127.0.0.1:5000/song_from_emotion", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ emotion }),
//     });
//     const data = await response.json();
//     console.log("Song received (webcam flow):", data.song);

//     // bubble up if parent wants to use it
//     if (onCaptureDataUrl) {
//       onCaptureDataUrl(null, emotion, data.song);
//     }
//   } catch (err) {
//     console.error("Error fetching song:", err);
//   }
// };

//   // Load models from public/models (process.env.PUBLIC_URL ensures correct path)
//   useEffect(() => {
//     let mounted = true;
//     const load = async () => {
//       try {
//         const MODEL_URL = process.env.PUBLIC_URL + "/models";
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//         ]);
//         if (mounted) {
//           setModelsLoaded(true);
//           // console.log("face-api models loaded from", MODEL_URL);
//         }
//       } catch (err) {
//         console.error("Error loading face-api models:", err);
//       }
//     };
//     load();
//     return () => {
//       mounted = false;
//     };
//   }, []);
// useEffect(() => {
//   const getDevices = async () => {
//     try {
//       const allDevices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = allDevices.filter(d => d.kind === "videoinput");
//       setDevices(videoDevices);

//       // Prefer PC webcam (label may not contain 'mobile'), fallback to first available
//       const pcCam = videoDevices.find(d => !d.label.toLowerCase().includes("mobile"));
//       setSelectedDeviceId(pcCam ? pcCam.deviceId : videoDevices[0]?.deviceId);
//     } catch (err) {
//       console.error("Error enumerating devices:", err);
//     }
//   };
//   getDevices();
// }, []);

//   // Real-time detection loop: draw boxes + expressions on canvas overlay
//   // useEffect(() => {
//   //   // Start detection only after models loaded
//   //   if (!modelsLoaded) return;

//   //   const detectLoop = async () => {
//   //     if (
//   //       !webcamRef.current ||
//   //       !webcamRef.current.video ||
//   //       webcamRef.current.video.readyState !== 4 ||
//   //       !canvasRef.current
//   //     ) {
//   //       return;
//   //     }

//   //     const video = webcamRef.current.video;
//   //     const canvas = canvasRef.current;

//   //     // match canvas size to video actual pixels
//   //     canvas.width = video.videoWidth;
//   //     canvas.height = video.videoHeight;
//   //     canvas.style.width = `${video.clientWidth}px`;
//   //     canvas.style.height = `${video.clientHeight}px`;

//   //     try {
//   //       const detections = await faceapi
//   //         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//   //         .withFaceLandmarks()
//   //         .withFaceExpressions();

//   //       // clear before drawing
//   //       const ctx = canvas.getContext("2d");
//   //       ctx.clearRect(0, 0, canvas.width, canvas.height);

//   //       if (detections.length > 0) {
//   //         // Resize detections to match display size
//   //         const displaySize = { width: video.videoWidth, height: video.videoHeight };
//   //         const resizedDetections = faceapi.resizeResults(detections, displaySize);

//   //         // draw boxes + expressions
//   //         faceapi.draw.drawDetections(canvas, resizedDetections);
//   //         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//   //         // set dominant emotion (from first face or aggregated logic)
//   //         const exprs = detections[0].expressions;
//   //         const top = Object.keys(exprs).reduce((a, b) => (exprs[a] > exprs[b] ? a : b));
//   //         setEmotion(top);
//   //       } else {
//   //         setEmotion("");
//   //       }
//   //     } catch (err) {
//   //       console.error("Detection error:", err);
//   //     }
//   //   };

//   //   // run at regular interval; store ref so we can clear on unmount
//   //   intervalRef.current = setInterval(detectLoop, 250); // 250ms gives responsive UI
//   //   return () => {
//   //     if (intervalRef.current) clearInterval(intervalRef.current);
//   //   };
//   // }, [modelsLoaded]);
// // --- inside your useEffect for detection loop ---
// // add this inside WebcamCapture, before useEffect

// useEffect(() => {
//   if (!modelsLoaded) return;

//   const detectLoop = async () => {
//     if (
//       !webcamRef.current ||
//       !webcamRef.current.video ||
//       webcamRef.current.video.readyState !== 4 ||
//       !canvasRef.current
//     ) return;

//     const video = webcamRef.current.video;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.style.width = `${video.clientWidth}px`;
//     canvas.style.height = `${video.clientHeight}px`;

//     try {
//       const detections = await faceapi
//         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();

//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (detections.length > 0) {
//         const displaySize = { width: video.videoWidth, height: video.videoHeight };
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//         const exprs = detections[0].expressions;

//         // Pick the dominant emotion with confidence threshold
//         const sorted = Object.entries(exprs).sort((a, b) => b[1] - a[1]);
//         const [topEmotion, topConfidence] = sorted[0];

//         if (topConfidence > 0.7 && topEmotion !== emotion) { // only if stable and confident
//           setEmotion(topEmotion);

//           // Send to backend
//           fetch("http://127.0.0.1:5000/emotion", { // replace with your Flask endpoint
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ emotion: topEmotion }),
//           })
//             .then(res => res.json())
//             .then(data => console.log("Backend response:", data))
//             .catch(err => console.error("Error sending emotion:", err));
//         }
//       } else {
//         setEmotion("");
//       }
//     } catch (err) {
//       console.error("Detection error:", err);
//     }
//   };

//   // Run every 1000ms for stability
//   intervalRef.current = setInterval(detectLoop, 1000);
//   return () => clearInterval(intervalRef.current);
// }, [modelsLoaded, emotion]);

//   // Capture screenshot + overlay and call onCaptureDataUrl(dataUrl, emotion)
//   const capture = async () => {
//     if (!webcamRef.current) return;
//     setIsCapturing(true);

//     try {
//       const video = webcamRef.current.video;
//       const overlayCanvas = canvasRef.current;

//       // Create temporary canvas matching video resolution (actual pixels)
//       const exportCanvas = document.createElement("canvas");
//       exportCanvas.width = video.videoWidth;
//       exportCanvas.height = video.videoHeight;
//       const ctx = exportCanvas.getContext("2d");

//       // draw current video frame
//       ctx.drawImage(video, 0, 0, exportCanvas.width, exportCanvas.height);

//       // draw overlay (boxes/labels) onto export canvas (if available)
//       if (overlayCanvas) {
//         // make sure overlay canvas is same pixel size
//         // overlayCanvas.width/height already matched in detection loop
//         ctx.drawImage(overlayCanvas, 0, 0, exportCanvas.width, exportCanvas.height);
//       }

//       const dataUrl = exportCanvas.toDataURL("image/jpeg");
//       // Call user's callback. Pass both image and emotion (second arg optional)
//       onCaptureDataUrl(dataUrl, emotion);
//     } catch (err) {
//       console.error("Capture error:", err);
//     } finally {
//       setIsCapturing(false);
//     }
//   };

//   if (!enabled) return null;

//   // --- keep your original styles exactly ---
//   const webcamStyle = {
//     borderRadius: "20px",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
//     border: "2px solid rgba(102, 126, 234, 0.3)",
//     transition: "all 0.3s ease",
//     filter: isCapturing ? "brightness(1.2)" : "brightness(1)",
//   };

//   const containerStyle = {
//     textAlign: "center",
//     marginBottom: "32px",
//     padding: "24px",
//     background: "rgba(255, 255, 255, 0.05)",
//     backdropFilter: "blur(20px)",
//     WebkitBackdropFilter: "blur(20px)",
//     borderRadius: "24px",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     maxWidth: "600px",
//     margin: "0 auto 32px auto",
//   };

//   const buttonStyle = {
//     padding: "14px 28px",
//     borderRadius: "50px",
//     border: "none",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "1rem",
//     marginTop: "16px",
//     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     position: "relative",
//     overflow: "hidden",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={{ marginBottom: "16px" }}>
//         <h3
//           style={{
//             color: "#f8fafc",
//             marginBottom: "8px",
//             fontSize: "1.25rem",
//             fontWeight: "600",
//           }}
//         >
//           📸 Live Camera Feed
//         </h3>
//         <p
//           style={{
//             color: "#cbd5e1",
//             margin: "0",
//             fontSize: "0.95rem",
//           }}
//         >
//           Position yourself in the frame and capture your emotion
//         </p>
//       </div>

//       {/* video + overlay container */}
//       <div style={{ position: "relative", width: "100%", maxWidth: 640, margin: "0 auto" }}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{
//             width: 640,
//             height: 480,
//             facingMode: "user",
//           }}
//           style={{ ...webcamStyle, width: "100%", display: "block" }}
//         />

//         {/* canvas overlay positioned absolutely on top of video */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             pointerEvents: "none", // allow clicks to pass through
//           }}
//         />
//       </div>

//       {/* Emotion chip / text (keeps design similar to your previous UI) */}
//       {emotion && (
//         <div
//           style={{
//             marginTop: 12,
//             display: "inline-block",
//             padding: "8px 12px",
//             borderRadius: 20,
//             background: "linear-gradient(45deg, #00ccff, #ff6f61)",
//             color: "#fff",
//             fontWeight: 600,
//           }}
//         >
//           Detected Emotion: {emotion}
//         </div>
//       )}

//       <button
//         onClick={capture}
//         disabled={isCapturing}
//         style={{
//           ...buttonStyle,
//           opacity: isCapturing ? 0.7 : 1,
//           transform: isCapturing ? "scale(0.95)" : "scale(1)",
//         }}
//         onMouseEnter={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(-2px)";
//             e.target.style.boxShadow = "0 12px 30px rgba(102, 126, 234, 0.6)";
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isCapturing) {
//             e.target.style.transform = "translateY(0)";
//             e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
//           }
//         }}
//       >
//         <i className={`fas ${isCapturing ? "fa-spinner fa-spin" : "fa-camera"}`}></i>
//         {isCapturing ? "Capturing..." : "Capture Photo"}
//       </button>
//     </div>
//   );
// };

// export default WebcamCapture;





// /* --------------------------
//    WebcamPreview (keeps your preview UI; adds overlay drawing on captured image)
//    This is a named export you had originally; it uses face-api to draw box + expressions
//    on the captured image when 'Detect Emotion' is clicked.
//    -------------------------- */
// export const WebcamPreview = ({ image, onRetake }) => {
//   const [emotion, setEmotion] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const imgRef = useRef(null);
//   const canvasRefPreview = useRef(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = process.env.PUBLIC_URL + "/models";
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//         ]);
//       } catch (err) {
//         console.error("Preview: error loading face-api models:", err);
//       }
//     };
//     loadModels();
//   }, []);

//   const detectEmotion = async () => {
//     if (!imgRef.current || !canvasRefPreview.current) return;
//     setLoading(true);

//     try {
//       // ensure canvas matches image pixel size
//       canvasRefPreview.current.width = imgRef.current.naturalWidth;
//       canvasRefPreview.current.height = imgRef.current.naturalHeight;
//       canvasRefPreview.current.style.width = "100%";
//       canvasRefPreview.current.style.height = "auto";

//       const detections = await faceapi
//         .detectSingleFace(imgRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();

//       const ctx = canvasRefPreview.current.getContext("2d");
//       ctx.clearRect(0, 0, canvasRefPreview.current.width, canvasRefPreview.current.height);

//       if (detections) {
//         const displaySize = {
//           width: imgRef.current.naturalWidth,
//           height: imgRef.current.naturalHeight,
//         };
//         const resized = faceapi.resizeResults(detections, displaySize);

//         faceapi.draw.drawDetections(canvasRefPreview.current, resized);
//         faceapi.draw.drawFaceExpressions(canvasRefPreview.current, resized);

//         const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
//         setEmotion(sorted[0][0]);
//       } else {
//         setEmotion("No face detected");
//       }
//     } catch (err) {
//       console.error("Preview detection error:", err);
//       setEmotion("Error detecting");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!image) return null;

//   const previewContainer = {
//     textAlign: "center",
//     marginBottom: "32px",
//     padding: "24px",
//     background: "rgba(255, 255, 255, 0.05)",
//     borderRadius: "24px",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     maxWidth: "600px",
//     margin: "0 auto 32px auto",
//     position: "relative",
//   };

//   const imageStyle = {
//     maxWidth: "100%",
//     borderRadius: "16px",
//     marginBottom: "16px",
//     border: "2px solid rgba(102, 126, 234, 0.3)",
//     boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
//     display: "block",
//   };

//   return (
//     <div style={previewContainer}>
//       <img
//         ref={imgRef}
//         src={image}
//         alt="Captured preview"
//         style={imageStyle}
//         crossOrigin="anonymous"
//       />
//       {/* overlay canvas positioned over the image */}
//       <canvas
//         ref={canvasRefPreview}
//         style={{
//           position: "absolute",
//           top: 24, // matches padding in container
//           left: "50%",
//           transform: "translateX(-50%)",
//           maxWidth: "100%",
//           pointerEvents: "none",
//         }}
//       />
//       {emotion && (
//         <p style={{ color: "#fff", fontSize: "1.2rem", marginTop: "8px" }}>
//           {loading ? "Detecting..." : `Detected Emotion: ${emotion}`}
//         </p>
//       )}
//       <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12 }}>
//         <button
//           onClick={onRetake}
//           style={{
//             padding: "12px 24px",
//             borderRadius: "50px",
//             border: "none",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "#ffffff",
//             cursor: "pointer",
//             fontWeight: "600",
//           }}
//         >
//           🔄 Retake
//         </button>
//         <button
//           onClick={detectEmotion}
//           disabled={loading}
//           style={{
//             padding: "12px 24px",
//             borderRadius: "50px",
//             border: "none",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "#ffffff",
//             cursor: "pointer",
//             fontWeight: "600",
//           }}
//         >
//           😊 {loading ? "Detecting..." : "Detect Emotion"}
//         </button>
//       </div>
//     </div>
//   );
// };




































//updated 
// src/components/WebcamCapture.js
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

// default noop so missing prop won't crash
const noop = () => {};

/* --------------------------
   WebcamCapture (live face-api detection -> backend mapping)
   -------------------------- */
const WebcamCapture = ({ onCaptureDataUrl = noop, enabled = true }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [isCapturing, setIsCapturing] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [emotion, setEmotion] = useState("");

  // ✅ send detected emotion to backend for mapping
  const handleDetectedEmotion = async (topEmotion) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/song_from_emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion: topEmotion }),
    });
    const data = await response.json();
    console.log("Songs received (webcam flow):", data.songs);

    if (data.songs && data.songs.length > 0) {
      const firstSong = data.songs[0]; // or send whole array
      if (onCaptureDataUrl) {
        onCaptureDataUrl(null, topEmotion, firstSong);
      }
    }
  } catch (err) {
    console.error("Error fetching song:", err);
  }
};


  // Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading face-api models:", err);
      }
    };
    loadModels();
  }, []);

  // Detection loop
  // useEffect(() => {
  //   if (!modelsLoaded) return;

  //   const detectLoop = async () => {
  //     if (
  //       !webcamRef.current ||
  //       !webcamRef.current.video ||
  //       webcamRef.current.video.readyState !== 4 ||
  //       !canvasRef.current
  //     )
  //       return;

  //     const video = webcamRef.current.video;
  //     const canvas = canvasRef.current;
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.style.width = `${video.clientWidth}px`;
  //     canvas.style.height = `${video.clientHeight}px`;

  //     try {
  //       const detections = await faceapi
  //         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //         .withFaceLandmarks()
  //         .withFaceExpressions();

  //       const ctx = canvas.getContext("2d");
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);

  //       if (detections.length > 0) {
  //         const resized = faceapi.resizeResults(detections, {
  //           width: video.videoWidth,
  //           height: video.videoHeight,
  //         });

  //         faceapi.draw.drawDetections(canvas, resized);
  //         faceapi.draw.drawFaceExpressions(canvas, resized);

  //         const exprs = detections[0].expressions;
  //         const sorted = Object.entries(exprs).sort((a, b) => b[1] - a[1]);
  //         const [topEmotion, topConfidence] = sorted[0];

  //         if (topConfidence > 0.7 && topEmotion !== emotion) {
  //           setEmotion(topEmotion);
  //           handleDetectedEmotion(topEmotion);
  //         }
  //       } else {
  //         setEmotion("");
  //       }
  //     } catch (err) {
  //       console.error("Detection error:", err);
  //     }
  //   };

  //   intervalRef.current = setInterval(detectLoop, 1000);
  //   return () => clearInterval(intervalRef.current);
  // }, [modelsLoaded, emotion]);

//Updated Detection loop
// Run face-api sampling for 10s, then send final emotion once
useEffect(() => {
  if (!modelsLoaded) return;

  let samplingInterval = null;
  let samplingTimeout = null;
  const emotionScores = {};

  const sample = async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4 ||
      !canvasRef.current
    )
      return;

    try {
      const video = webcamRef.current.video;
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detections.length > 0) {
        const resized = faceapi.resizeResults(detections, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);

        const exprs = detections[0].expressions;
        const [topEmotion, topConfidence] = Object.entries(exprs).sort(
          (a, b) => b[1] - a[1]
        )[0];

        setEmotion(topEmotion); // update live UI
        if (!emotionScores[topEmotion]) emotionScores[topEmotion] = 0;
        emotionScores[topEmotion] += topConfidence;
      } else {
        setEmotion("");
      }
    } catch (err) {
      console.error("Sampling error:", err);
    }
  };

  // start sampling every 500ms
  samplingInterval = setInterval(sample, 500);
  sample();

  // after 10s → pick dominant emotion & call backend once
  samplingTimeout = setTimeout(async () => {
    clearInterval(samplingInterval);
    const entries = Object.entries(emotionScores);
    if (entries.length === 0) {
      console.log("No emotion detected in 10s window.");
      return;
    }
    const [finalEmotion] = entries.sort((a, b) => b[1] - a[1])[0];
    console.log("Final dominant emotion:", finalEmotion);

    try {
      const response = await fetch("http://127.0.0.1:5000/song_from_emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion: finalEmotion }),
      });
      const data = await response.json();
      console.log("Songs received after 10s:", data.songs);
      if (onCaptureDataUrl) {
        onCaptureDataUrl(null, finalEmotion, data.songs || []);
      }
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  }, 10000);

  return () => {
    clearInterval(samplingInterval);
    clearTimeout(samplingTimeout);
  };
}, [modelsLoaded]);


  // Capture screenshot with overlay
//   const capture = async () => {
//     if (!webcamRef.current) return;
//     setIsCapturing(true);

//     try {
//       const video = webcamRef.current.video;
//       const overlayCanvas = canvasRef.current;

//       const exportCanvas = document.createElement("canvas");
//       exportCanvas.width = video.videoWidth;
//       exportCanvas.height = video.videoHeight;
//       const ctx = exportCanvas.getContext("2d");

//       ctx.drawImage(video, 0, 0, exportCanvas.width, exportCanvas.height);
//       if (overlayCanvas) {
//         ctx.drawImage(overlayCanvas, 0, 0, exportCanvas.width, exportCanvas.height);
//       }

//       const dataUrl = exportCanvas.toDataURL("image/jpeg");
//       //onCaptureDataUrl(dataUrl, emotion);
//       // ✅ Always use the latest detected emotion (from realtime loop)
// if (emotion) {
//   await handleDetectedEmotion(emotion);   // send to backend for songs
// }
// onCaptureDataUrl(dataUrl, emotion);

//     } catch (err) {
//       console.error("Capture error:", err);
//     } finally {
//       setIsCapturing(false);
//     }
//   };

const capture = async () => {
  if (!webcamRef.current) return;
  setIsCapturing(true);

  try {
    const video = webcamRef.current.video;
    const overlayCanvas = canvasRef.current;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = video.videoWidth;
    exportCanvas.height = video.videoHeight;
    const ctx = exportCanvas.getContext("2d");

    ctx.drawImage(video, 0, 0, exportCanvas.width, exportCanvas.height);

    if (overlayCanvas) {
      ctx.drawImage(overlayCanvas, 0, 0, exportCanvas.width, exportCanvas.height);
    }

    const dataUrl = exportCanvas.toDataURL("image/jpeg");

    // ✅ Directly use face-api emotion
    if (emotion) {
      fetch("http://127.0.0.1:5000/song_from_emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Songs based on webcam emotion:", data);
          // bubble up if parent wants songs
          if (onCaptureDataUrl) {
            onCaptureDataUrl(dataUrl, emotion, data.songs);
          }
        })
        .catch(err => console.error("Error fetching songs:", err));
    } else {
      onCaptureDataUrl(dataUrl, null);
    }
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    setIsCapturing(false);
  }
};


  if (!enabled) return null;

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: "16px" }}>
        <h3 style={headingStyle}>📸 Live Camera Feed</h3>
        <p style={subTextStyle}>Position yourself in the frame and capture your emotion</p>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
          style={{ ...webcamStyle, width: "100%", display: "block" }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>

      {emotion && (
        <div style={emotionChipStyle}>Detected Emotion: {emotion}</div>
      )}

      <button onClick={capture} disabled={isCapturing} style={buttonStyle}>
        <i className={`fas ${isCapturing ? "fa-spinner fa-spin" : "fa-camera"}`}></i>
        {isCapturing ? "Capturing..." : "Capture Photo"}
      </button>
    </div>
  );
};

export default WebcamCapture;

/* --------------------------
   WebcamPreview (upload -> backend ML model -> mapping)
   -------------------------- */
export const WebcamPreview = ({ image, onRetake }) => {
  const [emotion, setEmotion] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectEmotion = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze_image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }), // base64
      });
      const data = await response.json();
      setEmotion(data.emotion);
      console.log("Song received (greyscale flow):", data.song);
    } catch (err) {
      console.error("Preview detection error:", err);
      setEmotion("Error detecting");
    } finally {
      setLoading(false);
    }
  };

  if (!image) return null;

  return (
    <div style={previewContainer}>
      <img src={image} alt="Captured preview" style={imageStyle} />
      {emotion && (
        <p style={{ color: "#fff", fontSize: "1.2rem", marginTop: "8px" }}>
          {loading ? "Detecting..." : `Detected Emotion: ${emotion}`}
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12 }}>
        <button onClick={onRetake} style={buttonSmallStyle}>🔄 Retake</button>
        <button onClick={detectEmotion} disabled={loading} style={buttonSmallStyle}>
          😊 {loading ? "Detecting..." : "Detect Emotion"}
        </button>
      </div>
    </div>
  );
};

/* --------------------------
   Styles
   -------------------------- */
const containerStyle = {
  textAlign: "center",
  marginBottom: "32px",
  padding: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  maxWidth: "600px",
  margin: "0 auto 32px auto",
};
const headingStyle = {
  color: "#f8fafc",
  marginBottom: "8px",
  fontSize: "1.25rem",
  fontWeight: "600",
};
const subTextStyle = { color: "#cbd5e1", margin: 0, fontSize: "0.95rem" };
const webcamStyle = {
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: "2px solid rgba(102, 126, 234, 0.3)",
};
const emotionChipStyle = {
  marginTop: 12,
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 20,
  background: "linear-gradient(45deg, #00ccff, #ff6f61)",
  color: "#fff",
  fontWeight: 600,
};
const buttonStyle = {
  padding: "14px 28px",
  borderRadius: "50px",
  border: "none",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  marginTop: "16px",
};
const previewContainer = {
  textAlign: "center",
  marginBottom: "32px",
  padding: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  maxWidth: "600px",
  margin: "0 auto 32px auto",
};
const imageStyle = {
  maxWidth: "100%",
  borderRadius: "16px",
  marginBottom: "16px",
  border: "2px solid rgba(102, 126, 234, 0.3)",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  display: "block",
};
const buttonSmallStyle = {
  padding: "12px 24px",
  borderRadius: "50px",
  border: "none",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};
