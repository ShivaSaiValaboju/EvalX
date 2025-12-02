const express = require('express');
const Result = require('../models/Result');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get Results by Student
// Get Results by Student with pagination
router.get('/:studentId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.studentId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { page = 1, limit = 10 } = req.query;
    const results = await Result.find({ student: req.params.studentId })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Result.countDocuments({ student: req.params.studentId });
    res.json({ results, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update Result (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { student, exam, score, rank } = req.body;
    let result = await Result.findOneAndUpdate(
      { student, exam },
      { score, rank },
      { new: true, upsert: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
