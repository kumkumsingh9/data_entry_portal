import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubmissions: 0,
    completedSubmissions: 0,
    inProgressSubmissions: 0,
    completionRate: 0
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [statsResponse, submissionsResponse] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/submissions')
      ]);
      
      setStats(statsResponse.data.stats);
      setSubmissions(submissionsResponse.data.submissions);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button onClick={fetchData} className="refresh-btn">
              Refresh Data
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-content">
          {/* Statistics Cards */}
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

          {/* Recent Submissions */}
          <div className="submissions-section">
            <h2>Recent Submissions</h2>
            <div className="submissions-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Form Name</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Last Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No submissions yet
                      </td>
                    </tr>
                  ) : (
                    submissions.map((submission) => (
                      <tr key={submission._id}>
                        <td>
                          <div className="user-info">
                            <strong>{submission.userId?.name || 'Unknown User'}</strong>
                            <small>{submission.userId?.email || 'No email'}</small>
                          </div>
                        </td>
                        <td>{submission.formName}</td>
                        <td>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${submission.progress}%` }}
                            ></div>
                            <span>{submission.progress}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`status ${submission.isCompleted ? 'completed' : 'in-progress'}`}>
                            {submission.isCompleted ? 'Completed' : 'In Progress'}
                          </span>
                        </td>
                        <td>
                          {new Date(submission.lastSaved).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
