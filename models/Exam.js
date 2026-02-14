const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false
    },
    userType: {
      type: String,
      enum: ['student', 'teacher', 'admin', 'parent'],
      required: false
    },
    examName: {
      type: String,
      trim: true,
      required: false
    },
    class: {
      type: String,
      trim: true,
      required: false
    },
    subject: {
      type: String,
      trim: true,
      required: false
    },
    examDate: {
      type: Date,
      required: false
    },
    startTime: {
      type: String,
      required: false
    },
    endTime: {
      type: String,
      required: false
    },
    room: {
      type: String,
      trim: true,
      required: false
    },
    maxMarks: {
      type: Number,
      required: false
    },
    duration: {
      type: Number,
      required: false
    },
    examType: {
      type: String,
      enum: ['midterm', 'final', 'unit-test', 'periodic-test'],
      required: false
    },
    syllabus: {
      type: String,
      trim: true,
      required: false
    },
    invigilator: {
      type: String,
      trim: true,
      required: false
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);
