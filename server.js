const express = require('express');
const cors = require('cors');  // Add this line to import CORS
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const assetRoutes = require('./routes/assets'); // If you have asset routes
const errorHandler = require('./middleware/errorHandler');
const db = require('./models'); // Import models



// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with specific origin (allowing frontend at localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  credentials: true, // Allow cookies and authorization headers
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('PharmaAssetPro Backend is running.');
});

// Error Handling Middleware
app.use(errorHandler);

// Synchronize Models and Start Server
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
