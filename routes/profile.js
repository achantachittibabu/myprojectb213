const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json({
      success: true,
      data: profiles,
      count: profiles.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET profile by username
router.get('/:username', async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET profiles by userType
router.get('/:usertype', async (req, res) => {
  try {
    const profiles = await Profile.find({ userType: req.params.usertype });
    res.json({
      success: true,
      data: profiles,
      count: profiles.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new profile
router.post('/', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE profile
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    res.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;