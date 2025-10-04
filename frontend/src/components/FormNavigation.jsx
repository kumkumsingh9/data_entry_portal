import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './FormNavigation.css';

const FormNavigation = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <div className="form-navigation-bar">
      <div className="nav-content">
        <div className="nav-links">
          <Link 
            to="/form" 
            className={`nav-link ${location.pathname === '/form' ? 'active' : ''}`}
          >
            <span className="nav-icon">📋</span>
            Standard Form
          </Link>
          <Link 
            to="/mse-assessment" 
            className={`nav-link ${location.pathname === '/mse-assessment' ? 'active' : ''}`}
          >
            <span className="nav-icon">💼</span>
            MSE Credit Assessment
          </Link>
          <Link 
            to="/output-analysis" 
            className={`nav-link ${location.pathname === '/output-analysis' ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            Cash Flow Analysis
          </Link>
          <Link 
            to="/expert-scorecard" 
            className={`nav-link ${location.pathname === '/expert-scorecard' ? 'active' : ''}`}
          >
            <span className="nav-icon">🎯</span>
            Expert Scorecard
          </Link>
          <Link 
            to="/financial-analysis" 
            className={`nav-link ${location.pathname === '/financial-analysis' ? 'active' : ''}`}
          >
            <span className="nav-icon">💼</span>
            Financial Analysis {'>'} $50K
          </Link>
        </div>
        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;