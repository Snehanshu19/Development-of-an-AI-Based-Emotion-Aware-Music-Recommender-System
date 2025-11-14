# # backend/app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import cv2
# import os
# from tensorflow.keras.models import load_model
# import spotipy
# from spotipy.oauth2 import SpotifyClientCredentials
# import uuid
# from datetime import datetime
# from dotenv import load_dotenv
# from openai import OpenAI
# from langchain_pinecone import PineconeVectorStore
# from langchain_openai import OpenAIEmbeddings

# # ------------------- Load environment variables -------------------
# load_dotenv()
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# # ------------------- OpenAI Setup -------------------
# try:
#     openai_client = OpenAI(api_key=OPENAI_API_KEY)
#     print("✅ OpenAI client initialized")
# except Exception as e:
#     print(f"❌ OpenAI error: {e}")
#     openai_client = None

# # ------------------- Pinecone Setup -------------------
# embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)
# journal_index_name = "moodtunes-journal"

# try:
#     journal_store = PineconeVectorStore.from_existing_index(index_name=journal_index_name, embedding=embeddings)
#     print("✅ Pinecone VectorStore connected")
# except Exception as e:
#     print(f"❌ Pinecone VectorStore error: {e}")
#     journal_store = None

# # ------------------- Fallback in-memory storage -------------------
# journal_store_data = []

# # ------------------- Flask App Setup -------------------
# app = Flask(__name__)
# CORS(app)

# # ------------------- Model Setup -------------------
# # MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models", "ResNet50V2_Model_Checkpoint.keras"))
# # model = load_model(MODEL_PATH, compile=False)
# # class_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]


# # ------------------- Model Setup -------------------
# from tensorflow.keras.applications import ResNet50V2
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Flatten, Dense

# MODEL_PATH = os.path.abspath(os.path.join(
#     os.path.dirname(__file__), "..", "models", "ResNet50V2_Model_Checkpoint.keras"
# ))

# class_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]
# #class_labels = ["surprise", "fear", "angry", "neutral", "sad", "disgust", "happy"]
# model = None
# try:
#     # Try safe mode load first
#     model = load_model(MODEL_PATH, compile=False, safe_mode=False)
#     print("✅ Model loaded successfully with safe_mode=False")
# except Exception as e:
#     print(f"⚠️ Error loading model with safe_mode=False: {e}")
#     print("➡️ Rebuilding architecture and loading weights instead...")
#     try:
#         base_model = ResNet50V2(weights=None, include_top=False, input_shape=(224, 224, 3))
#         model = Sequential([
#             base_model,
#             Flatten(),
#             Dense(128, activation='relu'),
#             Dense(len(class_labels), activation='softmax')
#         ])
#         model.load_weights(MODEL_PATH)
#         print("✅ Model weights loaded into rebuilt architecture")
#     except Exception as inner_e:
#         print(f"❌ Failed to rebuild and load model: {inner_e}")

# # ------------------- Spotify Setup -------------------
# CLIENT_ID = "3fb14b9181c64aa7920dff7a3347754d"
# CLIENT_SECRET = "d81284bfe7744907986e8c6da80d26d4"

# def get_spotify_client():
#     return spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))

# emotion_to_genre = {
#     "happy": "pop",
#     "sad": "acoustic",
#     "angry": "rock",
#     "surprise": "dance",
#     "fear": "ambient",
#     "disgust": "metal",
#     "neutral": "chill"
# }

# # ------------------- Journal Functions -------------------
# def save_journal_entry(entry_text, emotion, username="guest", title="Untitled"):
#     entry_id = f"{username}-{uuid.uuid4()}"
#     metadata = {
#         "username": username,
#         "emotion": emotion,
#         "title": title,
#         "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
#     }
#     if journal_store:
#         journal_store.add_texts(texts=[entry_text], metadatas=[metadata], ids=[entry_id])
#     journal_store_data.append({
#         "id": entry_id,
#         "text": entry_text,
#         "title": title,
#         "emotion": emotion,
#         "date": metadata["date"],
#         "username": username
#     })
#     return entry_id

