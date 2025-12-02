const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }, // index of correct option
  marks: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
