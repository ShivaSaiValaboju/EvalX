const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: Number, required: true }
  }],
  submittedAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);