# def search_journal_entries(query, username="guest", top_k=5):
#     results = []
#     if journal_store:
#         results = journal_store.similarity_search(query=query, k=top_k, filter={"username": username})
#         return [
#             {
#                 "id": doc.metadata.get("id", ""),
#                 "text": doc.page_content,
#                 "emotion": doc.metadata.get("emotion", ""),
#                 "date": doc.metadata.get("date", "")
#             } for doc in results
#         ]
#     # fallback in-memory search
#     return [
#         e for e in journal_store_data
#         if e["username"] == username and query.lower() in e["text"].lower()
#     ][:top_k]

# # ------------------- Endpoints -------------------

# @app.route("/detect-emotion", methods=["POST"])
# def detect_emotion():
#     try:
#         file = request.files.get("file")
#         if not file:
#             return jsonify({"error": "No file provided"}), 400
#         np_array = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
#         img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         img_resized = cv2.resize(img_rgb, (224, 224)).astype("float32") / 255.0
#         img_resized = np.expand_dims(img_resized, axis=0)
#         preds = model.predict(img_resized)
#         idx = int(np.argmax(preds))
#         emotion = class_labels[idx]
#         confidence = float(np.max(preds))
#         return jsonify({"emotion": emotion, "confidence": confidence})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/recommendations", methods=["POST"])
# def recommendations():
#     try:
#         data = request.get_json()
#         if not data or "emotion" not in data:
#             return jsonify({"error": "Emotion not provided"}), 400
#         emotion = data["emotion"]
#         num_songs = int(data.get("num_songs", 20))
#         sp = get_spotify_client()
#         genre = emotion_to_genre.get(emotion.lower(), "pop")
#         languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Marathi", "Bengali", "Punjabi", "Gujarati"]
#         songs = []
#         for lang in languages:
#             query = f"{genre} {lang} mood"
#             results = sp.search(q=query, type="track", limit=num_songs)
#             for item in results["tracks"]["items"]:
#                 songs.append({
#                     "name": item["name"],
#                     "artist": item["artists"][0]["name"],
#                     "language": lang,
#                     "spotify_url": item["external_urls"]["spotify"],
#                     "spotify_uri": item["uri"],
#                     "preview_url": item.get("preview_url")
#                 })
#         return jsonify({"emotion": emotion, "songs": songs})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/chat', methods=['POST'])
# def chat():
#     if not openai_client:
#         return jsonify({"error": "OpenAI not configured"}), 500
#     try:
#         data = request.get_json()
#         user_message = data.get("message")
#         current_user_emotion = data.get("emotion", "neutral")
#         context = ""
#         relevant_entries = search_journal_entries(user_message) if journal_store else []
#         if relevant_entries:
#             context = "Based on your journal: " + " ".join([e["text"] for e in relevant_entries[:2]])
#         system_prompt = f"""
#         You are MoodBot, a compassionate AI companion. The user is currently feeling {current_user_emotion}.
#         {context}
#         Follow safety guidelines: Show empathy, avoid harmful instructions, suggest safe coping strategies.
#         """
#         response = openai_client.chat.completions.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": "user", "content": user_message},
#             ],
#             max_tokens=150,
#         )
#         bot_reply = response.choices[0].message.content
#         if len(user_message) > 20:
#             save_journal_entry(f"Chat: {user_message}", current_user_emotion)
#         return jsonify({"reply": bot_reply})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/save_journal", methods=["POST"])
# def save_journal():
#     data = request.get_json()
#     entry_id = save_journal_entry(
#         data.get("entry"),
#         data.get("emotion", "neutral"),
#         data.get("username", "guest"),
#         data.get("title", "Untitled")
#     )
#     return jsonify({"success": True, "entry_id": entry_id})

# @app.route("/get_journal_entries")
# def get_journal_entries():
#     username = request.args.get("username", "guest")
#     journals = [
#         e for e in journal_store_data
#         if e["username"] == username
#     ]
#     journals.sort(key=lambda x: x["date"], reverse=True)
#     return jsonify({"entries": journals})

