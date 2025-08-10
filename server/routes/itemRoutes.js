const express = require('express');
const router = express.Router();

// Import controller (kalau sudah ada)
// const itemController = require('../controllers/itemController');

// Import middleware (kalau sudah ada)
// const { authenticateToken } = require('../middleware/auth');

// Middleware dummy untuk testing (supaya tidak error)
const dummyAuth = (req, res, next) => {
  console.log('Authentication middleware called');
  next();
};

// Handler dummy untuk testing
const dummyHandler = (req, res) => {
  res.json({
    success: true,
    message: 'Item endpoint is working!',
    endpoint: req.method + ' ' + req.originalUrl
  });
};

// JANGAN PAKAI INI kalau middleware belum didefinisikan:
// router.use(authenticateToken); // <-- INI YANG BIKIN ERROR!

// Pakai middleware dummy dulu untuk testing
router.use(dummyAuth);

// Routes dengan handler dummy
router.get('/', dummyHandler);
router.get('/low-stock', dummyHandler);
router.get('/:id', dummyHandler);
router.post('/', dummyHandler);
router.put('/:id', dummyHandler);
router.delete('/:id', dummyHandler);

module.exports = router;