const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//load environment variables from .env file
dotenv.config();

//initialize express app
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
app.get('/', (req, res) => {	
		res.send('Welcome to Warehpuse API');
});

// Import routes (akan kita buat nanti)
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/items', require('./routes/itemRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));
// app.use('/api/reports', require('./routes/reportRoutes'));


//start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});