# @app.route("/search_journal", methods=["POST"])
# def search_journal():
#     data = request.get_json()
#     query = data.get("query", "")
#     username = data.get("username", "guest")
#     entries = [
#         e for e in journal_store_data
#         if e["username"] == username and query.lower() in e["title"].lower()
#     ]
#     return jsonify({"entries": entries})

# @app.route("/delete_journal/<entry_id>", methods=["DELETE"])
# def delete_journal(entry_id):
#     global journal_store_data
#     journal_store_data = [e for e in journal_store_data if e["id"] != entry_id]
#     return jsonify({"success": True})


# # ------------------- Run Server -------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)



































#2 app.py
# backend/app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import cv2
# import os
# from tensorflow.keras.models import load_model
# import spotipy
# from spotipy.oauth2 import SpotifyClientCredentials
# import uuid
# from datetime import datetime
# from dotenv import load_dotenv
# from openai import OpenAI
# from langchain_pinecone import PineconeVectorStore
# from langchain_openai import OpenAIEmbeddings

# # ------------------- Load environment variables -------------------
# load_dotenv()
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# # ------------------- OpenAI Setup -------------------
# try:
#     openai_client = OpenAI(api_key=OPENAI_API_KEY)
#     print("✅ OpenAI client initialized")
# except Exception as e:
#     print(f"❌ OpenAI error: {e}")
#     openai_client = None

# # ------------------- Pinecone Setup -------------------
# embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)
# journal_index_name = "moodtunes-journal"

# try:
#     journal_store = PineconeVectorStore.from_existing_index(index_name=journal_index_name, embedding=embeddings)
#     print("✅ Pinecone VectorStore connected")
# except Exception as e:
#     print(f"❌ Pinecone VectorStore error: {e}")
#     journal_store = None

# # ------------------- Fallback in-memory storage -------------------
# journal_store_data = []

# # ------------------- Flask App Setup -------------------
# app = Flask(__name__)
# CORS(app)

# # ------------------- Model Setup (from good version) -------------------
# from tensorflow.keras.applications import ResNet50V2
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Flatten, Dense

# MODEL_PATH = os.path.abspath(os.path.join(
#     os.path.dirname(__file__), "..", "models", "ResNet50V2_Model_Checkpoint.keras"
# ))

# class_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# model = None
# try:
#     # Try safe mode load first
#     model = load_model(MODEL_PATH, compile=False, safe_mode=False)
#     print("✅ Model loaded successfully with safe_mode=False")
# except Exception as e:
#     print(f"⚠️ Error loading model with safe_mode=False: {e}")
#     print("➡️ Rebuilding architecture and loading weights instead...")
#     try:
#         base_model = ResNet50V2(weights=None, include_top=False, input_shape=(224, 224, 3))
#         model = Sequential([
#             base_model,
#             Flatten(),
#             Dense(128, activation='relu'),
#             Dense(len(class_labels), activation='softmax')
#         ])
#         model.load_weights(MODEL_PATH)
#         print("✅ Model weights loaded into rebuilt architecture")
#     except Exception as inner_e:
#         print(f"❌ Failed to rebuild and load model: {inner_e}")

# # ✅ Added helper function from your working version
# def predict_emotion(image: np.ndarray):
#     img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     img_resized = cv2.resize(img_rgb, (224, 224)).astype("float32") / 255.0
#     img_resized = np.expand_dims(img_resized, axis=0)
#     preds = model.predict(img_resized)
#     idx = int(np.argmax(preds))
#     emotion = class_labels[idx]
#     confidence = float(np.max(preds))
#     return emotion, confidence

# # ------------------- Spotify Setup -------------------
# CLIENT_ID = "3fb14b9181c64aa7920dff7a3347754d"
# CLIENT_SECRET = "d81284bfe7744907986e8c6da80d26d4"

# def get_spotify_client():
#     return spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))

# emotion_to_genre = {
#     "happy": "pop",
#     "sad": "acoustic",
#     "angry": "rock",
#     "surprise": "dance",
#     "fear": "ambient",
#     "disgust": "metal",
#     "neutral": "chill"
# }

