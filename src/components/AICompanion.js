import React, { useEffect, useState, useCallback } from 'react';
import './AICompanion.css';

const AICompanion = ({ currentEmotion, isDetecting, onSuggestAction, darkMode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [companionMood, setCompanionMood] = useState('neutral');

  // Updated object with actionable tips and suggestions for each mood
  const tipsAndSuggestions = {
    happy: [
      "That's wonderful! Try sharing your happiness with a friend to spread the positive vibes. 😊",
      "A great time to be creative! Your positive energy can fuel your passion projects.",
      "Savor this moment. Try a 5-minute mindfulness exercise focusing on this good feeling.",
      "Keep the good mood going strong with an upbeat playlist! 🎶"
    ],
    sad: [
      "It's okay to feel sad. Try writing your thoughts in a journal to process them.",
      "Consider reaching out to a friend or loved one. A little connection can go a long way.",
      "A short, gentle walk outside can sometimes help lift your spirits. 🚶",
      "How about some comforting music? Let the melodies support you."
    ],
    angry: [
      "Feeling heated? Try a deep breathing exercise: inhale for 4 seconds, hold for 4, exhale for 6.",
      "Channel that energy! A brisk walk or a quick workout can help release tension.",
      "Step away from the situation for a few minutes if you can. A change of scenery helps.",
      "It might help to listen to some intense, powerful music to let it out. 🤘"
    ],
    surprise: [
      "An unexpected moment! Take a second to breathe and take in what just happened.",
      "Life is full of surprises! Embrace the novelty and see where it leads you.",
      "Feeling a bit scattered? Try a grounding exercise: name 5 things you can see right now."
    ],
    fear: [
      "Feeling anxious? Try a grounding technique: name 3 things you can see and 3 things you can hear.",
      "Focus on your breath. A slow, steady rhythm can have a very calming effect.",
      "Remember, this feeling is temporary and it will pass. You are safe in this moment.",
      "How about some calming or empowering music to help you feel stronger? 🛡️"
    ],
    neutral: [
      "A calm state is perfect for reflection. What are you grateful for today?",
      "This is a great time to explore something new. How about trying a new genre of music?",
      "Feeling balanced is a superpower. Use this clarity to plan your next step towards a goal."
    ],
    welcome: [
      "Hi! I'm Kira. Let's find some music for your mood today.",
      "Ready to explore your emotions? I'm here to offer tips and music!"
    ],
    detecting: [
      "Analyzing your expression... Just a moment! 🔍",
      "Reading your emotions... Almost there!"
    ]
  };

  const updateMessage = useCallback((newMessage) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMessage(newMessage);
      setIsAnimating(false);
    }, 300);
  }, []);
  
  const showNewTip = useCallback(() => {
    const tips = tipsAndSuggestions[companionMood] || tipsAndSuggestions.neutral;
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    updateMessage(randomTip);
  }, [companionMood, updateMessage]);

  // Update companion when emotion prop changes
  // useEffect(() => {
  //   const newMood = isDetecting ? 'detecting' : currentEmotion || 'neutral';
  //   setCompanionMood(newMood);
  //   const messages = tipsAndSuggestions[newMood] || tipsAndSuggestions.welcome;
  //   updateMessage(messages[Math.floor(Math.random() * messages.length)]);
  // }, [currentEmotion, isDetecting, updateMessage]);
  
  // // Set an initial welcome message
  // useEffect(() => {
  //     const welcomeMessage = tipsAndSuggestions.welcome[Math.floor(Math.random() * tipsAndSuggestions.welcome.length)];
  //     updateMessage(welcomeMessage);
  // }, [updateMessage]);

  useEffect(() => {
  if (isDetecting) {
    // Show detecting messages
    const messages = tipsAndSuggestions.detecting;
    updateMessage(messages[Math.floor(Math.random() * messages.length)]);
  } else if (currentEmotion) {
    // Show tips based on detected emotion
    const messages = tipsAndSuggestions[currentEmotion] || tipsAndSuggestions.neutral;
    updateMessage(messages[Math.floor(Math.random() * messages.length)]);
  } else {
    // Default to neutral if nothing detected
    const messages = tipsAndSuggestions.neutral;
    updateMessage(messages[Math.floor(Math.random() * messages.length)]);
  }
}, [currentEmotion, isDetecting, updateMessage]);


  const getCompanionExpression = () => {
    const expressions = {
      happy: '😊', sad: '😔', angry: '😤',
      surprise: '😮', fear: '😰', disgust: '🤔',
      neutral: '🤖', detecting: '🔍'
    };
    return expressions[companionMood] || '🤖';
  };

  if (!isVisible) {
    return (
      <div className="ai-companion-minimized" onClick={() => setIsVisible(true)}>
        <div className="companion-icon">🤖</div>
      </div>
    );
  }

  return (
    <div className={`ai-companion ${companionMood} ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="companion-header">
        <div className="companion-avatar">
          <div className="avatar-circle">
            <span className="companion-face">{getCompanionExpression()}</span>
            <div className="pulse-ring"></div>
          </div>
          <div className="companion-name">
            <h4>Kira AI</h4>
            <span className="status">{isDetecting ? 'Analyzing...' : 'Online'}</span>
          </div>
        </div>
        <div className="companion-controls">
          <button className="minimize-btn" onClick={() => setIsVisible(false)} title="Minimize companion">
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <div className="companion-body">
        <div className={`message-bubble ${isAnimating ? 'animating' : ''}`} onClick={showNewTip}>
          <p>{currentMessage}</p>
          <div className="message-tail"></div>
        </div>
        <div className="companion-actions">
          {currentEmotion && (
            <button className="action-btn primary" onClick={() => onSuggestAction('music')}>
              <i className="fas fa-music"></i> Get Music
            </button>
          )}
          <button className="action-btn secondary" onClick={showNewTip}>
              <i className="fas fa-lightbulb"></i> New Tip
          </button>
        </div>
      </div>
      <div className="companion-mood-indicator">
        <div className={`mood-bar ${companionMood}`}></div>
      </div>
    </div>
  );
};

export default AICompanion;