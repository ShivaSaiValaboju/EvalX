const express = require('express');
const Attempt = require('../models/Attempt');
const Question = require('../models/Question');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Submit Attempt
router.post('/submit', auth, async (req, res) => {
  try {
    const { exam, answers } = req.body;
    let score = 0;
    for (const ans of answers) {
      const question = await Question.findById(ans.question);
      if (question && question.correctOption === ans.selectedOption) {
        score += question.marks;
      }
    }
    const attempt = await Attempt.create({
      student: req.user._id,
      exam,
      answers,
      score,
      submittedAt: new Date()
    });
    res.status(201).json(attempt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Attempts by Student
// Get Attempts by Student with pagination
router.get('/:studentId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.studentId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { page = 1, limit = 10 } = req.query;
    const attempts = await Attempt.find({ student: req.params.studentId })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Attempt.countDocuments({ student: req.params.studentId });
    res.json({ attempts, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