# # ------------------- Journal Functions -------------------
# def save_journal_entry(entry_text, emotion, username="guest", title="Untitled"):
#     entry_id = f"{username}-{uuid.uuid4()}"
#     metadata = {
#         "username": username,
#         "emotion": emotion,
#         "title": title,
#         "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
#     }
#     if journal_store:
#         journal_store.add_texts(texts=[entry_text], metadatas=[metadata], ids=[entry_id])
#     journal_store_data.append({
#         "id": entry_id,
#         "text": entry_text,
#         "title": title,
#         "emotion": emotion,
#         "date": metadata["date"],
#         "username": username
#     })
#     return entry_id

# def search_journal_entries(query, username="guest", top_k=5):
#     results = []
#     if journal_store:
#         results = journal_store.similarity_search(query=query, k=top_k, filter={"username": username})
#         return [
#             {
#                 "id": doc.metadata.get("id", ""),
#                 "text": doc.page_content,
#                 "emotion": doc.metadata.get("emotion", ""),
#                 "date": doc.metadata.get("date", "")
#             } for doc in results
#         ]
#     # fallback in-memory search
#     return [
#         e for e in journal_store_data
#         if e["username"] == username and query.lower() in e["text"].lower()
#     ][:top_k]

# # ------------------- Endpoints -------------------

# @app.route("/detect-emotion", methods=["POST"])
# def detect_emotion():
#     try:
#         file = request.files.get("file")
#         if not file:
#             return jsonify({"error": "No file provided"}), 400
#         np_array = np.frombuffer(file.read(), np.uint8)
#         img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

#         # ✅ Use helper function from good version
#         emotion, confidence = predict_emotion(img)

#         return jsonify({"emotion": emotion, "confidence": confidence})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/recommendations", methods=["POST"])
# def recommendations():
#     try:
#         data = request.get_json()
#         if not data or "emotion" not in data:
#             return jsonify({"error": "Emotion not provided"}), 400
#         emotion = data["emotion"]
#         num_songs = int(data.get("num_songs", 20))
#         sp = get_spotify_client()
#         genre = emotion_to_genre.get(emotion.lower(), "pop")
#         languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Marathi", "Bengali", "Punjabi", "Gujarati"]
#         songs = []
#         for lang in languages:
#             query = f"{genre} {lang} mood"
#             results = sp.search(q=query, type="track", limit=num_songs)
#             for item in results["tracks"]["items"]:
#                 songs.append({
#                     "name": item["name"],
#                     "artist": item["artists"][0]["name"],
#                     "language": lang,
#                     "spotify_url": item["external_urls"]["spotify"],
#                     "spotify_uri": item["uri"],
#                     "preview_url": item.get("preview_url")
#                 })
#         return jsonify({"emotion": emotion, "songs": songs})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/chat', methods=['POST'])
# def chat():
#     if not openai_client:
#         return jsonify({"error": "OpenAI not configured"}), 500
#     try:
#         data = request.get_json()
#         user_message = data.get("message")
#         current_user_emotion = data.get("emotion", "neutral")
#         context = ""
#         relevant_entries = search_journal_entries(user_message) if journal_store else []
#         if relevant_entries:
#             context = "Based on your journal: " + " ".join([e["text"] for e in relevant_entries[:2]])
#         system_prompt = f"""
#         You are MoodBot, a compassionate AI companion. The user is currently feeling {current_user_emotion}.
#         {context}
#         Follow safety guidelines: Show empathy, avoid harmful instructions, suggest safe coping strategies.
#         """
#         response = openai_client.chat.completions.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": "user", "content": user_message},
#             ],
#             max_tokens=150,
#         )
#         bot_reply = response.choices[0].message.content
#         if len(user_message) > 20:
#             save_journal_entry(f"Chat: {user_message}", current_user_emotion)
#         return jsonify({"reply": bot_reply})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/save_journal", methods=["POST"])
# def save_journal():
#     data = request.get_json()
#     entry_id = save_journal_entry(
#         data.get("entry"),
#         data.get("emotion", "neutral"),
#         data.get("username", "guest"),
#         data.get("title", "Untitled")
#     )
#     return jsonify({"success": True, "entry_id": entry_id})

