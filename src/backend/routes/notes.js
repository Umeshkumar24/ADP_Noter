const express = require('express');
const router = express.Router();
const multer = require('multer');
const Note = require('../models/Note');
const path = require('path');
const fs = require('fs');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/pdfs';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'note-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post('/notes/:id/pdf', upload.single('pdf'), async (req, res) => {
  try {
    // Check if file was provided
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      // Delete uploaded file if note not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Delete old PDF if it exists
    if (note.pdfPath && fs.existsSync(note.pdfPath)) {
      fs.unlinkSync(note.pdfPath);
    }
    
    // Save PDF file path to note
    note.pdfPath = req.file.path;
    await note.save();
    
    res.json({ 
      message: 'PDF uploaded successfully',
      filePath: note.pdfPath
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('PDF upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload PDF',
      error: error.message 
    });
  }
});