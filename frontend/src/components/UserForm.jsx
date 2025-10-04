import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { formConfig } from '../data/formConfig';
import FormNavigation from './FormNavigation';
import axios from 'axios';
import './UserForm.css';

const UserForm = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(formConfig.totalSteps);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get('/api/form/data/MSE-Credit-Assessment');
      const data = response.data.formData;
      setFormData(data.responses || {});
      setCurrentStep(data.currentStep || 1);
      setTotalSteps(formConfig.totalSteps); // Always use formConfig totalSteps
    } catch (error) {
      console.error('Error fetching form data:', error);
      // Initialize empty form if no data exists
      setFormData({});
      setCurrentStep(1);
      setTotalSteps(formConfig.totalSteps);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveFormData = async () => {
    setSaving(true);
    setMessage('');

    try {
      await axios.post('/api/form/save', {
        formName: 'MSE-Credit-Assessment',
        responses: formData,
        currentStep,
        totalSteps: totalSteps,
        isCompleted: currentStep === totalSteps
      });

      setMessage('Form data saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving form data');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const validateCurrentStep = () => {
    const currentStepFields = formConfig.steps[currentStep - 1]?.fields || [];
    const requiredFields = currentStepFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => {
      // Check if field should be shown based on conditional logic
      if (field.conditional && formData[field.conditional] !== field.conditionalValue) {
        return false; // Field is not required if conditional is not met
      }
      return !formData[field.name] || formData[field.name] === '';
    });

    return missingFields;
  };

  const nextStep = () => {
    const missingFields = validateCurrentStep();
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label).join(', ');
      setMessage(`Please fill in the following required fields: ${fieldNames}`);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      saveFormData();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitForm = async () => {
    // Validate all steps before submission
    let allMissingFields = [];
    
    for (let step = 1; step <= totalSteps; step++) {
      const stepFields = formConfig.steps[step - 1]?.fields || [];
      const requiredFields = stepFields.filter(field => field.required);
      const missingFields = requiredFields.filter(field => {
        if (field.conditional && formData[field.conditional] !== field.conditionalValue) {
          return false;
        }
        return !formData[field.name] || formData[field.name] === '';
      });
      allMissingFields = [...allMissingFields, ...missingFields];
    }

    if (allMissingFields.length > 0) {
      const fieldNames = allMissingFields.map(field => field.label).join(', ');
      setMessage(`Please complete all required fields before submitting: ${fieldNames}`);
      return;
    }

    setSaving(true);
    try {
      await axios.post('/api/form/save', {
        formName: 'MSE-Credit-Assessment',
        responses: formData,
        currentStep,
        totalSteps: totalSteps,
        isCompleted: true
      });

      setMessage('Form submitted successfully!');
      // Redirect to success page or dashboard
    } catch (error) {
      setMessage('Error submitting form');
      console.error('Submit error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <div className="user-form">
      <FormNavigation />
      <header className="form-header">
        <div className="header-content">
          <h1>MSE Credit Assessment Form v{formConfig.version}</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="form-main">
        <div className="form-container">
          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <p>Step {currentStep} of {totalSteps} - {formConfig.steps[currentStep - 1]?.title}</p>
            
            {/* Step Indicators */}
            <div className="step-indicators">
              {formConfig.steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`step-indicator ${currentStep === index + 1 ? 'active' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}
                >
                  <span className="step-number">{index + 1}</span>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          {/* Form Content */}
          <div className="form-content">
            <div className="form-step">
              <h2>Step {currentStep}: {formConfig.steps[currentStep - 1]?.title}</h2>
              
              <div className="form-fields">
                {formConfig.steps[currentStep - 1]?.fields.map((field) => {
                  // Check if field should be shown based on conditional logic
                  if (field.conditional && formData[field.conditional] !== field.conditionalValue) {
                    return null;
                  }

                  return (
                    <div key={field.name} className="form-group">
                      <label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'radio' ? (
                        <div className="radio-group">
                          {field.options.map((option) => (
                            <label key={option} className="radio-option">
                              <input
                                type="radio"
                                name={field.name}
                                value={option}
                                checked={formData[field.name] === option}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                required={field.required}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required={field.required}
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required={field.required}
                          step={field.step}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 1}
              className="nav-btn prev-btn"
            >
              ← Previous
            </button>

            <div className="nav-center">
              <button 
                onClick={saveFormData}
                disabled={saving}
                className="save-btn"
              >
                {saving ? 'Saving...' : 'Save Progress'}
              </button>
            </div>

            {currentStep === totalSteps ? (
              <button 
                onClick={submitForm}
                disabled={saving}
                className="nav-btn submit-btn"
              >
                {saving ? 'Submitting...' : 'Submit Form ✓'}
              </button>
            ) : (
              <button 
                onClick={nextStep}
                className="nav-btn next-btn"
              >
                Next →
              </button>
            )}
          </div>

          {/* Step Summary */}
          <div className="step-summary">
            <h3>Form Progress</h3>
            <div className="step-list">
              {formConfig.steps.map((step, index) => (
                <div key={index} className={`step-item ${currentStep === index + 1 ? 'current' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-name">{step.title}</span>
                  {currentStep > index + 1 && <span className="step-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserForm;
