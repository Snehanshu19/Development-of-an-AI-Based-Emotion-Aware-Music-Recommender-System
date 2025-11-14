// import React from "react";
// import "./EmotionBox.css";

// const EmotionBox = ({ emotion, confidence }) => {
//   const emojis = {
//     happy: "😊",
//     sad: "😢",
//     angry: "😠",
//     surprise: "😮",
//     disgust: "🤢",
//     fear: "😨",
//     neutral: "😐",
//   };

//   const emotionTexts = {
//     happy: "You seem cheerful today! Keep smiling! 😄",
//     sad: "Feeling a bit down? It's okay to take a break. 💛",
//     angry: "Take a deep breath. Calm moments help! 🌿",
//     surprise: "Wow! Something caught you off guard! 😲",
//     disgust: "Something seems off. Stay positive! 💪",
//     fear: "Take courage, everything will be fine! 🌟",
//     neutral: "Feeling calm and balanced. Keep it up! 🙂",
//   };

//   return (
//     <div className="emotion-container">
//       {/* Left Box: Emoji + Emotion + Confidence */}
//       <div className="emotion-box left-box">
//         <div className="emoji">{emojis[emotion] || "❔"}</div>
//         <h3>{emotion.toUpperCase()}</h3>
//         <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
//       </div>

//       {/* Right Box: Description */}
//       <div className="emotion-box right-box">
//         <p>{emotionTexts[emotion] || "Emotion detected!"}</p>
//       </div>
//     </div>
//   );
// };

// export default EmotionBox;












// import React, { useEffect, useState } from "react";
// import "./EmotionBox.css";

// const EmotionBox = ({ emotion, confidence }) => {
//   const [animatedConfidence, setAnimatedConfidence] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimatedConfidence(confidence * 100);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [confidence]);

//   const emojis = {
//     happy: "😊",
//     sad: "😢",
//     angry: "😠",
//     surprise: "😮",
//     disgust: "🤢",
//     fear: "😨",
//     neutral: "😐",
//   };

//   const emotionTexts = {
//     happy: "You're radiating positive energy! Your joy is contagious and brightens the world around you. ✨",
//     sad: "It's perfectly okay to feel this way. Remember that every emotion is valid, and brighter days are ahead. 💙",
//     angry: "Take a moment to breathe deeply. Channel this energy into something positive and transformative. 🌱",
//     surprise: "Life just threw you a curveball! Embrace the unexpected - it often leads to amazing discoveries. 🎯",
//     disgust: "Something doesn't feel right, and that's your intuition speaking. Trust yourself and stay strong. 💪",
//     fear: "Courage isn't the absence of fear, it's feeling afraid and moving forward anyway. You've got this! 🌟",
//     neutral: "You're in a beautifully balanced state. This calm energy is perfect for reflection and growth. 🧘‍♀️",
//   };

//   const insightIcons = {
//     happy: "🌟",
//     sad: "💙",
//     angry: "🔥",
//     surprise: "⚡",
//     disgust: "🛡️",
//     fear: "🦋",
//     neutral: "🌸",
//   };

//   return (
//     <div className="emotion-container">
//       {/* Left Box: Emoji + Emotion + Confidence */}
//       <div className="emotion-box left-box">
//         <div className="emoji">{emojis[emotion] || "❔"}</div>
//         <h3>{emotion}</h3>
//         <p>Detected with {(confidence * 100).toFixed(1)}% confidence</p>
//         <div className="confidence-bar">
//           <div 
//             className="confidence-fill" 
//             style={{ width: `${animatedConfidence}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Right Box: Insight & Description */}
//       <div className="emotion-box right-box">
//         <div className="insight-icon">{insightIcons[emotion] || "💭"}</div>
//         <p>{emotionTexts[emotion] || "Emotion detected! Let's explore what this means for you."}</p>
//       </div>
//     </div>
//   );
// };

// export default EmotionBox;

















//Updated with Emotion confidence numver and 0 if not present
import React, { useEffect, useState } from "react";
import "./EmotionBox.css";

const EmotionBox = ({ emotion, confidence }) => {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  // Animate confidence only if it exists
  useEffect(() => {
    if (typeof confidence === "number") {
      const timer = setTimeout(() => {
        setAnimatedConfidence(confidence * 100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [confidence]);

  const emojis = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    surprise: "😮",
    disgust: "🤢",
    fear: "😨",
    neutral: "😐",
  };

  const emotionTexts = {
    happy: "You're radiating positive energy! Your joy is contagious and brightens the world around you. ✨",
    sad: "It's perfectly okay to feel this way. Remember that every emotion is valid, and brighter days are ahead. 💙",
    angry: "Take a moment to breathe deeply. Channel this energy into something positive and transformative. 🌱",
    surprise: "Life just threw you a curveball! Embrace the unexpected - it often leads to amazing discoveries. 🎯",
    disgust: "Something doesn't feel right, and that's your intuition speaking. Trust yourself and stay strong. 💪",
    fear: "Courage isn't the absence of fear, it's feeling afraid and moving forward anyway. You've got this! 🌟",
    neutral: "You're in a beautifully balanced state. This calm energy is perfect for reflection and growth. 🧘‍♀️",
  };

  const insightIcons = {
    happy: "🌟",
    sad: "💙",
    angry: "🔥",
    surprise: "⚡",
    disgust: "🛡️",
    fear: "🦋",
    neutral: "🌸",
  };

  return (
    <div className="emotion-container">
      {/* Left Box: Emoji + Emotion + Confidence */}
      <div className="emotion-box left-box">
        <div className="emoji">{emojis[emotion] || "❔"}</div>
        <h3>{emotion}</h3>

        {/* Only show confidence if it exists */}
        {typeof confidence === "number" && (
          <>
            <p>Detected with {(confidence * 100).toFixed(1)}% confidence</p>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${animatedConfidence}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      {/* Right Box: Insight & Description */}
      <div className="emotion-box right-box">
        <div className="insight-icon">{insightIcons[emotion] || "💭"}</div>
        <p>{emotionTexts[emotion] || "Emotion detected! Let's explore what this means for you."}</p>
      </div>
    </div>
  );
};

export default EmotionBox;
