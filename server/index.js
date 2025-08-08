const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//load environment variables
dotenv.config();

//init app
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
  res.send('Welcome to Warehouse API');
});

// Import routes (akan kita buat nanti)
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/items', require('./routes/itemRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));
// app.use('/api/reports', require('./routes/reportRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});