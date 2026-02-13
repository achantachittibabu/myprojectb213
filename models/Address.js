const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
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
    addressType: {
      type: String,
      enum: ['permanent', 'current', 'temporary'],
      default: 'permanent'
    },
    addressLine1: {
      type: String,
      required: [true, 'Please provide address line 1'],
      trim: true,
      maxlength: 200
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: 200
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide state'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
      trim: true,
      default: 'India'
    },
    pincode: {
      type: String,
      required: [true, 'Please provide pincode'],
      trim: true,
      match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
    },
    landmark: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    alternatePhone: {
      type: String,
      trim: true
    },
    isDefault: {
      type: Boolean,
      default: false
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
addressSchema.index({ username: 1, addressType: 1 });

module.exports = mongoose.model('AddressDetails', addressSchema);