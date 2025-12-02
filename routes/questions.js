const express = require('express');
const Question = require('../models/Question');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Create Question (admin only)
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Questions by Exam
// Get Questions by Exam with search and pagination
router.get('/:examId', auth, async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = { exam: req.params.examId };
    if (search) {
      query.text = { $regex: search, $options: 'i' };
    }
    const questions = await Question.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Question.countDocuments(query);
    res.json({ questions, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Question (admin only)
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Question (admin only)
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
