const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes.js');
const reportRoutes = require('./routes/reportRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('Warehouse Management API is running!');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);


//simple test route
app.post('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API testng works YAYYY!',
    data: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Trey these endpoints: 
  - GET http://localhost:${PORT}/
  - POST http://localhost:${PORT}/api/test
  - POST http://localhost:${PORT}/api/users/login
  - POST http://localhost:${PORT}/api/users/register
  - GET http://localhost:${PORT}/api/users/profile
  - GET http://localhost:${PORT}/api/users`);
});