     // Load environment variables
     require('dotenv').config();

     const express = require('express');
     const cors = require('cors');
     const connectDB = require('./config/db');
     const app = express();

     // Connect to MongoDB
     connectDB();

     // Middleware
     app.use(express.json());
     app.use(cors());

     // Basic route for testing
     app.get('/', (req, res) => {
       res.json({ 
         message: 'DecentraResearch API is working!',
         version: '1.0.0',
         status: 'online'
       });
     });

     // Start server
     const PORT = process.env.PORT || 5001;
     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
       console.log(`API available at http://localhost:${PORT}`);
     });