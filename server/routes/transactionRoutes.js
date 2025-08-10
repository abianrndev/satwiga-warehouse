const express = require('express');
const router = express.Router();

// Dummy handler
const dummyHandler = (req, res) => {
  res.json({
    success: true,
    message: 'Transaction endpoint coming soon!',
    endpoint: req.method + ' ' + req.originalUrl
  });
};

// Routes
router.get('/', dummyHandler);
router.get('/:id', dummyHandler);
router.post('/', dummyHandler);

module.exports = router;