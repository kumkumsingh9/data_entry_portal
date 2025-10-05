import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormSubmissions.css';

const MSEAssessmentSubmissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, in-progress, draft
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/admin/submissions/mse-assessment', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSubmissions(response.data.submissions || []);
      setError('');
    } catch (err) {
      console.error('Error fetching MSE submissions:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load MSE assessment submissions');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

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

  const handleViewDetails = (submissionId) => {
    navigate(`/admin/submissions/mse-assessment/${submissionId}`);
  };

  const handleDownload = (submissionId) => {
    // Implementation for downloading submission data
    console.log('Downloading submission:', submissionId);
  };

  if (loading) {
    return (
      <div className="submissions-loading">
        <div className="loading-spinner"></div>
        <p>Loading MSE Assessment submissions...</p>
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
              <h1>🏢 MSE Credit Assessment Submissions</h1>
              <p>Micro, Small & Medium Enterprise credit evaluation submissions</p>
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
            <div className="no-submissions-icon">📝</div>
            <h3>No submissions found</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No MSE assessment submissions have been made yet.'
              }
            </p>
          </div>
        ) : (
          <div className="submissions-table">
            <table>
              <thead>
                <tr>
                  <th>Submission ID</th>
                  <th>User Information</th>
                  <th>Business Details</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Submitted</th>
                  <th>Last Modified</th>
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
                      <div className="business-info">
                        <div className="business-name">
                          {submission.formData?.businessName || 'N/A'}
                        </div>
                        <div className="loan-amount">
                          {submission.formData?.loanAmount 
                            ? `$${Number(submission.formData.loanAmount).toLocaleString()}`
                            : 'N/A'
                          }
                        </div>
                      </div>
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
                          : 'Not submitted'
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

      {/* Pagination - if needed */}
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

export default MSEAssessmentSubmissions;