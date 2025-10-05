import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

// Form configurations for navigation cards - moved outside component to prevent re-creation
const formConfigs = [
    {
      key: 'mse-assessment',
      title: 'MSE Credit Assessment',
      icon: '🏢',
      color: '#9b59b6',
      description: 'Micro, Small & Enterprise credit evaluation',
      route: '/admin/forms/mse-assessment'
    },
    {
      key: 'financial-analysis',
      title: 'Financial Analysis >$50K',
      icon: '📊',
      color: '#2ecc71',
      description: 'Comprehensive financial analysis for loans above $50K',
      route: '/admin/forms/financial-analysis'
    },
    {
      key: 'bank-analysis',
      title: 'Bank Analysis >$50K',
      icon: '🏦',
      color: '#34495e',
      description: 'Banking analysis and credit assessment',
      route: '/admin/forms/bank-analysis'
    },
    {
      key: 'expert-scorecard',
      title: 'Expert Scorecard',
      icon: '🎯',
      color: '#e74c3c',
      description: 'Expert assessment and scoring system',
      route: '/admin/forms/expert-scorecard'
    },
    {
      key: 'credit-app-memo',
      title: 'Credit App Memo',
      icon: '📋',
      color: '#f39c12',
      description: 'Credit application memorandum and approval workflow',
      route: '/admin/forms/credit-app-memo'
    },
    {
      key: 'output-sheet',
      title: 'Output Sheet',
      icon: '📄',
      color: '#3498db',
      description: 'Final output sheets and comprehensive reports',
      route: '/admin/forms/output-sheet'
    }
  ];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    completedSubmissions: 0,
    inProgressSubmissions: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setStats(response.data.stats);
      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load dashboard data';
        setError(`Error: ${errorMessage}`);
        console.error('Full error details:', err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Set default axios header for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    fetchDashboardData();
  }, [navigate, fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };

  const handleFormNavigation = (route) => {
    navigate(route);
  };
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Manage all form submissions and user data</p>
          </div>
          <div className="header-actions">
            <button onClick={fetchDashboardData} className="refresh-btn">
              🔄 Refresh
            </button>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {/* Statistics Cards */}
        <section className="stats-section">
          <h2>System Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>{stats.totalSubmissions}</h3>
                <p>Total Submissions</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{stats.completedSubmissions}</h3>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <h3>{stats.inProgressSubmissions}</h3>
                <p>In Progress</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>{stats.completionRate}%</h3>
                <p>Completion Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Management Section */}
        <section className="forms-section">
          <h2>Form Management</h2>
          <p>Click on any form type to view submissions and manage data</p>
          
          <div className="forms-grid">
            {formConfigs.map((form) => (
              <div
                key={form.key}
                className="form-card"
                style={{ borderLeftColor: form.color }}
                onClick={() => handleFormNavigation(form.route)}
              >
                <div className="form-card-header">
                  <div className="form-icon" style={{ backgroundColor: form.color }}>
                    {form.icon}
                  </div>
                  <div className="form-title">
                    <h3>{form.title}</h3>
                    <span className="form-type">{form.key.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="form-description">
                  <p>{form.description}</p>
                </div>

                <div className="form-card-footer">
                  <span className="view-submissions">View Submissions →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-btn"
              onClick={() => navigate('/admin/users')}
            >
              <span className="action-icon">👥</span>
              <span className="action-text">Manage Users</span>
            </button>
            
            <button 
              className="action-btn"
              onClick={() => navigate('/admin/reports')}
            >
              <span className="action-icon">📊</span>
              <span className="action-text">Generate Reports</span>
            </button>
            
            <button 
              className="action-btn"
              onClick={() => navigate('/admin/settings')}
            >
              <span className="action-icon">⚙️</span>
              <span className="action-text">System Settings</span>
            </button>
            
            <button 
              className="action-btn"
              onClick={fetchDashboardData}
            >
              <span className="action-icon">🔄</span>
              <span className="action-text">Refresh Data</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;