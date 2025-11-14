// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function ChatJournal() {
// //   const navigate = useNavigate();
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [journalEntries, setJournalEntries] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const username = "guest";

// //   // Fetch journal entries
// //   const fetchJournals = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/get_journal_entries?username=${username}`);
// //       const data = await res.json();
// //       if (data.entries) setJournalEntries(data.entries);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJournals();
// //   }, []);

// //   // Chat send
// //   const handleSend = async () => {
// //     if (!input.trim()) return;
// //     const userMessage = { sender: "user", text: input };
// //     setMessages([...messages, userMessage]);
// //     setInput("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/chat", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ message: input, emotion: "neutral" }),
// //       });
// //       const data = await res.json();
// //       const botMessage = { sender: "bot", text: data.reply || "No response" };
// //       setMessages((prev) => [...prev, botMessage]);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Save entire chat as one journal with title
// //   const handleSaveJournal = async () => {
// //     if (messages.length === 0) return;

// //     const title = prompt("Enter a title for your journal:");
// //     if (!title) return alert("Journal title is required!");

// //     const chatText = messages
// //       .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
// //       .join("\n");

// //     try {
// //       await fetch("http://localhost:5000/save_journal", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           entry: chatText,
// //           title,
// //           emotion: "neutral",
// //           username,
// //         }),
// //       });
// //       alert("Chat saved as journal!");
// //       setMessages([]); // clear chat for fresh session
// //       fetchJournals(); // refresh journal list
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Delete journal
// //   const handleDelete = async (id) => {
// //     if (!id) return console.error("Journal ID is missing!");
// //     try {
// //       await fetch(`http://localhost:5000/delete_journal/${id}`, { method: "DELETE" });
// //       fetchJournals();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Search journals by title
// //   const handleSearch = async () => {
// //     if (!searchQuery.trim()) {
// //       fetchJournals();
// //       return;
// //     }
// //     try {
// //       const res = await fetch("http://localhost:5000/search_journal", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ query: searchQuery, username }),
// //       });
// //       const data = await res.json();
// //       if (data.entries) setJournalEntries(data.entries);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //    <>
   
// //       <nav className="navbar">
// //         <div className="nav-container">
// //           <div className="logo" onClick={() => navigate("/")}>
// //             <i className="fas fa-music"></i>
// //             <span>Moodify</span>
// //           </div>
// //           <div className="nav-links">
// //             <button className="nav-link" onClick={() => navigate("/home")}>Home</button>
// //             <button className="nav-link" onClick={() => navigate("/detection")}>Detect Emotion</button>
// //             <button className="nav-link" onClick={() => navigate("/mood_companion")}>Mood Companion</button>
// //           </div>
// //         </div>
// //       </nav>
// //  <div style={styles.container}>
// //       <div style={styles.chatBox}>
// //         <h2>Chatbot</h2>
// //         <div style={styles.messages}>
// //           {messages.map((msg, i) => (
// //             <div
// //               key={i}
// //               style={{
// //                 ...styles.message,
// //                 alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
// //                 background: msg.sender === "user" ? "#007bff" : "#2c2c2c",
// //                 color: "#fff",
// //               }}
// //             >
// //               {msg.text}
// //             </div>
// //           ))}
// //           {loading && <p>Thinking...</p>}
// //         </div>
// //         <div style={styles.inputRow}>
// //           <input
// //             style={styles.input}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             placeholder="Type a message..."
// //           />
// //           <button style={styles.button} onClick={handleSend}>Send</button>
// //           <button style={styles.buttonAlt} onClick={handleSaveJournal}>Save Journal</button>
// //         </div>
// //       </div>

