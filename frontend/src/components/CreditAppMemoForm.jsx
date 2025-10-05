import React, { useState, useEffect } from 'react';
import { creditAppMemoConfig } from '../data/creditAppMemoConfig';
import './CreditAppMemoForm.css';

const CreditAppMemoForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [calculatedValues, setCalculatedValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Initialize form data
  useEffect(() => {
    const initialData = {};
    creditAppMemoConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type !== 'calculated') {
          initialData[field.id] = '';
        }
      });
    });
    setFormData(initialData);
  }, []);

  // Real-time calculations
  useEffect(() => {
    const newCalculatedValues = {};
    
    // Calculate all computed fields
    creditAppMemoConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'calculated' && creditAppMemoConfig.calculations[field.formula]) {
          newCalculatedValues[field.id] = creditAppMemoConfig.calculations[field.formula](formData);
        }
      });
    });
    
    setCalculatedValues(newCalculatedValues);
  }, [formData]);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateSection = (sectionIndex) => {
    const section = creditAppMemoConfig.sections[sectionIndex];
    const errors = {};
    
    section.fields.forEach(field => {
      if (field.required && field.type !== 'calculated') {
        const value = formData[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[field.id] = `${field.label} is required`;
        }
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, creditAppMemoConfig.sections.length - 1));
    }
  };

  const handlePrevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all sections
    let isValid = true;
    for (let i = 0; i < creditAppMemoConfig.sections.length; i++) {
      if (!validateSection(i)) {
        isValid = false;
        setCurrentSection(i);
        break;
      }
    }
    
    if (isValid) {
      const submissionData = {
        ...formData,
        calculatedValues,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Credit App Memo Submitted:', submissionData);
      alert('Credit Application Memo submitted successfully!');
    }
  };

  const formatValue = (value, format) => {
    if (value === null || value === undefined || isNaN(value)) return '0';
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'ratio':
        return `${Number(value).toFixed(2)}:1`;
      case 'text':
        return String(value);
      default:
        return Number(value).toFixed(2);
    }
  };

  const renderField = (field) => {
    const value = field.type === 'calculated' ? calculatedValues[field.id] : formData[field.id];
    const hasError = validationErrors[field.id];

    if (field.type === 'calculated') {
      return (
        <div key={field.id} className="form-field calculated-field">
          <label className="field-label calculated-label">
            {field.label}
          </label>
          <div className="calculated-value">
            {formatValue(value, field.format)}
          </div>
        </div>
      );
    }

    return (
      <div key={field.id} className={`form-field ${hasError ? 'field-error' : ''} ${field.type === 'textarea' ? 'textarea-field' : ''}`}>
        <label className="field-label">
          {field.label}
          {field.required && <span className="required-indicator">*</span>}
        </label>
        
        {field.type === 'select' ? (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="form-input form-select"
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="form-input form-textarea"
          />
        ) : field.type === 'currency' ? (
          <input
            type="number"
            min="0"
            step="0.01"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="form-input currency-input"
          />
        ) : field.type === 'percentage' ? (
          <input
            type="number"
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 0.01}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="form-input percentage-input"
          />
        ) : field.type === 'date' ? (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="form-input date-input"
          />
        ) : (
          <input
            type={field.type === 'number' ? 'number' : 'text'}
            min={field.min}
            max={field.max}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="form-input"
          />
        )}
        
        {hasError && (
          <div className="error-message">{hasError}</div>
        )}
      </div>
    );
  };

  const currentSectionData = creditAppMemoConfig.sections[currentSection];
  const isLastSection = currentSection === creditAppMemoConfig.sections.length - 1;

  // Separate calculated fields for display
  const inputFields = currentSectionData.fields.filter(field => field.type !== 'calculated');
  const calculatedFields = currentSectionData.fields.filter(field => field.type === 'calculated');

  return (
    <div className="credit-app-memo-form">
      <div className="form-header">
        <h1 className="form-title">{creditAppMemoConfig.title}</h1>
        <p className="form-description">{creditAppMemoConfig.description}</p>
        
        <div className="section-progress">
          {creditAppMemoConfig.sections.map((section, index) => (
            <div
              key={section.id}
              className={`progress-step ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{section.title}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">{currentSectionData.title}</h2>
            <p className="section-description">{currentSectionData.description}</p>
          </div>

          <div className="section-content">
            {/* Input Fields */}
            {inputFields.length > 0 && (
              <div className="fields-container">
                <div className={`fields-grid ${currentSectionData.id === 'qualitative-assessment' ? 'single-column' : 'multi-column'}`}>
                  {inputFields.map(renderField)}
                </div>
              </div>
            )}
            
            {/* Calculated Fields (if any in this section) */}
            {calculatedFields.length > 0 && (
              <div className="calculated-fields-container">
                <h3 className="calculated-section-title">Calculated Risk Metrics</h3>
                <div className="calculated-fields-grid">
                  {calculatedFields.map(renderField)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-navigation">
          <button
            type="button"
            onClick={handlePrevSection}
            disabled={currentSection === 0}
            className="nav-button prev-button"
          >
            Previous
          </button>
          
          {!isLastSection ? (
            <button
              type="button"
              onClick={handleNextSection}
              className="nav-button next-button"
            >
              Next Section
            </button>
          ) : (
            <button type="submit" className="nav-button submit-button">
              Submit Credit Application
            </button>
          )}
        </div>
      </form>

      {/* Summary Panel */}
      {Object.keys(calculatedValues).length > 0 && (
        <div className="calculation-summary">
          <h3>Credit Assessment Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Estimated EMI:</span>
              <span className="summary-value">
                {formatValue(calculatedValues.emiAmount, 'currency')}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">DBR Percentage:</span>
              <span className="summary-value">
                {formatValue(calculatedValues.dbrPercentage, 'percentage')}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Asset Coverage:</span>
              <span className="summary-value">
                {formatValue(calculatedValues.assetCoverage, 'ratio')}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Risk Category:</span>
              <span className="summary-value">
                {calculatedValues.riskCategory || 'Not Assessed'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Loan to Value:</span>
              <span className="summary-value">
                {formatValue(calculatedValues.loanToValueRatio, 'percentage')}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Deviation Code:</span>
              <span className="summary-value">
                {calculatedValues.deviationCode || 'No Deviation'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditAppMemoForm;