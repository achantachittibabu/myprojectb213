const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema(
  {
    // ===== UNIQUE IDENTIFIERS =====
    parentUnId: {
      type: String,
      required: [true, 'Parent unique ID is required'],
      unique: true,
      trim: true
    },

    userUnId: {
      type: String,
      required: [true, 'User unique ID is required'],
      trim: true
    },

    // ===== FATHER INFORMATION =====
    fatherName: {
      type: String,
      trim: true
    },

    fatherAadharCard: {
      type: String,
      sparse: true,
      trim: true,
      validate: {
        validator: function(value) {
          return !value || /^\d{12}$/.test(value);
        },
        message: 'Father Aadhar card must be 12 digits'
      }
    },

    fatherOccupation: {
      type: String,
      trim: true
    },

    // ===== MOTHER INFORMATION =====
    motherName: {
      type: String,
      trim: true
    },

    motherAadharCard: {
      type: String,
      sparse: true,
      trim: true,
      validate: {
        validator: function(value) {
          return !value || /^\d{12}$/.test(value);
        },
        message: 'Mother Aadhar card must be 12 digits'
      }
    },

    // ===== AUDIT FIELDS =====
    creationdate: {
      type: Date,
      default: Date.now
    },

    lastupdateddate: {
      type: Date,
      default: Date.now
    },

    lastupdatedby: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// ===== PRE-SAVE HOOK: UPDATE LAST UPDATED DATE =====
parentSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.lastupdateddate = new Date();
  }
  next();
});

// ===== INDEXES FOR EFFICIENT QUERIES =====
parentSchema.index({ parentUnId: 1 });
parentSchema.index({ userUnId: 1 });
parentSchema.index({ fatherAadharCard: 1 });
parentSchema.index({ motherAadharCard: 1 });
parentSchema.index({ creationdate: 1 });

module.exports = mongoose.model('ParentDetails', parentSchema);
