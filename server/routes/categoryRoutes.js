const express = require('express');
const router = express.Router();

// Dummy handler
const dummyHandler = (req, res) => {
  res.json({
    success: true,
    message: 'Category endpoint coming soon!',
    endpoint: req.method + ' ' + req.originalUrl
  });
};

// Routes
router.get('/', dummyHandler);
router.get('/:id', dummyHandler);
router.post('/', dummyHandler);
router.put('/:id', dummyHandler);
router.delete('/:id', dummyHandler);

module.exports = router;