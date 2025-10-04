const express = require('express');
const FormData = require('../models/FormData');
const auth = require('../middleware/auth');

const router = express.Router();

// Save form data
router.post('/save', auth, async (req, res) => {
  try {
    const { formName, responses, currentStep, totalSteps, isCompleted } = req.body;

    if (!formName || !responses) {
      return res.status(400).json({ message: 'Form name and responses are required' });
    }

    // Calculate progress
    const progress = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;

    // Find existing form data or create new
    let formData = await FormData.findOne({ 
      userId: req.user._id, 
      formName 
    });

    if (formData) {
      // Update existing form data
      formData.responses = { ...formData.responses, ...responses };
      formData.currentStep = currentStep || formData.currentStep;
      formData.totalSteps = totalSteps || formData.totalSteps;
      formData.progress = progress;
      formData.isCompleted = isCompleted || false;
      formData.lastSaved = new Date();
      
      if (isCompleted) {
        formData.submittedAt = new Date();
      }
    } else {
      // Create new form data
      formData = new FormData({
        userId: req.user._id,
        formName,
        responses,
        currentStep: currentStep || 1,
        totalSteps: totalSteps || 1,
        progress,
        isCompleted: isCompleted || false,
        submittedAt: isCompleted ? new Date() : null
      });
    }

    await formData.save();

    res.json({
      message: 'Form data saved successfully',
      formData: {
        id: formData._id,
        formName: formData.formName,
        currentStep: formData.currentStep,
        totalSteps: formData.totalSteps,
        progress: formData.progress,
        isCompleted: formData.isCompleted,
        lastSaved: formData.lastSaved
      }
    });
  } catch (error) {
    console.error('Save form error:', error);
    res.status(500).json({ message: 'Server error saving form data' });
  }
});

// Get form data
router.get('/data/:formName', auth, async (req, res) => {
  try {
    const { formName } = req.params;

    const formData = await FormData.findOne({ 
      userId: req.user._id, 
      formName 
    });

    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    res.json({
      formData: {
        id: formData._id,
        formName: formData.formName,
        responses: formData.responses,
        currentStep: formData.currentStep,
        totalSteps: formData.totalSteps,
        progress: formData.progress,
        isCompleted: formData.isCompleted,
        lastSaved: formData.lastSaved,
        submittedAt: formData.submittedAt
      }
    });
  } catch (error) {
    console.error('Get form error:', error);
    res.status(500).json({ message: 'Server error fetching form data' });
  }
});

// Get all user forms
router.get('/user-forms', auth, async (req, res) => {
  try {
    const forms = await FormData.find({ userId: req.user._id })
      .select('formName currentStep totalSteps progress isCompleted lastSaved submittedAt')
      .sort({ lastSaved: -1 });

    res.json({ forms });
  } catch (error) {
    console.error('Get user forms error:', error);
    res.status(500).json({ message: 'Server error fetching user forms' });
  }
});

// Delete form data
router.delete('/data/:formName', auth, async (req, res) => {
  try {
    const { formName } = req.params;

    const formData = await FormData.findOneAndDelete({ 
      userId: req.user._id, 
      formName 
    });

    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    res.json({ message: 'Form data deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error);
    res.status(500).json({ message: 'Server error deleting form data' });
  }
});

// Get form statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalForms = await FormData.countDocuments({ userId: req.user._id });
    const completedForms = await FormData.countDocuments({ 
      userId: req.user._id, 
      isCompleted: true 
    });
    const inProgressForms = totalForms - completedForms;

    res.json({
      stats: {
        totalForms,
        completedForms,
        inProgressForms,
        completionRate: totalForms > 0 ? Math.round((completedForms / totalForms) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error fetching statistics' });
  }
});

module.exports = router;
