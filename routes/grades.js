const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// GET all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find().populate('student', 'username email');
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET grades by username
router.get('/username/:username', async (req, res) => {
  try {
    const grades = await Grade.find({ username: req.params.username }).populate('student', 'username email');
    if (grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No grades found for this username'
      });
    }
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET grades by userType
router.get('/usertype/:usertype', async (req, res) => {
  try {
    const grades = await Grade.find({ userType: req.params.usertype }).populate('student', 'username email');
    if (grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No grades found for this user type'
      });
    }
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET grades by class
router.get('/class/:class', async (req, res) => {
  try {
    const grades = await Grade.find({ class: req.params.class }).populate('student', 'username email');
    if (grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No grades found for this class'
      });
    }
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET grade by ID
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id).populate('student', 'username email');
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }
    res.json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE new grade
router.post('/', async (req, res) => {
  try {
    const {
      student,
      username,
      userType,
      class: gradeClass,
      section,
      subject,
      marksObtained,
      totalMarks,
      gradePoint,
      gradePercentage,
      examType,
      examDate,
      remarks,
      recordedBy
    } = req.body;

    // Validation
    if (!username || !userType || !gradeClass || !subject || marksObtained === undefined || !gradePoint || gradePercentage === undefined || !examType || !examDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Calculate grade percentage if not provided
    let finalGradePercentage = gradePercentage;
    if (!finalGradePercentage && totalMarks) {
      finalGradePercentage = (marksObtained / totalMarks) * 100;
    }

    const grade = new Grade({
      student,
      username,
      userType,
      class: gradeClass,
      section,
      subject,
      marksObtained,
      totalMarks: totalMarks || 100,
      gradePoint,
      gradePercentage: finalGradePercentage,
      examType,
      examDate,
      remarks,
      recordedBy
    });

    await grade.save();

    res.status(201).json({
      success: true,
      message: 'Grade created successfully',
      data: grade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE grade by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      marksObtained,
      totalMarks,
      gradePoint,
      gradePercentage,
      remarks,
      recordedBy
    } = req.body;

    const updateFields = {};

    if (marksObtained !== undefined) updateFields.marksObtained = marksObtained;
    if (totalMarks !== undefined) updateFields.totalMarks = totalMarks;
    if (gradePoint !== undefined) updateFields.gradePoint = gradePoint;
    if (gradePercentage !== undefined) {
      updateFields.gradePercentage = gradePercentage;
    } else if (marksObtained !== undefined && totalMarks !== undefined) {
      updateFields.gradePercentage = (marksObtained / totalMarks) * 100;
    }
    if (remarks !== undefined) updateFields.remarks = remarks;
    if (recordedBy !== undefined) updateFields.recordedBy = recordedBy;
    updateFields.updatedAt = Date.now();

    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.json({
      success: true,
      message: 'Grade updated successfully',
      data: grade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE grade by ID
router.delete('/:id', async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.json({
      success: true,
      message: 'Grade deleted successfully',
      data: grade
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// GET grades by student ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId }).populate('student', 'username email');
    if (grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No grades found for this student'
      });
    }
    res.json({
      success: true,
      data: grades,
      count: grades.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
