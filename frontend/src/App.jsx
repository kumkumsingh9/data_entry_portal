import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserForm from './components/UserForm';
import MSECreditAssessment from './components/MSECreditAssessment';
import OutputSheetForm from './components/OutputSheetForm';
import ExpertScorecardForm from './components/ExpertScorecardForm';
import FinancialAnalysisForm from './components/FinancialAnalysisForm';
import BankAnalysisForm from './components/BankAnalysisForm';
import CreditAppMemoForm from './components/CreditAppMemoForm';
import AdminDashboard from './components/admin/AdminDashboard';
import FormSubmissions from './components/admin/FormSubmissions';
import SubmissionDetail from './components/admin/SubmissionDetail';
import UserManagement from './components/admin/UserManagement';
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
            
            {/* Bank Analysis Route */}
            <Route 
              path="/bank-analysis" 
              element={
                <ProtectedRoute>
                  <BankAnalysisForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Credit App Memo Route */}
            <Route 
              path="/credit-app-memo" 
              element={
                <ProtectedRoute>
                  <CreditAppMemoForm />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* Admin User Management Route */}
            <Route 
              path="/admin/users" 
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } 
            />
            
            {/* Admin Form Submission Routes */}
            <Route 
              path="/admin/forms/:formType" 
              element={
                <AdminRoute>
                  <FormSubmissions />
                </AdminRoute>
              } 
            />
            
            {/* Admin Submission Detail Routes */}
            <Route 
              path="/admin/submissions/:formType/:submissionId" 
              element={
                <AdminRoute>
                  <SubmissionDetail />
                </AdminRoute>
              } 
            />
            
            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/form" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;