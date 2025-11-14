import os
import numpy as np
import cv2
from tensorflow.keras.models import load_model, Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, Input

# Paths to your models
BASE_DIR = os.path.dirname(__file__)
MODEL_OPTIMAL_PATH = os.path.join(BASE_DIR, "model_optimal.h5")
MODEL_WEIGHTS_PATH = os.path.join(BASE_DIR, "model_weights.h5")

# Load model
model = None
if os.path.exists(MODEL_OPTIMAL_PATH):
    model = load_model(MODEL_OPTIMAL_PATH)
    print(f"Loaded full pretrained model: {MODEL_OPTIMAL_PATH}")
elif os.path.exists(MODEL_WEIGHTS_PATH):
    model = Sequential([
        Input(shape=(48, 48, 1)),
        Conv2D(32, (3,3), activation='relu'),
        MaxPooling2D((2,2)),
        Conv2D(64, (3,3), activation='relu'),
        MaxPooling2D((2,2)),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(7, activation='softmax')  # 7 emotion classes
    ])
    model.load_weights(MODEL_WEIGHTS_PATH)
    print(f"Loaded pretrained weights: {MODEL_WEIGHTS_PATH}")
else:
    raise FileNotFoundError("Place model_optimal.h5 or model_weights.h5 in the ml/ folder.")

# Emotion labels
EMOTIONS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def preprocess_image(img):
    """
    Convert to grayscale, resize to 48x48, normalize, add batch & channel dims.
    """
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (48, 48))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=-1)  # channel
    img = np.expand_dims(img, axis=0)   # batch
    return img

def predict_emotion(img):
    """
    Predict emotion from a numpy image array.
    Returns: string label of emotion
    """
    img = preprocess_image(img)
    preds = model.predict(img, verbose=0)
    idx = int(np.argmax(preds))
    return EMOTIONS[idx]
