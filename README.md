**🎵 Development of an AI-Based Emotion-Aware Music Recommender System**

<img width="1207" height="3840" alt="Infosys Project Flow Chart Diagram" src="https://github.com/user-attachments/assets/d02737da-0619-4580-a854-db96f5a8252c" />


**FLOW CHART STRUCTURE:**
flowchart TD
    A[User Webcam Input] --> B[Face Detection & Preprocessing]
    B --> C[Emotion Recognition Model CNN]
    C --> D[Emotion Classification]
    D --> E[Emotion-to-Genre Mapping]
    E --> F[Spotify API Integration]
    F --> G[Personalized Playlist Display]
    G --> H[User Music Playback]





**📌 Overview**

The AI-Based Emotion-Aware Music Recommender System is an intelligent application that detects the user’s emotional state from facial expressions in real time and recommends personalized music that matches the detected mood.

This system integrates Machine Learning, Full-Stack Web Development, and Spotify API to deliver a seamless, emotionally adaptive music experience.

**🎯 Objectives**

Detect human emotions in real-time via webcam.

Map emotions to relevant music genres.

Fetch & play songs from Spotify API (or other sources).

Provide a full-stack application with frontend (React), backend (Node.js/Express), and ML integration (Keras/TensorFlow, face-api.js).

Deliver a scalable and user-friendly solution as part of the internship final project.

**⚙️ Tech Stack**

**Frontend**

React.js

Material-UI (UI components & styling)

Responsive design

**Backend**

pyton 

Node.js + Express

Flask (for ML service integration)

Authentication planned (JWT/Session)

**Machine Learning**

TensorFlow / Keras models (.h5)

Face-api.js (pretrained models for face & emotion detection)

Python (emotion classification scripts)

**Integrations**

Spotify API (music recommendations & streaming)

**Tools**

Git, GitHub, Git LFS (for large files)

Postman for API and Backend Testing

**🚀 Features**

✔️ Real-time emotion detection via webcam
✔️ Maps emotion → music genre
✔️ Fetches & plays songs using Spotify API
✔️ Login / Sign-up flow (future enhancement)
✔️ CRUD APIs for user & metadata management
✔️ Responsive & intuitive UI (works on mobile & desktop)
✔️ Proper code structure following SOLID principles
✔️ Test cases for backend & frontend

**📂 Project Structure**
Development-of-an-AI-Based-Emotion-Aware-Music-Recommender-System/
│
├── milestone1/              # Initial setup
├── milestone2/              # ML + backend integration
├── milestone3/              # Face API models + LFS handling
├── milestone4/              # Final integrated system
│   └── moodify/             # Final project folder
│       ├── frontend/        # React.js frontend
│       ├── backend/         # Node.js/Express backend
│       ├── ml/              # ML models (.h5, Python scripts)
│       ├── public/models/   # face-api.js pretrained models
│       ├── .env             # Environment variables (ignored in git)
│       └── package.json
│
├── README.md                # Documentation
└── LICENSE

**🏗️ System Architecture**

Frontend (React) ↔ Backend (Node.js/Express + Flask ML service) ↔ Database (MySQL/MSSQL) ↔ Spotify API

User opens app → camera captures face

ML model (face-api.js / Keras) detects emotion

Backend maps emotion → music genre

Spotify API fetches recommended songs

Music player integrated into UI

**⚡ Setup & Installation**
**🔹 Prerequisites**

Node.js v16+

Python 3.8+

Git LFS installed

Spotify Developer API key

MySQL/MSSQL (if database features required)

**🔹 Clone Repository**
git clone https://github.com/Springboard-Internship-2025/Development-of-an-AI-Based-Emotion-Aware-Music-Recommender-System_August_2025.git
cd Development-of-an-AI-Based-Emotion-Aware-Music-Recommender-System_August_2025/milestone4/moodify

🔹 Install Dependencies

**Frontend**

cd frontend
npm install
npm start


**Backend**

cd backend
pip install -r requirements.txt
python app.py


**ML Models**

cd ml
python emotion_model.py

**🛠️ Challenges & Solutions**

Large model files → Solved using Git LFS

Multiple team branches (22+) → Coordinated using GitHub workflow

Node modules bloating repo → Excluded with .gitignore

Testing → Implemented NUnit, Moq (backend), Jest (frontend)

Hosting → Learned & deployed on IIS

**📚 Learnings**

Hands-on with React + Node.js + ML integration

Git collaboration in large teams

Handling large datasets & models with Git LFS

Applied SOLID principles in real project

Explored authentication, microservices, database relationships

Improved communication & presentation skills through internship sessions

**📸 Screenshots**

<img width="1825" height="908" alt="Screenshot 2025-09-29 172746" src="https://github.com/user-attachments/assets/4d1fdbcb-7ea8-48d9-ba30-21ef006b6bbf" />

<img width="1833" height="874" alt="Screenshot 2025-09-29 172835" src="https://github.com/user-attachments/assets/36a20303-6de2-4eda-a89f-7bfb09795882" />

<img width="1855" height="870" alt="Screenshot 2025-09-29 172933" src="https://github.com/user-attachments/assets/6361ecc4-c3f9-4d20-a15c-296717f9724a" />

<img width="1804" height="891" alt="Screenshot 2025-09-29 173023" src="https://github.com/user-attachments/assets/c3fcb78a-a49d-4657-b6e4-6b3d445f6f55" />

<img width="1764" height="916" alt="Screenshot 2025-09-29 173128" src="https://github.com/user-attachments/assets/5b09187a-bd7f-43cf-b732-e950fb03498f" />

<img width="1765" height="886" alt="Screenshot 2025-09-29 173238" src="https://github.com/user-attachments/assets/658b2302-a288-42a8-bef7-05b569e2696e" />

<img width="1783" height="909" alt="Screenshot 2025-09-29 173355" src="https://github.com/user-attachments/assets/add13cc1-b735-4953-b039-91bc5e263e31" />

<img width="1859" height="874" alt="Screenshot 2025-09-29 173527" src="https://github.com/user-attachments/assets/6e88456e-f38c-4616-9442-09a3192bca6c" />

<img width="1870" height="848" alt="Screenshot 2025-09-29 195931" src="https://github.com/user-attachments/assets/24a5b7ad-1491-4259-877e-664bb2ca948a" />


**🤝 Contributors**
👨‍💻 [**BATTULA RAM KUMAR**] – **Project Developer**
    **Developer LinkedIn:** www.linkedin.com/in/ram-kumar-battula-b7305629a 
    **Developer Github:** https://github.com/ramkumarbattula1545
👨‍🏫 **REVATHI VENUGARI, PRADYUMNA V – Mentor & Guide**
