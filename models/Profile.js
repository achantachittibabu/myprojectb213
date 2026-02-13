const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true
    },
    userType: {
      type: String,
      required: [true, 'Please provide a user type'],
      enum: ['student', 'teacher', 'admin', 'parent'],
      default: 'student'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide date of birth']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please provide gender']
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      trim: true
    },
    profilePicture: {
      type: String, // URL or path to image
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500
    },
    nationality: {
      type: String,
      trim: true,
      default: 'Indian'
    },
    religion: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ['general', 'obc', 'sc', 'st', 'other'],
      trim: true
    },
    fatherName: {
      type: String,
      trim: true
    },
    motherName: {
      type: String,
      trim: true
    },
    guardianName: {
      type: String,
      trim: true
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      relationship: {
        type: String,
        trim: true
      }
    },
    admissionDate: {
      type: Date
    },
    rollNumber: {
      type: String,
      trim: true
    },
    class: {
      type: String,
      trim: true
    },
    section: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient queries
profileSchema.index({ username: 1 });
profileSchema.index({ rollNumber: 1 });

module.exports = mongoose.model('ProfileDetails', profileSchema);