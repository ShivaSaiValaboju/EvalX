require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const examsRoutes = require('./routes/exams');
app.use('/api/exams', examsRoutes);

const questionsRoutes = require('./routes/questions');
app.use('/api/questions', questionsRoutes);

const attemptsRoutes = require('./routes/attempts');
app.use('/api/attempts', attemptsRoutes);


const resultsRoutes = require('./routes/results');
app.use('/api/results', resultsRoutes);


const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const reportsRoutes = require('./routes/reports');
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/evalx';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
