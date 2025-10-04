import React, { useState, useEffect } from 'react';
import { outputFormSections, calculationFormulas } from '../data/outputFormConfig';
import FormNavigation from './FormNavigation';
import './OutputSheetForm.css';

const OutputSheetForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedFields, setCalculatedFields] = useState({});
  
  const totalSteps = outputFormSections.length;

  // Auto-calculate fields when relevant data changes
  useEffect(() => {
    const newCalculatedFields = {};
    
    // Calculate derived fields
    Object.entries(calculationFormulas).forEach(([fieldName, formula]) => {
      try {
        const calculatedValue = formula(formData);
        if (!isNaN(calculatedValue) && calculatedValue !== null) {
          newCalculatedFields[fieldName] = calculatedValue;
        }
      } catch (error) {
        console.error(`Error calculating ${fieldName}:`, error);
      }
    });
    
    setCalculatedFields(newCalculatedFields);
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value === '' ? '' : parseFloat(value) || 0) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    const currentSection = outputFormSections[currentStep - 1];
    const stepErrors = {};
    let isValid = true;

    currentSection.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        if (!value && value !== 0) {
          stepErrors[field.name] = `${field.label} is required`;
          isValid = false;
        }
      }

      // Type-specific validation
      if (field.type === 'number' && formData[field.name] !== undefined) {
        const numValue = parseFloat(formData[field.name]);
        
        if (field.min !== undefined && numValue < field.min) {
          stepErrors[field.name] = `Value must be at least ${field.min}`;
          isValid = false;
        }
        
        if (field.max !== undefined && numValue > field.max) {
          stepErrors[field.name] = `Value must be at most ${field.max}`;
          isValid = false;
        }
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  // Navigation functions
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        ...calculatedFields,
        timestamp: new Date().toISOString(),
        formType: 'output_sheet_analysis'
      };

      // API call would go here
      console.log('Submitting Output Sheet Analysis:', submitData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Output Sheet Analysis submitted successfully!');
      
      // Reset form
      setFormData({});
      setCurrentStep(1);
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form field
  const renderField = (field) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];
    const calculatedValue = calculatedFields[field.name];
    
    // Show calculated value if available
    const displayValue = calculatedValue !== undefined ? calculatedValue : value;
    const isCalculated = calculatedValue !== undefined;

    return (
      <div key={field.name} className={`form-field ${error ? 'error' : ''}`}>
        <label htmlFor={field.name}>
          {field.label}
          {field.required && <span className="required">*</span>}
          {isCalculated && <span className="calculated-badge">Auto-calculated</span>}
        </label>
        
        {field.type === 'select' ? (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={handleInputChange}
            required={field.required}
            disabled={isCalculated}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={displayValue}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            step={field.step}
            disabled={isCalculated}
            className={isCalculated ? 'calculated-field' : ''}
          />
        )}
        
        {error && <span className="error-message">{error}</span>}
        {isCalculated && (
          <span className="calculation-note">
            This field is automatically calculated based on your inputs
          </span>
        )}
      </div>
    );
  };

  // Get current section
  const currentSection = outputFormSections[currentStep - 1];

  return (
    <>
      <FormNavigation />
      <div className="output-sheet-form">
        <div className="form-header">
        <h2>Output Sheet Analysis - Cash Flow & Loan Calculations</h2>
        <p>Complete the cash flow analysis to determine loan eligibility and repayment capacity</p>
      </div>

      {/* Progress indicator */}
      <div className="progress-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="step-indicators">
          {outputFormSections.map((section) => (
            <button
              key={section.id}
              className={`step-indicator ${currentStep === section.id ? 'active' : ''} ${
                currentStep > section.id ? 'completed' : ''
              }`}
              onClick={() => handleStepClick(section.id)}
            >
              <span className="step-number">{section.id}</span>
              <span className="step-title">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current section */}
      <div className="form-section">
        <div className="section-header">
          <h3>{currentSection.title}</h3>
          <p>{currentSection.description}</p>
          <div className="section-progress">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <div className="form-grid">
          {currentSection.fields.map(renderField)}
        </div>
      </div>

      {/* Calculated values summary */}
      {Object.keys(calculatedFields).length > 0 && (
        <div className="calculations-summary">
          <h4>Auto-Calculated Values</h4>
          <div className="calculations-grid">
            {Object.entries(calculatedFields).map(([key, value]) => (
              <div key={key} className="calculation-item">
                <span className="calculation-label">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="calculation-value">
                  {typeof value === 'number' ? value.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) : value}
                  {key.includes('margin') || key.includes('percent') ? '%' : ' USD'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="form-navigation">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="nav-button prev-button"
        >
          ← Previous
        </button>

        <div className="nav-info">
          <span>Step {currentStep} of {totalSteps}</span>
        </div>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="nav-button next-button"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="nav-button submit-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Analysis'}
          </button>
        )}
      </div>

      {/* Form summary */}
      <div className="form-summary">
        <h4>Analysis Progress Summary</h4>
        <div className="summary-items">
          {outputFormSections.map((section) => {
            const completedFields = section.fields.filter(field => 
              formData[field.name] !== undefined && formData[field.name] !== ''
            ).length;
            const totalFields = section.fields.length;
            
            return (
              <div key={section.id} className="summary-item">
                <span className="summary-section">{section.title}</span>
                <span className="summary-progress">
                  {completedFields}/{totalFields} fields completed
                </span>
                <div className="summary-bar">
                  <div 
                    className="summary-fill"
                    style={{ width: `${(completedFields / totalFields) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
};

export default OutputSheetForm;