const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    userUnId: {
      type: String,
      required: [true, 'Please provide a user unique ID'],
      trim: true
    },
    fileUnId: {
      type: String,
      unique: true,
      trim: true,
      default: null
    },
    filename: {
      type: String,
      trim: true
    },
    filepath: {
      type: String,
      trim: true
    },
    filesize: {
      type: Number,
      default: 0
    },
    lastupdate: {
      type: Date,
      default: Date.now
    },
    createdate: {
      type: Date,
      default: Date.now
    },
    lastupdateby: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// ===== PRE-SAVE HOOK: AUTO-GENERATE FILE UNIQUE ID =====
fileSchema.pre('save', function(next) {
  if (!this.fileUnId) {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 9);
    this.fileUnId = `file_${timestamp}${randomStr}`;
  }
  next();
});

module.exports = mongoose.model('File', fileSchema);
