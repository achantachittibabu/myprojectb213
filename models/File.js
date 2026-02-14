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
      required: [true, 'Please provide a file unique ID'],
      unique: true,
      trim: true
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

module.exports = mongoose.model('File', fileSchema);
