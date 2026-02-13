const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// GET all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json({
      success: true,
      data: addresses,
      count: addresses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET addresses by username
router.get('/:username', async (req, res) => {
  try {
    const addresses = await Address.find({ username: req.params.username });
    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET address by ID
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }
    res.json({
      success: true,
      data: address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new address
router.post('/', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({
      success: true,
      message: 'Address created successfully',
      data: address
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE address
router.put('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }
    res.json({
      success: true,
      message: 'Address updated successfully',
      data: address
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE address
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }
    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;