import React, { useState } from 'react';
import '../styles/MainPage.css';
const MainPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('home');
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  const state = {
    balance: 1250,
    leaderboard: [
      { rank: 1, name: 'Sarah J.', balance: 5230 },
      { rank: 2, name: 'Mike R.', balance: 4150 },
      { rank: 3, name: 'David K.', balance: 3890 },
    ],
    friends: [
      {
        name: 'Alice Chen',
        status: 'Earning',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      {
        name: 'Bob Smith',
        status: 'Active',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      },
      {
        name: 'Carol Wu',
        status: 'Inactive',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      },
    ],
  };

  const renderHome = () => {
    return (
      <div>
        <div className="balance-card">
          <h2>Your Balance</h2>
          <div className="balance">{state.balance} VIC</div>
          <div>Rank: Gold</div>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => setIsRewardsModalOpen(true)}>
            Check Rewards
          </button>
          <button
            className="button"
            onClick={() => window.open('https://t.me/vic_community')}
          >
            Join Community
          </button>
          <button
            className="button"
            onClick={() => setIsRoadmapModalOpen(true)}
          >
            View Footprint Map
          </button>
        </div>
      </div>
    );
  };

  const renderLeaderboard = () => {
    return (
      <div>
        <h2>🏆 Leaderboard</h2>
        {state.leaderboard.map((user) => (
          <div className="leaderboard-item" key={user.rank}>
            <div className="rank">#{user.rank}</div>
            <div className="friend-info">
              <div>{user.name}</div>
              <small>{user.balance} VIC</small>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFriends = () => {
    return (
      <div>
        <h2>👥 Friends</h2>
        <div className="button-container">
          <button className="button">Add Friends</button>
        </div>
        {state.friends.map((friend, index) => (
          <div className="friend-item" key={index}>
            <img
              src={friend.avatar}
              alt={friend.name}
              className="friend-avatar"
            />
            <div className="friend-info">
              <div>{friend.name}</div>
              <div className="friend-status">{friend.status}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <div className="content">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'friends' && renderFriends()}
      </div>

      <nav className="bottom-nav">
        <div
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => switchTab('home')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </div>
        <div
          className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => switchTab('leaderboard')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"></path>
            <path d="M15 7a4 4 0 1 0-8 0"></path>
            <path d="M19 14l-2-2 2-2 2 2-2 2z"></path>
          </svg>
          Leaderboard
        </div>
        <div
          className={`nav-item ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => switchTab('friends')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Friends
        </div>
      </nav>

      {/* Modals */}
      {isRewardsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎁 Rewards</h2>
            <p>Coming soon!</p>
            <button onClick={() => setIsRewardsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isRoadmapModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>🗺 Footprint Map</h2>
            <p>Your journey will be displayed here soon!</p>
            <button onClick={() => setIsRoadmapModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