// //       {/* Journal Section */}
// //       <div style={styles.journalBox}>
// //         <h2>Saved Journals</h2>
// //         <div style={styles.searchRow}>
// //           <input
// //             style={styles.input}
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             placeholder="Search journal by title..."
// //           />
// //           <button style={styles.buttonAlt} onClick={handleSearch}>Search</button>
// //         </div>
// //         <div style={styles.entries}>
// //           {journalEntries.length === 0 && <p style={{ color: "#555" }}>No journal entries</p>}
// //           {journalEntries.map((entry, i) => (
// //             <div key={i} style={styles.entry}>
// //               <p>
// //                 <b>{entry.title}</b>{" "}
// //                 <span style={{ fontSize: "0.8em", color: "#666" }}>({entry.date})</span>
// //               </p>
// //               <pre style={{ color: "#fff" }}>{entry.text}</pre>
// //               <button style={styles.deleteButton} onClick={() => handleDelete(entry.id)}>Delete</button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //      </>
// //   );
// // }

// // // Styles

// // const styles = {
// //    navbar: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
   
// //     background: "#1e1e1e",
// //     borderBottom: "1px solid #333",
// //     marginBottom: "20px",
// //   },
  
// //   logo: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "10px",
// //     fontSize: "1.5rem",
// //     fontWeight: "bold",
// //     color: "#00f2fe",
// //     cursor: "pointer",
// //   },
// //   links: {
// //     display: "flex",
// //     gap: "15px",
// //   },
// //   link: {
// //     background: "none",
// //     border: "none",
// //     color: "#fff",
// //     fontSize: "1rem",
// //     cursor: "pointer",
// //     padding: "5px 10px",
// //     borderRadius: "5px",
// //     transition: "0.3s",
// //   },
// //   container: {
// //     display: "flex",
// //     gap: "20px",
// //     padding: "20px",
// //     fontFamily: "Arial, sans-serif",
// //     background: "#121212",
// //     color: "#fff",
// //     height: "80vh",
// //     boxSizing: "border-box",
// //   },
// //   chatBox: {
// //     flex: 1,
// //     border: "1px solid #333",
// //     borderRadius: "10px",
// //     padding: "15px",
// //     display: "flex",
// //     flexDirection: "column",
// //     background: "#1e1e1e",
// //     height: "100%",
// //   },
// //   journalBox: {
// //     flex: 1,
// //     border: "1px solid #333",
// //     borderRadius: "10px",
// //     padding: "15px",
// //     display: "flex",
// //     flexDirection: "column",
// //     background: "#1e1e1e",
// //     height: "100%",
// //   },
// //   messages: {
// //     flex: 1,
// //     overflowY: "auto",
// //     marginBottom: "10px",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "8px",
// //   },
// //   message: {
// //     padding: "10px",
// //     borderRadius: "8px",
// //     maxWidth: "70%",
// //   },
// //   inputRow: { display: "flex", gap: "10px" },
// //   input: {
// //     flex: 1,
// //     padding: "10px",
// //     borderRadius: "8px",
// //     border: "1px solid #333",
// //     background: "#2c2c2c",
// //     color: "#fff",
// //   },
// //   button: {
// //     padding: "10px 15px",
// //     background: "#00f2fe",
// //     color: "#000",
// //     border: "none",
// //     borderRadius: "8px",
// //     cursor: "pointer",
// //   },
// //   buttonAlt: {
// //     padding: "10px 15px",
// //     background: "#6c757d",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "8px",
// //     cursor: "pointer",
// //   },
// //   searchRow: { display: "flex", gap: "10px", marginBottom: "10px" },
// //   entries: {
// //     flex: 1,
// //     overflowY: "auto",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "12px",
// //   },
// //   entry: {
// //     padding: "10px",
// //     border: "1px solid #333",
// //     borderRadius: "8px",
// //     background: "#2c2c2c",
// //     color: "#4facfe",
// //   },
// //   deleteButton: {
// //     marginTop: "5px",
// //     padding: "5px 10px",
// //     background: "#dc3545",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //   },
// // };













































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AICompanion from "./AICompanion";
// import { ParticleSystem } from "./FloatingElements";
// // import "./ChatJournal.css"; // Assuming this file still exists for general styling

