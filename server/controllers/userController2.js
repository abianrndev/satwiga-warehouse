// Simple user controller for testing

// Register new user
const register = (req, res) => {
  res.json({
    success: true,
    message: 'Registration endpoint (dummy)',
    data: req.body
  });
};

// Login user
const login = (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint (dummy)',
    data: {
      user: { 
        id: 1, 
        username: req.body.username || 'dummy_user',
        role: 'admin'
      },
      token: 'dummy_token_123'
    }
  });
};

// Get current user profile
const getProfile = (req, res) => {
  res.json({
    success: true,
    message: 'Profile endpoint (dummy)',
    data: {
      id: 1,
      username: 'dummy_user',
      role: 'admin'
    }
  });
};

// Get all users
const getAllUsers = (req, res) => {
  res.json({
    success: true,
    message: 'Get all users endpoint (dummy)',
    data: [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' }
    ]
  });
};

module.exports = {
  register,
  login,
  getProfile,
  getAllUsers
};