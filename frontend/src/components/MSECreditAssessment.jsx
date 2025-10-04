import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mseFormConfig } from '../data/mseFormConfig';
import FormNavigation from './FormNavigation';
import axios from 'axios';
import './MSECreditAssessment.css';

const MSECreditAssessment = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(mseFormConfig.totalSteps);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get('/api/form/data/MSE-Credit-Assessment-Excel');
      const data = response.data.formData;
      setFormData(data.responses || {});
      setCurrentStep(data.currentStep || 1);
      setTotalSteps(mseFormConfig.totalSteps);
    } catch (error) {
      console.error('Error fetching form data:', error);
      // Initialize empty form if no data exists
      setFormData({});
      setCurrentStep(1);
      setTotalSteps(mseFormConfig.totalSteps);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate total monthly income when business income or other income changes
    if (field === 'primaryBusinessIncome' || field === 'totalOtherIncome') {
      const businessIncome = parseFloat(field === 'primaryBusinessIncome' ? value : formData.primaryBusinessIncome || 0);
      const otherIncome = parseFloat(field === 'totalOtherIncome' ? value : formData.totalOtherIncome || 0);
      setFormData(prev => ({
        ...prev,
        [field]: value,
        totalMonthlyIncome: businessIncome + otherIncome
      }));
    }

    // Auto-calculate total other income
    if (['agricultureIncome', 'rentalIncome', 'salaryIncome', 'alliedAgriIncome', 'otherInterestIncome', 'applicantGuarantorOtherIncome'].includes(field)) {
      const agricultureIncome = parseFloat(field === 'agricultureIncome' ? value : formData.agricultureIncome || 0);
      const rentalIncome = parseFloat(field === 'rentalIncome' ? value : formData.rentalIncome || 0);
      const salaryIncome = parseFloat(field === 'salaryIncome' ? value : formData.salaryIncome || 0);
      const alliedAgriIncome = parseFloat(field === 'alliedAgriIncome' ? value : formData.alliedAgriIncome || 0);
      const otherInterestIncome = parseFloat(field === 'otherInterestIncome' ? value : formData.otherInterestIncome || 0);
      const applicantGuarantorOtherIncome = parseFloat(field === 'applicantGuarantorOtherIncome' ? value : formData.applicantGuarantorOtherIncome || 0);
      
      const totalOther = agricultureIncome + rentalIncome + salaryIncome + alliedAgriIncome + otherInterestIncome + applicantGuarantorOtherIncome;
      
      setFormData(prev => ({
        ...prev,
        [field]: value,
        totalOtherIncome: totalOther,
        totalMonthlyIncome: parseFloat(prev.primaryBusinessIncome || 0) + totalOther
      }));
    }

    // Auto-calculate average daily sales
    if (['lastMonthSales5th', 'lastMonthSales15th', 'lastMonthSales25th', 'twoMonthsSales5th', 'twoMonthsSales15th', 'twoMonthsSales25th', 'threeMonthsSales5th', 'threeMonthsSales15th', 'threeMonthsSales25th'].includes(field)) {
      const sales = [
        'lastMonthSales5th', 'lastMonthSales15th', 'lastMonthSales25th',
        'twoMonthsSales5th', 'twoMonthsSales15th', 'twoMonthsSales25th',
        'threeMonthsSales5th', 'threeMonthsSales15th', 'threeMonthsSales25th'
      ];
      
      const updatedFormData = { ...formData, [field]: value };
      const totalSales = sales.reduce((sum, salesField) => {
        return sum + parseFloat(updatedFormData[salesField] || 0);
      }, 0);
      
      const averageDaily = totalSales / 9; // 9 data points
      
      setFormData(prev => ({
        ...prev,
        [field]: value,
        averageDailySales: averageDaily.toFixed(2)
      }));
    }
  };

  const saveFormData = async () => {
    setSaving(true);
    setMessage('');

    try {
      await axios.post('/api/form/save', {
        formName: 'MSE-Credit-Assessment-Excel',
        responses: formData,
        currentStep,
        totalSteps: mseFormConfig.totalSteps,
        isCompleted: currentStep === mseFormConfig.totalSteps
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
    const currentStepFields = mseFormConfig.steps[currentStep - 1]?.fields || [];
    const requiredFields = currentStepFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => {
      // Check if field should be shown based on conditional logic
      if (field.conditional && formData[field.conditional] !== field.conditionalValue) {
        return false; // Field is not required if conditional is not met
      }
      return !formData[field.name] || formData[field.name] === '';
    });

    // Custom validations
    const customValidationErrors = [];
    
    // Check custom validation rules
    for (const [fieldName, rule] of Object.entries(mseFormConfig.validationRules)) {
      if (formData[fieldName] && rule.validate && !rule.validate(formData)) {
        customValidationErrors.push({ name: fieldName, label: rule.message });
      }
    }

    return [...missingFields, ...customValidationErrors];
  };

  const nextStep = () => {
    const missingFields = validateCurrentStep();
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label || field.message).join(', ');
      setMessage(`Please resolve the following: ${fieldNames}`);
      return;
    }

    if (currentStep < mseFormConfig.totalSteps) {
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
    const missingFields = validateCurrentStep();
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label || field.message).join(', ');
      setMessage(`Please resolve the following: ${fieldNames}`);
      return;
    }

    setSaving(true);
    try {
      await axios.post('/api/form/submit', {
        formName: 'MSE-Credit-Assessment-Excel',
        responses: formData,
        currentStep,
        totalSteps: mseFormConfig.totalSteps,
        isCompleted: true,
        submittedAt: new Date().toISOString()
      });

      setMessage('MSE Credit Assessment submitted successfully!');
    } catch (error) {
      setMessage('Error submitting form');
      console.error('Submit error:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field) => {
    const shouldShow = !field.conditional || formData[field.conditional] === field.conditionalValue;
    
    if (!shouldShow) return null;

    const fieldValue = formData[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
              min={field.min}
              max={field.max}
              step={field.step || 1}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <select
              id={field.name}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="radio-group">
              {field.options?.map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    checked={fieldValue === option}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name={field.name}
                checked={fieldValue === true || fieldValue === 'true'}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
              />
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
              rows={3}
            />
          </div>
        );

      case 'tel':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="tel"
              id={field.name}
              name={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading MSE Credit Assessment...</p>
      </div>
    );
  }

  const currentStepData = mseFormConfig.steps[currentStep - 1];
  const progressPercentage = (currentStep / mseFormConfig.totalSteps) * 100;

  return (
    <div className="mse-form">
      <FormNavigation />
      <header className="form-header">
        <div className="header-content">
          <h1>MSE Credit Assessment (Excel Based)</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="form-main">
        <div className="form-container">
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p>Step {currentStep} of {totalSteps} - {progressPercentage.toFixed(0)}% Complete</p>
          </div>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-content">
            <div className="form-step">
              <h2>{currentStepData?.title}</h2>
              {currentStepData?.description && (
                <p className="step-description">{currentStepData.description}</p>
              )}
              
              <div className="form-fields">
                {currentStepData?.fields?.map(renderField)}
              </div>
            </div>
          </div>

          <div className="form-navigation">
            <div className="nav-left">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="nav-center">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={saveFormData}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Progress'}
              </button>
            </div>
            
            <div className="nav-right">
              {currentStep < totalSteps ? (
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={submitForm}
                  disabled={saving}
                >
                  {saving ? 'Submitting...' : 'Submit Assessment'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MSECreditAssessment;