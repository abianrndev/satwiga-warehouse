const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// Middleware dummy untuk testing (hanya untuk protected routes)
const dummyAuth = (req, res, next) => {
  console.log('Auth middleware called');
  next();
};

// Public routes - GUNAKAN CONTROLLER ASLI
router.post('/register', userController.register);  // ✅ BENAR
router.post('/login', userController.login);        // ✅ BENAR

// Protected routes - bisa pakai dummyAuth dulu atau authenticateToken
router.get('/profile', authenticateToken, userController.getProfile);
router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router;