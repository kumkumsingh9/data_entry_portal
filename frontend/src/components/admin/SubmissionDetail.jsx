import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SubmissionDetail.css';

const SubmissionDetail = () => {
  const { formType, submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Form configurations
  const formConfigs = {
    'mse-assessment': {
      title: 'MSE Credit Assessment',
      icon: '🏢',
      color: '#9b59b6',
      description: 'Micro, Small & Enterprise credit evaluation submission'
    },
    'financial-analysis': {
      title: 'Financial Analysis >$50K',
      icon: '📊',
      color: '#2ecc71',
      description: 'Comprehensive financial analysis submission'
    },
    'bank-analysis': {
      title: 'Bank Analysis >$50K',
      icon: '🏦',
      color: '#34495e',
      description: 'Banking analysis and credit assessment submission'
    },
    'expert-scorecard': {
      title: 'Expert Scorecard',
      icon: '🎯',
      color: '#e74c3c',
      description: 'Expert assessment and scoring submission'
    },
    'credit-app-memo': {
      title: 'Credit Application Memo',
      icon: '📋',
      color: '#f39c12',
      description: 'Credit application memorandum submission'
    },
    'output-sheet': {
      title: 'Output Sheet',
      icon: '📄',
      color: '#3498db',
      description: 'Final output sheet and comprehensive report submission'
    }
  };

  const currentConfig = formConfigs[formType] || formConfigs['mse-assessment'];

  const fetchSubmissionDetail = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(`/api/admin/submissions/${formType}/${submissionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSubmission(response.data.submission);
      setError('');
    } catch (err) {
      console.error('Error fetching submission detail:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else if (err.response?.status === 404) {
        setError('Submission not found');
      } else {
        setError('Failed to load submission details');
      }
    } finally {
      setLoading(false);
    }
  }, [submissionId, formType, navigate]);

  useEffect(() => {
    fetchSubmissionDetail();
  }, [fetchSubmissionDetail]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'draft': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const renderFormData = (data, title) => {
    if (!data || typeof data !== 'object') {
      return (
        <div className="no-data">
          <p>No form data available for this submission.</p>
        </div>
      );
    }

    const entries = Object.entries(data).filter(([, value]) =>
      value !== null && value !== undefined && value !== ''
    );    if (entries.length === 0) {
      return (
        <div className="no-data">
          <p>No form data available for this submission.</p>
        </div>
      );
    }

    return (
      <div className="data-section">
        <h3>{title}</h3>
        <div className="data-grid">
          {entries.map(([key, value]) => (
            <div key={key} className="data-item">
              <label className="data-label">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </label>
              <div className="data-value">
                {typeof value === 'object' 
                  ? JSON.stringify(value, null, 2)
                  : typeof value === 'boolean'
                  ? (value ? 'Yes' : 'No')
                  : typeof value === 'number' && (key.toLowerCase().includes('amount') || 
                      key.toLowerCase().includes('balance') || key.toLowerCase().includes('assets') ||
                      key.toLowerCase().includes('liabilities') || key.toLowerCase().includes('worth'))
                  ? `$${value.toLocaleString()}`
                  : value.toString()
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleExport = () => {
    if (!submission) return;
    
    const exportData = {
      submissionId: submission._id,
      formType: formType,
      formTitle: currentConfig.title,
      userId: submission.userId,
      formData: submission.formData,
      status: submission.status,
      progress: submission.progress,
      timestamps: {
        created: submission.createdAt,
        submitted: submission.submittedAt,
        lastModified: submission.lastModified
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formType}-submission-${submission._id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBackClick = () => {
    navigate(`/admin/forms/${formType}`);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading submission details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <h2>Error Loading Submission</h2>
        <p>{error}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={fetchSubmissionDetail} className="retry-btn">
            Retry
          </button>
          <button onClick={handleBackClick} className="back-btn">
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="detail-error">
        <h2>Submission Not Found</h2>
        <p>The requested submission could not be found.</p>
        <button onClick={handleBackClick} className="back-btn">
          Back to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className="submission-detail">
      {/* Header */}
      <header className="detail-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={handleBackClick} className="back-btn">
              ← Back to {currentConfig.title} Submissions
            </button>
            <div className="submission-title">
              <h1>{currentConfig.icon} {currentConfig.title} Details</h1>
              <p>Submission ID: <code>{submission._id}</code></p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleExport} className="export-btn">
              📥 Export Data
            </button>
            <button onClick={fetchSubmissionDetail} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">Status:</span>
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(submission.status) }}
          >
            {submission.status?.replace('-', ' ') || 'Unknown'}
          </span>
        </div>
        <div className="status-item">
          <span className="status-label">Progress:</span>
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
        </div>
        <div className="status-item">
          <span className="status-label">Last Modified:</span>
          <span className="status-value">
            {formatDate(submission.lastModified || submission.createdAt)}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📋 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'form-data' ? 'active' : ''}`}
          onClick={() => setActiveTab('form-data')}
        >
          📝 Form Data
        </button>
        <button 
          className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          ⏱️ Timeline
        </button>
        <button 
          className={`tab-btn ${activeTab === 'raw-data' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw-data')}
        >
          🔍 Raw Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="overview-grid">
              {/* User Information */}
              <div className="overview-section">
                <h3>👤 User Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">
                      {submission.userId?.name || 'Unknown User'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      {submission.userId?.email || 'No email provided'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">User ID:</span>
                    <span className="info-value">
                      <code>{submission.userId?._id || 'N/A'}</code>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">User Joined:</span>
                    <span className="info-value">
                      {submission.userId?.createdAt 
                        ? formatDate(submission.userId.createdAt)
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Information */}
              <div className="overview-section">
                <h3>{currentConfig.icon} Form Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Form Type:</span>
                    <span className="info-value">{currentConfig.title}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Form Name:</span>
                    <span className="info-value">
                      {submission.formName || currentConfig.title}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Description:</span>
                    <span className="info-value">{currentConfig.description}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Completion Status:</span>
                    <span className="info-value">
                      {submission.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submission Information */}
              <div className="overview-section">
                <h3>📊 Submission Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Created:</span>
                    <span className="info-value">
                      {formatDate(submission.createdAt)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Submitted:</span>
                    <span className="info-value">
                      {submission.submittedAt 
                        ? formatDate(submission.submittedAt)
                        : 'Not yet submitted'
                      }
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Saved:</span>
                    <span className="info-value">
                      {formatDate(submission.lastSaved || submission.lastModified)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Progress:</span>
                    <span className="info-value">
                      {submission.progress || 0}% Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'form-data' && (
          <div className="form-data-tab">
            {renderFormData(submission.formData, `${currentConfig.title} Form Data`)}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="timeline-tab">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker created"></div>
                <div className="timeline-content">
                  <h4>Submission Created</h4>
                  <p>{formatDate(submission.createdAt)}</p>
                  <small>Initial form submission was created by the user</small>
                </div>
              </div>
              
              {submission.lastModified && submission.lastModified !== submission.createdAt && (
                <div className="timeline-item">
                  <div className="timeline-marker modified"></div>
                  <div className="timeline-content">
                    <h4>Last Modified</h4>
                    <p>{formatDate(submission.lastModified)}</p>
                    <small>Form data was updated and saved</small>
                  </div>
                </div>
              )}
              
              {submission.submittedAt && (
                <div className="timeline-item">
                  <div className="timeline-marker submitted"></div>
                  <div className="timeline-content">
                    <h4>Submitted for Review</h4>
                    <p>{formatDate(submission.submittedAt)}</p>
                    <small>Form was officially submitted for admin review</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'raw-data' && (
          <div className="raw-data-tab">
            <div className="raw-data-section">
              <h3>Complete Submission Data (JSON Format)</h3>
              <pre className="raw-data-content">
                {JSON.stringify(submission, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetail;