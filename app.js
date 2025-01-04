const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your Vue.js dev server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes for inquiry form
app.use('/inquiries', inquiryRoutes);

// 
app.use('/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Inquiry Form App!');
});

// Log environment variables for debugging
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app (useful for testing or advanced setups)
module.exports = app;
