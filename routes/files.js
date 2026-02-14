const express = require('express');
const router = express.Router();
const File = require('../models/File');

// GET all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find();
    res.json({
      success: true,
      data: files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET file by ID
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    res.json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET files by userUnId
router.get('/user/:userUnId', async (req, res) => {
  try {
    const files = await File.find({ userUnId: req.params.userUnId });
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No files found for this user'
      });
    }
    res.json({
      success: true,
      data: files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new file
router.post('/', async (req, res) => {
  try {
    const { userUnId, fileUnId, filename, filepath, filesize, lastupdateby } = req.body;

    // Validate required fields
    if (!userUnId || !fileUnId) {
      return res.status(400).json({
        success: false,
        message: 'userUnId and fileUnId are required'
      });
    }

    const file = await File.create({
      userUnId,
      fileUnId,
      filename,
      filepath,
      filesize,
      lastupdateby,
      createdate: new Date(),
      lastupdate: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'File created successfully',
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE file
router.put('/:id', async (req, res) => {
  try {
    const { filename, filepath, filesize, lastupdateby } = req.body;

    const file = await File.findByIdAndUpdate(
      req.params.id,
      {
        filename,
        filepath,
        filesize,
        lastupdateby,
        lastupdate: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    res.json({
      success: true,
      message: 'File updated successfully',
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    res.json({
      success: true,
      message: 'File deleted successfully',
      data: file
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
