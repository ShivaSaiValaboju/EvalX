const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { auth } = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'evalx_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
});

const upload = multer({ storage });

const router = express.Router();

// File upload endpoint
router.post('/', auth, upload.single('file'), (req, res) => {
  try {
    res.json({ url: req.file.path, public_id: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: 'File upload failed' });
  }
});

module.exports = router;
