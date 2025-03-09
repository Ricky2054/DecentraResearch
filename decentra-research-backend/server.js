// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Improved MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on DB connection failure
  }
};

// Initialize Server
const startServer = async () => {
  try {
    await connectDB();
    
    // Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.get('/api/papers', (req, res) => {
      res.json(researchPapers);
    });

    // Remaining routes...

    // Handle Port Conflicts Gracefully
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${process.env.PORT} is already in use`);
        console.log('Trying alternate port...');
        app.listen(0); // Let OS assign random available port
      }
    });

  } catch (err) {
    console.error('Server initialization failed:', err);
    process.exit(1);
  }
};

// Start the application
startServer(); 