// // Define styles using a function that accepts darkMode state to return dynamic colors
// const getStyles = (darkMode) => ({
//   // --- Dynamic Colors ---
//   color: {
//     textPrimary: darkMode ? "#fff" : "#1e293b",
//     textSecondary: darkMode ? "#4facfe" : "#4f46e5",
//     background: darkMode ? "#121212" : "#f0f4f8",
//     cardBackground: darkMode ? "#1e1e1e" : "#fff",
//     cardBorder: darkMode ? "#333" : "#e2e8f0",
//     inputBackground: darkMode ? "#2c2c2c" : "#f8fafc",
//     inputBorder: darkMode ? "#333" : "#cbd5e1",
//     messageBot: darkMode ? "#2c2c2c" : "#e2e8f0",
//     messageUser: "#007bff", // User message color is often kept distinct/primary
//     thinking: darkMode ? "#94a3b8" : "#64748b",
//     noEntries: darkMode ? "#555" : "#94a3b8",
//     deleteButton: "#dc3545",
//     saveButton: darkMode ? "#6c757d" : "#94a3b8",
//     sendButton: "#00f2fe",
//   },

//   // --- Layout Styles (Structural - kept minimal changes) ---
//   container: {
//     display: "flex",
//     gap: "20px",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     background: darkMode ? "#121212" : "#f0f4f8", // Use dynamic background
//     color: darkMode ? "#fff" : "#1e293b",         // Use dynamic text color
//     height: "80vh",
//     boxSizing: "border-box",
//   },
//   chatBox: {
//     flex: 1,
//     border: `1px solid ${darkMode ? "#333" : "#e2e8f0"}`,
//     borderRadius: "10px",
//     padding: "15px",
//     display: "flex",
//     flexDirection: "column",
//     background: darkMode ? "#1e1e1e" : "#fff", // Use dynamic card background
//     height: "100%",
//   },
//   journalBox: {
//     flex: 1,
//     border: `1px solid ${darkMode ? "#333" : "#e2e8f0"}`,
//     borderRadius: "10px",
//     padding: "15px",
//     display: "flex",
//     flexDirection: "column",
//     background: darkMode ? "#1e1e1e" : "#fff", // Use dynamic card background
//     height: "100%",
//   },

