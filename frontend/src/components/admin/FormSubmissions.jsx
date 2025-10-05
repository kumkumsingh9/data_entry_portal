import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './FormSubmissions.css';

// Form configurations - moved outside component to prevent re-creation
const formConfigs = {
    'mse-assessment': {
      title: 'MSE Credit Assessment',
      icon: '🏢',
      color: '#9b59b6',
      description: 'Micro, Small & Enterprise credit evaluation submissions',
      dataFields: ['businessName', 'loanAmount', 'businessType']
    },
    'financial-analysis': {
      title: 'Financial Analysis >$50K',
      icon: '📊',
      color: '#2ecc71',
      description: 'Comprehensive financial analysis submissions',
      dataFields: ['totalAssets', 'totalLiabilities', 'netWorth']
    },
    'bank-analysis': {
      title: 'Bank Analysis >$50K',
      icon: '🏦',
      color: '#34495e',
      description: 'Banking analysis and credit assessment submissions',
      dataFields: ['bankName', 'accountType', 'averageBalance']
    },
    'expert-scorecard': {
      title: 'Expert Scorecard',
      icon: '🎯',
      color: '#e74c3c',
      description: 'Expert assessment and scoring submissions',
      dataFields: ['creditScore', 'riskCategory', 'recommendation']
    },
    'credit-app-memo': {
      title: 'Credit Application Memo',
      icon: '📋',
      color: '#f39c12',
      description: 'Credit application memorandum submissions',
      dataFields: ['applicantName', 'requestedAmount', 'approvalStatus']
    },
    'output-sheet': {
      title: 'Output Sheet',
      icon: '📄',
      color: '#3498db',
      description: 'Final output sheets and comprehensive reports',
      dataFields: ['reportType', 'finalScore', 'recommendation']
    }
  };

const FormSubmissions = () => {
  const navigate = useNavigate();
  const { formType } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, in-progress, draft
  const [searchTerm, setSearchTerm] = useState('');

  const currentConfig = formConfigs[formType] || formConfigs['mse-assessment'];

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(`/api/admin/submissions/${formType}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSubmissions(response.data.submissions || []);
      setError('');
    } catch (err) {
      console.error('Error fetching submissions:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError(`Failed to load submissions for ${formType}`);
      }
    } finally {
      setLoading(false);
    }
  }, [formType, navigate]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter;
    const matchesSearch = submission.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'draft': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return 'N/A';
    return `$${Number(amount).toLocaleString()}`;
  };

  const handleViewDetails = (submissionId) => {
    navigate(`/admin/submissions/${formType}/${submissionId}`);
  };

  const handleDownload = (submissionId) => {
    console.log('Downloading submission:', submissionId);
    // Implementation for downloading submission data
  };

  const renderBusinessDetails = useCallback((formData) => {
    if (!formData) return <span className="na-text">N/A</span>;

    const config = formConfigs[formType] || formConfigs['mse-assessment'];
    const fields = config.dataFields;
    const details = [];

    fields.forEach(field => {
      if (formData[field]) {
        let value = formData[field];
        
        // Format currency fields
        if (field.toLowerCase().includes('amount') || field.toLowerCase().includes('balance') || 
            field.toLowerCase().includes('assets') || field.toLowerCase().includes('liabilities') ||
            field.toLowerCase().includes('worth')) {
          value = formatCurrency(value);
        }
        
        details.push(value);
      }
    });

    return details.length > 0 ? (
      <div className="business-details">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            {detail}
          </div>
        ))}
      </div>
    ) : (
      <span className="na-text">No details available</span>
    );
  }, [formType]);

  if (loading) {
    return (
      <div className="submissions-loading">
        <div className="loading-spinner"></div>
        <p>Loading {currentConfig.title} submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="submissions-error">
        <h2>Error Loading Submissions</h2>
        <p>{error}</p>
        <button onClick={fetchSubmissions} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="form-submissions">
      {/* Header */}
      <header className="submissions-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              onClick={() => navigate('/admin')} 
              className="back-btn"
            >
              ← Back to Dashboard
            </button>
            <div className="page-title">
              <h1>{currentConfig.icon} {currentConfig.title} Submissions</h1>
              <p>{currentConfig.description}</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{submissions.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {submissions.filter(s => s.status === 'completed').length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {submissions.filter(s => s.status === 'in-progress').length}
              </span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="submissions-controls">
        <div className="controls-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by user name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="controls-right">
          <button onClick={fetchSubmissions} className="refresh-btn">
            🔄 Refresh
          </button>
          <button className="export-btn">
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="submissions-content">
        {filteredSubmissions.length === 0 ? (
          <div className="no-submissions">
            <div className="no-submissions-icon" style={{ color: currentConfig.color }}>
              {currentConfig.icon}
            </div>
            <h3>No submissions found</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : `No ${currentConfig.title} submissions have been made yet.`
              }
            </p>
          </div>
        ) : (
          <div className="submissions-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Information</th>
                  <th>Form Details</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Submitted</th>
                  <th>Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td>
                      <div className="submission-id">
                        <code>{submission._id.slice(-8)}</code>
                      </div>
                    </td>
                    
                    <td>
                      <div className="user-info">
                        <div className="user-name">
                          {submission.userId?.name || 'Unknown User'}
                        </div>
                        <div className="user-email">
                          {submission.userId?.email || 'No email'}
                        </div>
                      </div>
                    </td>

                    <td>
                      {renderBusinessDetails(submission.formData)}
                    </td>

                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(submission.status) }}
                      >
                        {submission.status?.replace('-', ' ') || 'Unknown'}
                      </span>
                    </td>

                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ 
                              width: `${submission.progress || 0}%`,
                              backgroundColor: getStatusColor(submission.status)
                            }}
                          ></div>
                        </div>
                        <span className="progress-text">{submission.progress || 0}%</span>
                      </div>
                    </td>

                    <td>
                      <div className="date-info">
                        {submission.submittedAt 
                          ? formatDate(submission.submittedAt)
                          : <span className="not-submitted">Not submitted</span>
                        }
                      </div>
                    </td>

                    <td>
                      <div className="date-info">
                        {submission.lastModified 
                          ? formatDate(submission.lastModified)
                          : formatDate(submission.createdAt)
                        }
                      </div>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleViewDetails(submission._id)}
                          className="action-btn view-btn"
                          title="View Details"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleDownload(submission._id)}
                          className="action-btn download-btn"
                          title="Download"
                        >
                          📥
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredSubmissions.length > 0 && (
        <div className="submissions-pagination">
          <div className="pagination-info">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmissions;