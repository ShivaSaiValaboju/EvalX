const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  scheduledAt: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  status: { type: String, enum: ['scheduled', 'active', 'completed'], default: 'scheduled' },
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