//   // --- Element Styles ---
//   h2: {
//     fontSize: "1.5rem",
//     marginBottom: "15px",
//     // Keep gradient for visibility
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text",
//   },
//   messages: {
//     flex: 1,
//     overflowY: "auto",
//     marginBottom: "10px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//   },
//   message: {
//     padding: "10px",
//     borderRadius: "8px",
//     maxWidth: "70%",
//     color: "#fff", // Default message text is white for contrast
//   },
//   inputRow: { display: "flex", gap: "10px" },
//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "8px",
//     border: `1px solid ${darkMode ? "#333" : "#cbd5e1"}`,
//     background: darkMode ? "#2c2c2c" : "#f8fafc",
//     color: darkMode ? "#fff" : "#1e293b",
//   },
//   button: {
//     padding: "10px 15px",
//     background: "#00f2fe",
//     color: "#000",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   buttonAlt: {
//     padding: "10px 15px",
//     background: darkMode ? "#6c757d" : "#e2e8f0", // Light gray for light mode
//     color: darkMode ? "#fff" : "#1e293b", // Dark text for light mode
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   searchRow: { display: "flex", gap: "10px", marginBottom: "10px" },
//   entries: {
//     flex: 1,
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   entry: {
//     padding: "10px",
//     border: `1px solid ${darkMode ? "#333" : "#cbd5e1"}`,
//     borderRadius: "8px",
//     background: darkMode ? "#2c2c2c" : "#f8fafc", // Light background for entry card
//     color: darkMode ? "#4facfe" : "#4f46e5", // Accent color for entry title
//   },
//   entryText: {
//     color: darkMode ? "#fff" : "#1e293b", // Dynamic color for pre text
//   },
//   deleteButton: {
//     marginTop: "5px",
//     padding: "5px 10px",
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// });

// export default function ChatJournal({ darkMode }) {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [journalEntries, setJournalEntries] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const username = "guest";
//   const [currentMood] = useState("neutral");

//   // Get dynamic styles based on theme
//   const styles = getStyles(darkMode);

//   const handleCompanionAction = (action) => {
//     if (action === 'music') {
//       navigate("/detection");
//     }
//   };

//   // Fetch journal entries
//   const fetchJournals = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/get_journal_entries?username=${username}`);
//       const data = await res.json();
//       if (data.entries) setJournalEntries(data.entries);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchJournals();
//   }, []);

//   // Chat send
//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input, emotion: "neutral" }),
//       });
//       const data = await res.json();
//       const botMessage = { sender: "bot", text: data.reply || "No response" };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save entire chat as one journal with title
//   const handleSaveJournal = async () => {
//     if (messages.length === 0) return;

//     // IMPORTANT: Replacing browser prompt/alert with safer methods (though this component uses external server communication which I cannot test)
//     // For this example, I'll keep the prompt/alert since I cannot introduce new UI components here.
//     const title = prompt("Enter a title for your journal:"); 
//     if (!title) return alert("Journal title is required!");

//     const chatText = messages
//       .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
//       .join("\n");

//     try {
//       await fetch("http://localhost:5000/save_journal", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           entry: chatText,
//           title,
//           emotion: "neutral",
//           username,
//         }),
//       });
//       alert("Chat saved as journal!");
//       setMessages([]);
//       fetchJournals();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete journal
//   const handleDelete = async (id) => {
//     if (!id) return console.error("Journal ID is missing!");
//     try {
//       await fetch(`http://localhost:5000/delete_journal/${id}`, { method: "DELETE" });
//       fetchJournals();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Search journals by title
//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       fetchJournals();
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/search_journal", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: searchQuery, username }),
//       });
//       const data = await res.json();
//       if (data.entries) setJournalEntries(data.entries);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       {/* ParticleSystem's theme depends on the darkMode prop */}
//       <ParticleSystem theme={darkMode ? "dark" : "light"} intensity="low" />
    
//       <div style={styles.container}>
//         <div style={styles.chatBox}>
//           <h2 style={styles.h2}>Chatbot</h2>
//           <div style={styles.messages}>
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 style={{
//                   ...styles.message,
//                   alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//                   background: msg.sender === "user" ? styles.color.messageUser : styles.color.messageBot,
//                   color: msg.sender === "user" ? "#fff" : styles.color.textPrimary, // Bot message text color depends on theme
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && <p style={{ color: styles.color.thinking }}>Thinking...</p>}
//           </div>
//           <div style={styles.inputRow}>
//             <input
//               style={styles.input}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button style={{ ...styles.button, background: styles.color.sendButton, color: "#000" }} onClick={handleSend}>Send</button>
//             <button style={{ ...styles.buttonAlt, background: styles.color.saveButton, color: styles.color.textPrimary }} onClick={handleSaveJournal}>Save Journal</button>
//           </div>
//         </div>

//         {/* Journal Section */}
//         <div style={styles.journalBox}>
//           <h2 style={styles.h2}>Saved Journals</h2>
//           <div style={styles.searchRow}>
//             <input
//               style={styles.input}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search journal by title..."
//             />
//             <button style={{ ...styles.buttonAlt, background: styles.color.saveButton, color: styles.color.textPrimary }} onClick={handleSearch}>Search</button>
//           </div>
//           <div style={styles.entries}>
//             {journalEntries.length === 0 && <p style={{ color: styles.color.noEntries }}>No journal entries</p>}
//             {journalEntries.map((entry, i) => (
//               <div key={i} style={styles.entry}>
//                 <p>
//                   <b style={{ color: styles.color.textSecondary }}>{entry.title}</b>{" "}
//                   <span style={{ fontSize: "0.8em", color: styles.color.noEntries }}>({entry.date})</span>
//                 </p>
//                 <pre style={styles.entryText}>{entry.text}</pre>
//                 <button style={styles.deleteButton} onClick={() => handleDelete(entry.id)}>Delete</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <AICompanion 
//         currentEmotion={currentMood}
//         isDetecting={loading}
//         onSuggestAction={handleCompanionAction}
//         darkMode={darkMode}
//       />
//     </>
//   );
// }





















































import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AICompanion from "./AICompanion";
import { ParticleSystem } from "./FloatingElements";
// import "./ChatJournal.css"; // Assuming this file still exists for general styling

// Define styles using a function that accepts darkMode state to return dynamic colors
const getStyles = (darkMode) => ({
  // --- Dynamic Colors ---
  color: {
    textPrimary: darkMode ? "#fff" : "#1e293b",
    textSecondary: darkMode ? "#4facfe" : "#4f46e5",
    background: darkMode ? "#121212" : "#f0f4f8",
    cardBackground: darkMode ? "#1e1e1e" : "#fff",
    cardBorder: darkMode ? "#333" : "#e2e8f0",
    inputBackground: darkMode ? "#2c2c2c" : "#f8fafc",
    inputBorder: darkMode ? "#333" : "#cbd5e1",
    messageBot: darkMode ? "#2c2c2c" : "#e2e8f0",
    messageUser: "#007bff", // User message color is often kept distinct/primary
    thinking: darkMode ? "#94a3b8" : "#64748b",
    noEntries: darkMode ? "#555" : "#94a3b8",
    deleteButton: "#dc3545",
    saveButton: darkMode ? "#6c757d" : "#94a3b8",
    sendButton: "#00f2fe",
  },

  // --- Layout Styles (Structural - kept minimal changes) ---
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: darkMode ? "#121212" : "#f0f4f8", // Use dynamic background
    color: darkMode ? "#fff" : "#1e293b",         // Use dynamic text color
    height: "80vh",
    boxSizing: "border-box",
  },
  chatBox: {
    flex: 1,
    border: `1px solid ${darkMode ? "#333" : "#e2e8f0"}`,
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    background: darkMode ? "#1e1e1e" : "#fff", // Use dynamic card background
    height: "100%",
  },
  journalBox: {
    flex: 1,
    border: `1px solid ${darkMode ? "#333" : "#e2e8f0"}`,
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    background: darkMode ? "#1e1e1e" : "#fff", // Use dynamic card background
    height: "100%",
  },

  // --- Element Styles ---
  h2: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    // Keep gradient for visibility
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "70%",
    color: "#fff", // Default message text is white for contrast
  },
  inputRow: { display: "flex", gap: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${darkMode ? "#333" : "#cbd5e1"}`,
    background: darkMode ? "#2c2c2c" : "#f8fafc",
    color: darkMode ? "#fff" : "#1e293b",
  },
  button: {
    padding: "10px 15px",
    background: "#00f2fe",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonAlt: {
    padding: "10px 15px",
    background: darkMode ? "#6c757d" : "#e2e8f0", // Light gray for light mode
    color: darkMode ? "#fff" : "#1e293b", // Dark text for light mode
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  searchRow: { display: "flex", gap: "10px", marginBottom: "10px" },
  entries: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  entry: {
    padding: "10px",
    border: `1px solid ${darkMode ? "#333" : "#cbd5e1"}`,
    borderRadius: "8px",
    background: darkMode ? "#2c2c2c" : "#f8fafc", // Light background for entry card
    color: darkMode ? "#4facfe" : "#4f46e5", // Accent color for entry title
  },
  entryText: {
    color: darkMode ? "#fff" : "#1e293b", // Dynamic color for pre text
  },
  deleteButton: {
    marginTop: "5px",
    padding: "5px 10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
});

export default function ChatJournal({ darkMode }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const username = "guest";
  const [currentMood] = useState("neutral");

  // Get dynamic styles based on theme
  const styles = getStyles(darkMode);

  const handleCompanionAction = (action) => {
    if (action === 'music') {
      navigate("/detection");
    }
  };

  // Fetch journal entries
  const fetchJournals = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get_journal_entries?username=${username}`);
      const data = await res.json();
      if (data.entries) setJournalEntries(data.entries);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // Chat send
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, emotion: "neutral" }),
      });
      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save entire chat as one journal with title
  const handleSaveJournal = async () => {
    if (messages.length === 0) return;

    // IMPORTANT: Replacing browser prompt/alert with safer methods (though this component uses external server communication which I cannot test)
    // For this example, I'll keep the prompt/alert since I cannot introduce new UI components here.
    const title = prompt("Enter a title for your journal:"); 
    if (!title) return alert("Journal title is required!");

    const chatText = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
      .join("\n");

    try {
      await fetch("http://localhost:5000/save_journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entry: chatText,
          title,
          emotion: "neutral",
          username,
        }),
      });
      alert("Chat saved as journal!");
      setMessages([]);
      fetchJournals();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete journal
  const handleDelete = async (id) => {
    if (!id) return console.error("Journal ID is missing!");
    try {
      await fetch(`http://localhost:5000/delete_journal/${id}`, { method: "DELETE" });
      fetchJournals();
    } catch (err) {
      console.error(err);
    }
  };

  // Search journals by title
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchJournals();
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/search_journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, username }),
      });
      const data = await res.json();
      if (data.entries) setJournalEntries(data.entries);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ParticleSystem's theme depends on the darkMode prop */}
      <ParticleSystem theme={darkMode ? "dark" : "light"} intensity="low" />
    
      <div style={styles.container}>
        <div style={styles.chatBox}>
          <h2 style={styles.h2}>Chatbot</h2>
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? styles.color.messageUser : styles.color.messageBot,
                  color: msg.sender === "user" ? "#fff" : styles.color.textPrimary, // Bot message text color depends on theme
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p style={{ color: styles.color.thinking }}>Thinking...</p>}
          </div>
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button style={{ ...styles.button, background: styles.color.sendButton, color: "#000" }} onClick={handleSend}>Send</button>
            <button style={{ ...styles.buttonAlt, background: styles.color.saveButton, color: styles.color.textPrimary }} onClick={handleSaveJournal}>Save In Journal</button>
          </div>
        </div>

        {/* Journal Section */}
        <div style={styles.journalBox}>
          <h2 style={styles.h2}>Saved Journals</h2>
          <div style={styles.searchRow}>
            <input
              style={styles.input}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journal by title..."
            />
            <button style={{ ...styles.buttonAlt, background: styles.color.saveButton, color: styles.color.textPrimary }} onClick={handleSearch}>Search</button>
          </div>
          <div style={styles.entries}>
            {journalEntries.length === 0 && <p style={{ color: styles.color.noEntries }}>No journal entries</p>}
            {journalEntries.map((entry, i) => (
              <div key={i} style={styles.entry}>
                <p>
                  <b style={{ color: styles.color.textSecondary }}>{entry.title}</b>{" "}
                  <span style={{ fontSize: "0.8em", color: styles.color.noEntries }}>({entry.date})</span>
                </p>
                <pre style={styles.entryText}>{entry.text}</pre>
                <button style={styles.deleteButton} onClick={() => handleDelete(entry.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AICompanion 
        currentEmotion={currentMood}
        isDetecting={loading}
        onSuggestAction={handleCompanionAction}
        darkMode={darkMode}
      />
    </>
  );
}