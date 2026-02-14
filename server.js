const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const HOST = 'localhost';
const PORT = 5000;
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
app.use(cors());
// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/schooldb';
    
    await mongoose.connect(mongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/user', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/health', require('./routes/health'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/fees', require('./routes/feeDetails'));
app.use('/api/address', require('./routes/address'));
app.use('/api/grades', require('./routes/grades'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/library', require('./routes/library'));
app.use('/api/feepayments', require('./routes/feepayments'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/files', require('./routes/files'));

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to ReactNative Backend API',
    status: 'running',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
