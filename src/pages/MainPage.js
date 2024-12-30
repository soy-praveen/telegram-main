import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';

const MainPage = () => {
  const [user, setUser] = useState({
    photo_url: 'https://www.example.com/default-profile.jpg', // Static fallback image
    username: 'TestUser' // Static fallback username
  });

  useEffect(() => {
    // Check if the Telegram WebApp object is available
    if (window.Telegram) {
      const userInfo = window.Telegram.WebApp.initDataUnsafe.user;
      
      if (userInfo) {
        setUser({
          photo_url: userInfo.photo_url || 'https://www.example.com/default-profile.jpg',
          username: userInfo.username || 'No Username'
        });
      }
    }
  }, []);

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.photo_url} // Use the dynamic photo URL from Telegram WebApp or fallback
            alt="Profile Picture"
            className="user-pfp"
          />
          <h2 id="username">{user.username}</h2>
        </div>
        <div className="tokens-info">
          <p>10,000 VIC Tokens</p>
        </div>
        <div className="refer-friends">
          <button>Refer Friends</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
