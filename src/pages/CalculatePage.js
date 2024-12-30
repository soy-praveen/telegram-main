import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import '../styles/calculate.css';

const CalculatePage = () => {
  const navigate = useNavigate(); // Hook for navigating to another page

  const steps = [
    { id: "step1", textId: "text1", message: "Account age: Hello" },
    { id: "step2", textId: "text2", message: "Telegram activity verified" },
    { id: "step3", textId: "text3", message: "Allocated VIC's: 1000" },
  ];

  const [loadingProgress, setLoadingProgress] = useState([0, 0, 0]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress.map((progress, index) => {
          if (progress < 100) {
            return progress + 10; // Increase by 10 for simplicity
          }
          return progress;
        });

        // Check if all steps are completed
        if (newProgress.every(progress => progress === 100)) {
          clearInterval(interval);
          setIsButtonVisible(true);
        }

        return newProgress;
      });
    }, 500); // Update progress every 500ms

    return () => clearInterval(interval);
  }, []);

  const handleNextClick = () => {
    navigate('/mainpage'); // Navigate to MainPage.js
  };

  return (
    <div className="container">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="step visible"
          id={step.id}
        >
          <p className="step-text" id={step.textId}>
            {step.textId === 'text1' && "Checking account age..."}
            {step.textId === 'text2' && "Verifying Telegram activity..."}
            {step.textId === 'text3' && "Allocating VIC's..."}
          </p>

          <div className="loading-bar-background">
            <div
              className="loading-bar"
              style={{ width: `${loadingProgress[index]}%` }}
            ></div>
          </div>
        </div>
      ))}

      {isButtonVisible && (
        <button
          className="cssbuttons-io next-button show"
          onClick={handleNextClick} // Handle the click to navigate
        >
          <span>Go to home page</span>
        </button>
      )}
    </div>
  );
};

export default CalculatePage;