# @app.route("/get_journal_entries")
# def get_journal_entries():
#     username = request.args.get("username", "guest")
#     journals = [
#         e for e in journal_store_data
#         if e["username"] == username
#     ]
#     journals.sort(key=lambda x: x["date"], reverse=True)
#     return jsonify({"entries": journals})

# @app.route("/search_journal", methods=["POST"])
# def search_journal():
#     data = request.get_json()
#     query = data.get("query", "")
#     username = data.get("username", "guest")
#     entries = [
#         e for e in journal_store_data
#         if e["username"] == username and query.lower() in e["title"].lower()
#     ]
#     return jsonify({"entries": entries})

# @app.route("/delete_journal/<entry_id>", methods=["DELETE"])
# def delete_journal(entry_id):
#     global journal_store_data
#     journal_store_data = [e for e in journal_store_data if e["id"] != entry_id]
#     return jsonify({"success": True})


# # ------------------- Run Server -------------------
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

































# ram app.py
# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import os
from tensorflow.keras.models import load_model
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import uuid
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
import sys  # added to allow adding ml path

# ------------------- Load environment variables -------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# ------------------- OpenAI Setup -------------------
try:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    print("✅ OpenAI client initialized")
except Exception as e:
    print(f"❌ OpenAI error: {e}")
    openai_client = None

# ------------------- Pinecone Setup -------------------
embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)
journal_index_name = "moodtunes-journal"

try:
    journal_store = PineconeVectorStore.from_existing_index(index_name=journal_index_name, embedding=embeddings)
    print("✅ Pinecone VectorStore connected")
except Exception as e:
    print(f"❌ Pinecone VectorStore error: {e}")
    journal_store = None

# ------------------- Fallback in-memory storage -------------------
journal_store_data = []

# ------------------- Flask App Setup -------------------
app = Flask(__name__)
CORS(app)

# ------------------- Model Setup (REPLACED with working model import) -------------------
# Use your working model helper from the 'ml' folder (as in your working app.py)
# This replaces the in-file ResNet50V2 loading logic so inference uses the tested helper.
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ml')))
try:
    from emotion_model import predict_emotion
    print("✅ Imported predict_emotion from ml/emotion_model")
except Exception as e:
    predict_emotion = None
    print(f"❌ Could not import predict_emotion from ml/emotion_model: {e}")

# ------------------- Spotify Setup -------------------
CLIENT_ID = "3fb14b9181c64aa7920dff7a3347754d"
CLIENT_SECRET = "d81284bfe7744907986e8c6da80d26d4"

def get_spotify_client():
    return spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))

emotion_to_genre = {
    "happy": "pop",
    "sad": "acoustic",
    "angry": "rock",
    "surprise": "dance",
    "fear": "ambient",
    "disgust": "metal",
    "neutral": "chill"
}

# ------------------- Journal Functions -------------------
def save_journal_entry(entry_text, emotion, username="guest", title="Untitled"):
    entry_id = f"{username}-{uuid.uuid4()}"
    metadata = {
        "username": username,
        "emotion": emotion,
        "title": title,
        "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
    }
    if journal_store:
        journal_store.add_texts(texts=[entry_text], metadatas=[metadata], ids=[entry_id])
    journal_store_data.append({
        "id": entry_id,
        "text": entry_text,
        "title": title,
        "emotion": emotion,
        "date": metadata["date"],
        "username": username
    })
    return entry_id

def search_journal_entries(query, username="guest", top_k=5):
    results = []
    if journal_store:
        results = journal_store.similarity_search(query=query, k=top_k, filter={"username": username})
        return [
            {
                "id": doc.metadata.get("id", ""),
                "text": doc.page_content,
                "emotion": doc.metadata.get("emotion", ""),
                "date": doc.metadata.get("date", "")
            } for doc in results
        ]
    # fallback in-memory search
    return [
        e for e in journal_store_data
        if e["username"] == username and query.lower() in e["text"].lower()
    ][:top_k]

