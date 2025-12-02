const express = require('express');
const Exam = require('../models/Exam');
const Attempt = require('../models/Attempt');
const Result = require('../models/Result');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Summary report: total exams, attempts, students, average score
router.get('/summary', auth, authorize(['admin']), async (req, res) => {
  try {
    const totalExams = await Exam.countDocuments();
    const totalAttempts = await Attempt.countDocuments();
    const totalStudents = await Result.distinct('student').then(arr => arr.length);
    const avgScore = await Result.aggregate([
      { $group: { _id: null, avg: { $avg: '$score' } } }
    ]);
    res.json({
      totalExams,
      totalAttempts,
      totalStudents,
      avgScore: avgScore[0]?.avg || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Monthly report: attempts and average score per month
router.get('/monthly', auth, authorize(['admin']), async (req, res) => {
  try {
    const monthlyAttempts = await Attempt.aggregate([
      {
        $group: {
          _id: { $month: '$submittedAt' },
          count: { $sum: 1 }
        }
      }
    ]);
    const monthlyScores = await Result.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          avgScore: { $avg: '$score' }
        }
      }
    ]);
    res.json({ monthlyAttempts, monthlyScores });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
