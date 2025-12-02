const express = require('express');
const Exam = require('../models/Exam');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Create Exam (admin only)
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Exams
// Get all Exams with search, status filter, and pagination
router.get('/', auth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (status) {
      query.status = status;
    }
    const exams = await Exam.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Exam.countDocuments(query);
    res.json({ exams, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single Exam
router.get('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Exam (admin only)
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Exam (admin only)
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
