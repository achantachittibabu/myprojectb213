const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');

// GET all parents
router.get('/', async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json({
      success: true,
      data: parents,
      count: parents.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET parent by ID
router.get('/:id', async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }
    res.json({
      success: true,
      data: parent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET parent by parentUnId
router.get('/unid/:parentUnId', async (req, res) => {
  try {
    const parent = await Parent.findOne({ parentUnId: req.params.parentUnId });
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }
    res.json({
      success: true,
      data: parent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET parents by userUnId
router.get('/user/:userUnId', async (req, res) => {
  try {
    const parents = await Parent.find({ userUnId: req.params.userUnId });
    res.json({
      success: true,
      data: parents,
      count: parents.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new parent record
router.post('/', async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json({
      success: true,
      message: 'Parent record created successfully',
      data: parent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// UPDATE parent record by ID
router.put('/:id', async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }

    res.json({
      success: true,
      message: 'Parent record updated successfully',
      data: parent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// UPDATE parent record by parentUnId
router.put('/unid/:parentUnId', async (req, res) => {
  try {
    const parent = await Parent.findOneAndUpdate(
      { parentUnId: req.params.parentUnId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }

    res.json({
      success: true,
      message: 'Parent record updated successfully',
      data: parent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// DELETE parent record by ID
router.delete('/:id', async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }
    res.json({
      success: true,
      message: 'Parent record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE parent record by parentUnId
router.delete('/unid/:parentUnId', async (req, res) => {
  try {
    const parent = await Parent.findOneAndDelete({ parentUnId: req.params.parentUnId });
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent record not found'
      });
    }
    res.json({
      success: true,
      message: 'Parent record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
