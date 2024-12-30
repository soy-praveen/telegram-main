// src/pages/IntroPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../styles/IntroPage.css';

function IntroPage() {
  const navigate = useNavigate();  // Initialize navigate function

  const redirectToCalculate = () => {
    navigate('/calculate');  // Navigate to /calculate route
  };

  return (
    <div className="container">
      <div className="loader">
        <div className="box">
          <div className="logo">
            <img src="/coin.png" alt="Coin Image" className="coin-image" />
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <h1>Welcome to VIC!</h1>
      <p>Click the below claim button to check if you're eligible for the airdrop!</p>
      
      <button onClick={redirectToCalculate} type="button" className="btn">
        <strong>Check Eligibility!</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>
        <div id="glow">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </button>
    </div>
  );
}

export default IntroPage;
