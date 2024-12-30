// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

// User Model
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: DataTypes.STRING,
  referralCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  vicTokens: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  referredBy: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Calculate VIC tokens from username
function calculateVicTokens(username) {
  if (!username) return 0;
  return username
    .split('')
    .map(char => char.toLowerCase().charCodeAt(0) - 96)
    .reduce((sum, num) => sum + num, 0) * 100;
}

// API Routes
app.post('/api/users', async (req, res) => {
  try {
    const { userId, username, photo_url } = req.body;
    const vicTokens = calculateVicTokens(username);
    
    const [user, created] = await User.findOrCreate({
      where: { userId },
      defaults: {
        username,
        photo_url,
        vicTokens
      }
    });

    if (!created) {
      user.username = username;
      user.photo_url = photo_url;
      user.vicTokens = vicTokens;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Handle referral
// In server.js
app.post('/api/check-referral', async (req, res) => {
    try {
      const { newUserId, startParam } = req.body;
      
      // Check if user came from a referral link
      if (startParam && startParam.startsWith('ref_')) {
        const referrerId = startParam.replace('ref_', '');
        
        // Don't count self-referrals
        if (referrerId === newUserId) {
          return res.json({ success: false, message: 'Cannot refer yourself' });
        }
  
        // Find the referrer in database
        const referrer = await User.findByPk(referrerId);
        if (referrer) {
          // Increment referral count
          await referrer.increment('referralCount');
          
          // Mark the new user as referred
          await User.update(
            { referredBy: referrerId },
            { where: { userId: newUserId } }
          );
          
          return res.json({ success: true });
        }
      }
      
      res.json({ success: false });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Initialize database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});