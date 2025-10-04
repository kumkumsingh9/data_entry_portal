const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const FormData = require('../models/FormData');
const auth = require('../middleware/auth');

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@dataentry.com',
  password: 'admin123',
  name: 'System Administrator'
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: 'admin',
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
});

// Get all form submissions
router.get('/submissions', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const submissions = await FormData.find()
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const totalUsers = await User.countDocuments();
    const totalSubmissions = await FormData.countDocuments();
    const completedSubmissions = await FormData.countDocuments({ isCompleted: true });
    const inProgressSubmissions = totalSubmissions - completedSubmissions;

    res.json({
      stats: {
        totalUsers,
        totalSubmissions,
        completedSubmissions,
        inProgressSubmissions,
        completionRate: totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error fetching admin statistics' });
  }
});

// Get form structure (this will be populated from Excel data)
router.get('/form-structure', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // This will be updated when we parse the Excel file
    const formStructure = {
      formName: 'MSE Credit Assessment',
      version: '3.1',
      sheets: [
        {
          name: 'Sheet 1',
          fields: []
        }
        // More sheets will be added based on Excel data
      ]
    };

    res.json({ formStructure });
  } catch (error) {
    console.error('Get form structure error:', error);
    res.status(500).json({ message: 'Server error fetching form structure' });
  }
});

module.exports = router;
