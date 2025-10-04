import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/admin/login', formData);
      const { token, user } = response.data;
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Admin login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>System Administrator Access</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@dataentry.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="admin-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="admin-footer">
          <p>
            <a href="/" className="back-link">
              ← Back to User Portal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