# ------------------- Endpoints -------------------

@app.route("/detect-emotion", methods=["POST"])
def detect_emotion():
    """
    This endpoint now delegates inference to the working predict_emotion function
    (imported from ml/emotion_model in your working app). The rest of the endpoint
    behavior (the route, errors, and the response shape) is preserved as much as possible.
    """
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No file provided"}), 400

        # If predict_emotion helper is available, use it.
        if predict_emotion is None:
            return jsonify({"error": "Model not available (predict_emotion not imported)"}), 500

        # Read the file and preprocess same as your working app: grayscale 48x48
        npimg = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (48, 48))

        # Use the working helper for prediction
        # In your original working app predict_emotion returned the emotion string.
        result = predict_emotion(img)
        # handle both possible returns: either emotion or (emotion, confidence)
    #     if isinstance(result, tuple) or isinstance(result, list):
    #         emotion = result[0]
    #         confidence = result[1] if len(result) > 1 else None
    #     else:
    #         emotion = result
    #         confidence = None

    #     response = {"emotion": emotion}
    #     if confidence is not None:
    #         response["confidence"] = float(confidence)

    #     return jsonify(response)
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
        if isinstance(result, tuple) or isinstance(result, list):
            emotion = result[0]
            confidence = float(result[1]) if len(result) > 1 and result[1] is not None else 1.0
        else:
            emotion = result
            confidence = 1.0  # default confidence if predict_emotion returns only emotion

        # Build response
        response = {
            "emotion": emotion,
            "confidence": confidence
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recommendations", methods=["POST"])
def recommendations():
    try:
        data = request.get_json()
        if not data or "emotion" not in data:
            return jsonify({"error": "Emotion not provided"}), 400
        emotion = data["emotion"]
        num_songs = int(data.get("num_songs", 20))
        sp = get_spotify_client()
        genre = emotion_to_genre.get(emotion.lower(), "pop")
        languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Marathi", "Bengali", "Punjabi", "Gujarati"]
        songs = []
        for lang in languages:
            query = f"{genre} {lang} mood"
            results = sp.search(q=query, type="track", limit=num_songs)
            for item in results["tracks"]["items"]:
                songs.append({
                    "name": item["name"],
                    "artist": item["artists"][0]["name"],
                    "language": lang,
                    "spotify_url": item["external_urls"]["spotify"],
                    "spotify_uri": item["uri"],
                    "preview_url": item.get("preview_url")
                })
        return jsonify({"emotion": emotion, "songs": songs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ------------------- New Flow Endpoints -------------------

# @app.route("/song_from_emotion", methods=["POST"])
# def song_from_emotion():
#     """
#     Webcam flow:
#     - Frontend (face-api.js) sends emotion string
#     - Backend maps emotion -> Spotify songs
#     """
#     try:
#         data = request.get_json()
#         if not data or "emotion" not in data:
#             return jsonify({"error": "Emotion not provided"}), 400

#         emotion = data["emotion"]
#         sp = get_spotify_client()
#         genre = emotion_to_genre.get(emotion.lower(), "pop")

#         results = sp.search(q=f"{genre} mood", type="track", limit=10)
#         songs = [
#             {
#                 "name": item["name"],
#                 "artist": item["artists"][0]["name"],
#                 "spotify_url": item["external_urls"]["spotify"],
#                 "spotify_uri": item["uri"],
#                 "preview_url": item.get("preview_url"),
#             }
#             for item in results["tracks"]["items"]
#         ]

#         return jsonify({"emotion": emotion, "songs": songs})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


#updated
@app.route("/song_from_emotion", methods=["POST"])
def song_from_emotion():
    try:
        data = request.get_json()
        if not data or "emotion" not in data:
            return jsonify({"error": "Emotion not provided"}), 400

        emotion = data["emotion"]
        sp = get_spotify_client()
        genre = emotion_to_genre.get(emotion.lower(), "pop")

        results = sp.search(q=f"{genre} mood", type="track", limit=10)
        songs = [
            {
                "name": item["name"],
                "artist": item["artists"][0]["name"],
                "spotify_url": item["external_urls"]["spotify"],
                "spotify_uri": item["uri"],
                "preview_url": item.get("preview_url")
            }
            for item in results["tracks"]["items"]
        ]

        return jsonify({"emotion": emotion, "songs": songs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/analyze_image", methods=["POST"])
def analyze_image():
    """
    Greyscale image flow:
    - Frontend uploads base64 greyscale image
    - Backend runs ML model -> predicts emotion
    - Backend maps emotion -> Spotify songs
    """
    try:
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "No image provided"}), 400

        # Decode base64 image
        import base64
        import io
        from PIL import Image

        image_b64 = data["image"].split(",")[-1]  # strip "data:image/jpeg;base64,"
        image_bytes = base64.b64decode(image_b64)
        img = Image.open(io.BytesIO(image_bytes)).convert("L")  # grayscale
        img = img.resize((48, 48))
        img_np = np.array(img)

        if predict_emotion is None:
            return jsonify({"error": "Model not available"}), 500

        result = predict_emotion(img_np)

        if isinstance(result, (tuple, list)):
            emotion = result[0]
            confidence = float(result[1]) if len(result) > 1 else 1.0
        else:
            emotion = result
            confidence = 1.0

        # Spotify mapping
        sp = get_spotify_client()
        genre = emotion_to_genre.get(emotion.lower(), "pop")
        results = sp.search(q=f"{genre} mood", type="track", limit=10)
        songs = [
            {
                "name": item["name"],
                "artist": item["artists"][0]["name"],
                "spotify_url": item["external_urls"]["spotify"],
                "spotify_uri": item["uri"],
                "preview_url": item.get("preview_url"),
            }
            for item in results["tracks"]["items"]
        ]

        return jsonify({"emotion": emotion, "confidence": confidence, "songs": songs})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    if not openai_client:
        return jsonify({"error": "OpenAI not configured"}), 500
    try:
        data = request.get_json()
        user_message = data.get("message")
        current_user_emotion = data.get("emotion", "neutral")
        context = ""
        relevant_entries = search_journal_entries(user_message) if journal_store else []
        if relevant_entries:
            context = "Based on your journal: " + " ".join([e["text"] for e in relevant_entries[:2]])
        system_prompt = f"""
        You are MoodBot, a compassionate AI companion. The user is currently feeling {current_user_emotion}.
        {context}
        Follow safety guidelines: Show empathy, avoid harmful instructions, suggest safe coping strategies.
        """
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            max_tokens=150,
        )
        bot_reply = response.choices[0].message.content
        if len(user_message) > 20:
            save_journal_entry(f"Chat: {user_message}", current_user_emotion)
        return jsonify({"reply": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/save_journal", methods=["POST"])
def save_journal():
    data = request.get_json()
    entry_id = save_journal_entry(
        data.get("entry"),
        data.get("emotion", "neutral"),
        data.get("username", "guest"),
        data.get("title", "Untitled")
    )
    return jsonify({"success": True, "entry_id": entry_id})

@app.route("/get_journal_entries")
def get_journal_entries():
    username = request.args.get("username", "guest")
    journals = [
        e for e in journal_store_data
        if e["username"] == username
    ]
    journals.sort(key=lambda x: x["date"], reverse=True)
    return jsonify({"entries": journals})

@app.route("/search_journal", methods=["POST"])
def search_journal():
    data = request.get_json()
    query = data.get("query", "")
    username = data.get("username", "guest")
    entries = [
        e for e in journal_store_data
        if e["username"] == username and query.lower() in e["title"].lower()
    ]
    return jsonify({"entries": entries})

@app.route("/delete_journal/<entry_id>", methods=["DELETE"])
def delete_journal(entry_id):
    global journal_store_data
    journal_store_data = [e for e in journal_store_data if e["id"] != entry_id]
    return jsonify({"success": True})


# ------------------- Run Server -------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
