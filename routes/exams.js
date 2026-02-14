const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json({
      success: true,
      data: exams,
      count: exams.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET by username
router.get('/username/:username', async (req, res) => {
  try {
    const exams = await Exam.find({ username: req.params.username });
    if (exams.length === 0) {
      return res.status(404).json({ success: false, message: 'No exams found' });
    }
    res.json({ success: true, data: exams, count: exams.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, data: exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json({ success: true, message: 'Exam created successfully', data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, message: 'Exam updated successfully', data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, message: 'Exam deleted successfully', data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
