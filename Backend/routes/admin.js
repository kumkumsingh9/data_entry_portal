const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const FormData = require('../models/FormData');
const auth = require('../middleware/auth');

const router = express.Router();

// Test route to verify admin routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes are working!' });
});

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

// Get submissions by form type
router.get('/submissions/:formType', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { formType } = req.params;
    
    // Map URL form type to actual form names
    const formTypeMap = {
      'mse-assessment': 'MSE Credit Assessment',
      'financial-analysis': 'Financial Analysis',
      'bank-analysis': 'Bank Analysis',
      'expert-scorecard': 'Expert Scorecard',
      'credit-app-memo': 'Credit Application Memo',
      'output-sheet': 'Output Sheet'
    };

    const formName = formTypeMap[formType];
    if (!formName) {
      return res.status(400).json({ message: 'Invalid form type' });
    }

    const submissions = await FormData.find({ formName })
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    console.error('Get submissions by type error:', error);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
});

// Get individual submission details
router.get('/submissions/:formType/:submissionId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { submissionId } = req.params;

    const submission = await FormData.findById(submissionId)
      .populate('userId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission detail error:', error);
    res.status(500).json({ message: 'Server error fetching submission details' });
  }
});

// Get form submissions by type
router.get('/submissions/:formType', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { formType } = req.params;
    
    // Map form types to form names
    const formTypeMap = {
      'mse-assessment': 'MSE Credit Assessment',
      'financial-analysis': 'Financial Analysis',
      'bank-analysis': 'Bank Analysis',
      'expert-scorecard': 'Expert Scorecard',
      'credit-app-memo': 'Credit Application Memo',
      'output-sheet': 'Output Sheet'
    };

    const formName = formTypeMap[formType];
    if (!formName) {
      return res.status(400).json({ message: 'Invalid form type' });
    }

    const submissions = await FormData.find({ formName })
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 });

    res.json({ submissions, formType, formName });
  } catch (error) {
    console.error('Get form submissions error:', error);
    res.status(500).json({ message: 'Server error fetching form submissions' });
  }
});

// Get individual submission details
router.get('/submissions/:formType/:submissionId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { submissionId } = req.params;
    
    const submission = await FormData.findById(submissionId)
      .populate('userId', 'name email createdAt');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission details error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid submission ID' });
    }
    res.status(500).json({ message: 'Server error fetching submission details' });
  }
});

// Test admin authentication (no auth required)
router.get('/ping', (req, res) => {
  res.json({ 
    message: 'Admin routes accessible',
    timestamp: new Date().toISOString()
  });
});

// Test admin authentication (auth required)
router.get('/test', auth, (req, res) => {
  console.log('Admin test endpoint hit - User:', req.user);
  res.json({ 
    message: 'Admin authentication working',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    console.log('Admin stats request - User:', req.user);
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    console.log('Fetching stats from database...');
    
    // Initialize with default values in case of database issues
    let totalUsers = 0;
    let totalSubmissions = 0;
    let completedSubmissions = 0;

    try {
      // Use Promise.all to fetch all counts in parallel
      const results = await Promise.all([
        User.countDocuments(),
        FormData.countDocuments(),
        FormData.countDocuments({ isCompleted: true })
      ]);
      
      totalUsers = results[0] || 0;
      totalSubmissions = results[1] || 0;
      completedSubmissions = results[2] || 0;
      
      console.log('Database counts:', { totalUsers, totalSubmissions, completedSubmissions });
    } catch (dbError) {
      console.error('Database error in stats:', dbError);
      // Keep default values of 0
    }
    
    const inProgressSubmissions = totalSubmissions - completedSubmissions;
    const completionRate = totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0;

    const stats = {
      totalUsers,
      totalSubmissions,
      completedSubmissions,
      inProgressSubmissions,
      completionRate
    };

    console.log('Admin stats response:', stats);

    res.json({ stats });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ 
      message: 'Server error fetching admin statistics',
      error: error.message 
    });
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

// Debug endpoint to check database contents
router.get('/debug', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const users = await User.find({}, 'name email createdAt').sort({ createdAt: -1 });
    const submissions = await FormData.find({}, 'formName userId submittedAt isCompleted status')
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 });

    const dbStats = {
      totalUsers: users.length,
      totalSubmissions: submissions.length,
      completedSubmissions: submissions.filter(s => s.isCompleted).length,
      submissionsByForm: {},
      recentSubmissions: submissions.slice(0, 5),
      allUsers: users
    };

    // Group submissions by form name
    submissions.forEach(submission => {
      const formName = submission.formName || 'Unknown';
      if (!dbStats.submissionsByForm[formName]) {
        dbStats.submissionsByForm[formName] = 0;
      }
      dbStats.submissionsByForm[formName]++;
    });

    res.json({ 
      message: 'Database debug info',
      stats: dbStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ message: 'Server error in debug endpoint' });
  }
});

// Get all users for user management
router.get('/users', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const users = await User.find({}, '-password')
      .sort({ createdAt: -1 });

    // Get submission count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const submissionCount = await FormData.countDocuments({ userId: user._id });
        const completedSubmissions = await FormData.countDocuments({ 
          userId: user._id, 
          isCompleted: true 
        });
        
        return {
          ...user.toObject(),
          submissionCount,
          completedSubmissions,
          inProgressSubmissions: submissionCount - completedSubmissions
        };
      })
    );

    res.json({ users: usersWithStats });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

module.exports = router;
