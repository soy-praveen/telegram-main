import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const MainPage = () => {
  const [user, setUser] = useState({
    photo_url: 'https://www.example.com/default-profile.jpg',
    username: 'TestUser',
    userId: null,
    referralCount: 0,
    vicTokens: 0,
    referralLink: ''
  });

  useEffect(() => {
    const initTelegramWebApp = async () => {
      try {
        if (window.Telegram?.WebApp) {
          const webApp = window.Telegram.WebApp;
          await webApp.ready();
          
          const userInfo = webApp.initDataUnsafe.user;
          if (userInfo) {
            // First, check if this is a referral
            const urlParams = new URLSearchParams(window.location.search);
            const startParam = urlParams.get('start');
            
            if (startParam) {
              // Process referral
              await fetch(`${API_BASE_URL}/api/check-referral`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  newUserId: userInfo.id,
                  startParam: startParam
                })
              });
            }
  
            // Get or create user in database
            const response = await fetch(`${API_BASE_URL}/api/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: userInfo.id,
                username: userInfo.username,
                photo_url: userInfo.photo_url
              })
            });
  
            const userData = await response.json();
            
            setUser({
              photo_url: userInfo.photo_url || 'https://www.example.com/default-profile.jpg',
              username: userInfo.username || 'No Username',
              userId: userInfo.id,
              referralCount: userData.referralCount,
              vicTokens: userData.vicTokens,
              referralLink: `https://t.me/VictoryAirdropBot?start=ref_${userInfo.id}`
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    initTelegramWebApp();
  }, []);
  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.photo_url}
            alt="Profile Picture"
            className="user-pfp"
          />
          <h2 id="username">{user.username}</h2>
        </div>
        <div className="tokens-info">
          <p>{user.vicTokens.toLocaleString()} VIC Tokens</p>
          <p>Referral Count: {user.referralCount}</p>
        </div>
        <div className="refer-friends">
          <button onClick={copyReferralLink}>Copy Referral Link</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;