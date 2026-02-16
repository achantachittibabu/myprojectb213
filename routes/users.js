const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const Address = require('../models/Address');
const Parent = require('../models/Parent');
const File = require('../models/File');
const logger = require('../utils/logger');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    logger.info('Retrieved all users', { count: users.length });
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    logger.error('Error retrieving users', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      logger.warn('User not found', { userId: req.params.id });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    logger.info('Retrieved user', { userId: req.params.id });
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error retrieving user', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  // Track created documents for rollback
  const createdDocuments = {
    user: null,
    profile: null,
    presentaddress: null,
    permanentaddress: null,
    parent: null,
    file: null
  };

  try {
    const { username,
          email,
          phone,
          password,
          confirmPassword,
          usertype } = req.body;

    // Validation
    if (!username || !email || !password) {
      logger.warn('User creation validation failed', { username, email });
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      logger.warn('User already exists', { email, username });
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    const user = new User({
      username,
      email,
      phone,
      password,
      confirmPassword,
      usertype
    });
    await user.save();
        
    const newUser = await User.findOne({ $or: [{ email }, { username }] });
    createdDocuments.user = newUser.userid; // Store user ID for rollback
    const profile = new Profile({
      userUnId: newUser.userid,
      firstName: req.body.firstName ||"",
      lastName: req.body.lastName || "",
      dateOfBirth: req.body.dateOfBirth || "",
      aadharNumber: req.body.aadharNumber || "",
      contactNumber: req.body.contactNumber || "",
      dateOfJoin: req.body.dateOfJoin || "",
      grade: req.body.grade || "",
      class: req.body.class || "",
      classTeacher: req.body.classTeacher || "",
      creationdate: new Date(),
      lastupdateddate: new Date(),
      lastupdatedby: username
    });
    await profile.save();
    createdDocuments.profile = profile.userUnId;

    const presentaddress = new Address({
      userUnId: newUser.userid,
      addressLine1: req.body.permanentAddressLine1 || "",
      addressLine2: req.body.permanentAddressLine2 || "",
      city: req.body.permanentCity || "",
      state: req.body.permanentState || "",
      pincode: req.body.permanentPincode || "",
      creationdate: new Date(),
      lastupdateddate: new Date(),
      lastupdatedby: newUser.username
    });
    await presentaddress.save();
    createdDocuments.presentaddress = presentaddress.userUnid;

    // Create permanent address only if sameAddress is unchecked (false)
    if (!req.body.sameAddress) {
      const permanentaddress = new Address({
        userUnId: newUser.userid,
        addressLine1: req.body.permanentAddressLine1 || "",
        addressLine2: req.body.permanentAddressLine2 || "",
        city: req.body.permanentCity || "",
        state: req.body.permanentState || "",
        pincode: req.body.permanentPincode || "",
        creationdate: new Date(),
        lastupdateddate: new Date(),
        lastupdatedby: newUser.username
      });
      await permanentaddress.save();
      createdDocuments.permanentaddress = permanentaddress.userUnId;
      logger.info('Permanent address created', { userid: newUser.userid });
    } else {
      logger.info('Skipped permanent address creation - sameAddress is checked', { userid: newUser.userid });
    }

    const parent = new Parent({
      userUnId: newUser.userid,
      fatherName: req.body.fatherName || "",
      motherName: req.body.motherName || "",
      fatherAadharNumber: req.body.fatherAadharNumber || "",
      fatherOccupation: req.body.fatherOccupation || "",
      motherAadharNumber: req.body.motherAadharNumber || "",
      creationdate: new Date(),
      lastupdateddate: new Date(),
      lastupdatedby: newUser.username
    });
    await parent.save();
    createdDocuments.parent = parent.userUnId;

    const file = new File({
      userUnId: newUser.userid,
      filename: req.body.filename || "",
      filesize: req.body.filesize || "",
      filepath: req.body.filepath || "",
      creationdate: new Date(),
      lastupdateddate: new Date(),
      lastupdatedby: newUser.username
    });
    await file.save();
    createdDocuments.file = file.userUnId;

    logger.info('User created successfully', { userid: user.userid, username });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        userid: user.userid
      }
    });
    
  } catch (error) {
    // Rollback: Delete all created documents
    logger.error('Error creating user, initiating rollback', error.message);
    await rollback(createdDocuments);
    
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Rollback function to remove all created documents
async function rollback(createdDocuments) {
  try {
    if (createdDocuments.file) await File.findOneAndDelete({ userUnId : createdDocuments.user });
    if (createdDocuments.parent) await Parent.findOneAndDelete({ userUnId : createdDocuments.user });
    if (createdDocuments.permanentaddress) await Address.findOneAndDelete({ userUnId : createdDocuments.user });
    if (createdDocuments.presentaddress) await Address.findOneAndDelete({ userUnId : createdDocuments.user });
    if (createdDocuments.profile) await Profile.findOneAndDelete({ userUnId : createdDocuments.user });
    if (createdDocuments.user) await User.findOneAndDelete(createdDocuments.user);
    logger.info('Rollback completed: All created documents deleted');
  } catch (rollbackError) {
    logger.error('Rollback error', rollbackError.message);
  }
}

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { username, email, firstName, lastName, phone, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      logger.warn('User not found for update', { userId: req.params.id });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    logger.info('User updated successfully', { userId: req.params.id });
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    logger.error('Error updating user', error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      logger.warn('User not found for deletion', { userId: req.params.id });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.info('User deleted successfully', { userId: req.params.id });
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    logger.error('Error deleting user', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// LOGIN endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password, usertype } = req.body;

    if (!username || !password) {
      logger.warn('Login attempt with missing credentials', { username });
      return res.status(400).json({
        success: false,
        message: 'username and password are required'
      });
    }

    const user = await User.findOne({ username, usertype }).select('+password');
    if (!user) {
      logger.warn('Login failed: User not found', { username, usertype });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials-user not found'
      });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      logger.warn('Login failed: Invalid password', { username });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    logger.info('User login successful', { username, usertype });
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        userid: user.userid,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
      }
    });
  } catch (error) {
    logger.error('Error during login', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
