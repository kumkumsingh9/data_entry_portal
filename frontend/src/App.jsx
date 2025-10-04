import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserForm from './components/UserForm';
import MSECreditAssessment from './components/MSECreditAssessment';
import OutputSheetForm from './components/OutputSheetForm';
import ExpertScorecardForm from './components/ExpertScorecardForm';
import FinancialAnalysisForm from './components/FinancialAnalysisForm';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Admin Route Protection
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/form" 
              element={
                <ProtectedRoute>
                  <UserForm />
                </ProtectedRoute>
              } 
            />
            
            {/* MSE Credit Assessment Route */}
            <Route 
              path="/mse-assessment" 
              element={
                <ProtectedRoute>
                  <MSECreditAssessment />
                </ProtectedRoute>
              } 
            />
            
            {/* Output Sheet Analysis Route */}
            <Route 
              path="/output-analysis" 
              element={
                <ProtectedRoute>
                  <OutputSheetForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Expert Scorecard Route */}
            <Route 
              path="/expert-scorecard" 
              element={
                <ProtectedRoute>
                  <ExpertScorecardForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Financial Analysis Route */}
            <Route 
              path="/financial-analysis" 
              element={
                <ProtectedRoute>
                  <FinancialAnalysisForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/form" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/form" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;