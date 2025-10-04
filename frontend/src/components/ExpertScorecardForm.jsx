import React, { useState, useEffect } from 'react';
import { 
  expertScorecardConfig, 
  calculateTotalScore, 
  getRiskCategory, 
  getParametersByCategory 
} from '../data/expertScorecardConfig';
import './ExpertScorecardForm.css';

const ExpertScorecardForm = () => {
  const [formData, setFormData] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [riskCategory, setRiskCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get categorized parameters
  const { qualitative, quantitative, qualitativeWeight, quantitativeWeight } = getParametersByCategory();

  // Calculate score and risk category whenever form data changes
  useEffect(() => {
    const score = calculateTotalScore(formData);
    const risk = getRiskCategory(score);
    setTotalScore(score);
    setRiskCategory(risk);
  }, [formData]);

  const handleInputChange = (parameterName, value) => {
    setFormData(prev => ({
      ...prev,
      [parameterName]: value
    }));
    
    // Clear error for this field
    if (errors[parameterName]) {
      setErrors(prev => ({
        ...prev,
        [parameterName]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    expertScorecardConfig.parameters.forEach(parameter => {
      if (parameter.required && !formData[parameter.name]) {
        newErrors[parameter.name] = `${parameter.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        totalScore,
        riskCategory: riskCategory.name,
        timestamp: new Date().toISOString(),
        assessmentType: 'Expert Scorecard'
      };
      
      console.log('Expert Scorecard Submission:', submissionData);
      
      // Here you would typically send to backend
      alert(`Expert Scorecard completed!\nTotal Score: ${totalScore}\nRisk Category: ${riskCategory.name}`);
    }
  };

  const resetForm = () => {
    setFormData({});
    setErrors({});
    setIsSubmitted(false);
  };

  const renderParameterSection = (parameters, sectionTitle, sectionWeight) => (
    <div className="scorecard-section">
      <h3 className="section-header">
        {sectionTitle}
        <span className="section-weight">Weight: {sectionWeight}%</span>
      </h3>
      
      {parameters.map((parameter) => (
        <div key={parameter.name} className="parameter-container">
          <div className="parameter-header">
            <label className="parameter-label">
              {parameter.label}
              {parameter.required && <span className="required">*</span>}
            </label>
            <span className="parameter-weight">{parameter.weight}%</span>
          </div>
          
          <select
            className={`parameter-select ${errors[parameter.name] ? 'error' : ''}`}
            value={formData[parameter.name] || ''}
            onChange={(e) => handleInputChange(parameter.name, e.target.value)}
          >
            <option value="">Select an option...</option>
            {parameter.options.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label} ({option.score} points)
              </option>
            ))}
          </select>
          
          {errors[parameter.name] && (
            <div className="error-message">{errors[parameter.name]}</div>
          )}
          
          <div className="parameter-rationale">
            <strong>Rationale:</strong> {parameter.rationale}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="expert-scorecard-container">
      <div className="scorecard-header">
        <h1>{expertScorecardConfig.title}</h1>
        <p className="scorecard-description">{expertScorecardConfig.description}</p>
      </div>

      {/* Score Summary Card */}
      <div className="score-summary-card">
        <div className="score-display">
          <div className="total-score">
            <h3>Total Score</h3>
            <div className="score-value">{totalScore}</div>
            <div className="score-range">out of 100</div>
          </div>
          
          {riskCategory && (
            <div 
              className="risk-category"
              style={{ 
                color: riskCategory.color,
                backgroundColor: riskCategory.backgroundColor 
              }}
            >
              <h4>{riskCategory.name}</h4>
              <p>{riskCategory.description}</p>
              <div className="score-range-info">
                Score Range: {riskCategory.range[0]}-{riskCategory.range[1]}
              </div>
            </div>
          )}
        </div>
        
        <div className="scoring-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min(totalScore, 100)}%`,
                backgroundColor: riskCategory?.color || '#6c757d'
              }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>30</span>
            <span>50</span>
            <span>70</span>
            <span>85</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="scorecard-form">
        {/* Qualitative Parameters Section */}
        {renderParameterSection(qualitative, "Qualitative Parameters", qualitativeWeight)}
        
        {/* Quantitative Parameters Section */}
        {renderParameterSection(quantitative, "Quantitative Parameters", quantitativeWeight)}
        
        {/* Sales Officer Comments Section */}
        <div className="scorecard-section">
          <h3 className="section-header">Sales Officer Assessment</h3>
          
          <div className="parameter-container">
            <label className="parameter-label">
              {expertScorecardConfig.salesOfficerField.label}
            </label>
            
            <textarea
              className="sales-officer-textarea"
              placeholder={expertScorecardConfig.salesOfficerField.placeholder}
              value={formData[expertScorecardConfig.salesOfficerField.name] || ''}
              onChange={(e) => handleInputChange(expertScorecardConfig.salesOfficerField.name, e.target.value)}
              maxLength={expertScorecardConfig.salesOfficerField.maxLength}
              rows={4}
            />
            
            <div className="char-count">
              {(formData[expertScorecardConfig.salesOfficerField.name] || '').length} / {expertScorecardConfig.salesOfficerField.maxLength} characters
            </div>
          </div>
        </div>

        {/* Risk Assessment Summary */}
        <div className="risk-assessment-summary">
          <h3>Risk Assessment Summary</h3>
          <div className="risk-grid">
            {Object.entries(expertScorecardConfig.riskCategories).map(([categoryName, categoryData]) => (
              <div 
                key={categoryName}
                className={`risk-item ${riskCategory?.name === categoryName ? 'active' : ''}`}
                style={{ borderColor: categoryData.color }}
              >
                <div className="risk-name" style={{ color: categoryData.color }}>
                  {categoryName}
                </div>
                <div className="risk-range">
                  {categoryData.range[0]}-{categoryData.range[1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="button" 
            onClick={resetForm}
            className="btn-secondary"
          >
            Reset Form
          </button>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
          </button>
        </div>
      </form>

      {/* Completion Status */}
      {isSubmitted && (
        <div className="submission-success">
          <h3>✅ Assessment Completed Successfully!</h3>
          <div className="submission-summary">
            <p><strong>Final Score:</strong> {totalScore} points</p>
            <p><strong>Risk Category:</strong> {riskCategory.name}</p>
            <p><strong>Recommendation:</strong> {riskCategory.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertScorecardForm;