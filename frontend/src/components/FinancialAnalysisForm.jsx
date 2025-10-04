import React, { useState, useEffect } from 'react';
import { financialAnalysisConfig, financialCalculations } from '../data/financialAnalysisConfig';
import './FinancialAnalysisForm.css';

const FinancialAnalysisForm = () => {
  const [formData, setFormData] = useState({
    loan_amount: 50000  // Default minimum amount
  });
  const [calculatedValues, setCalculatedValues] = useState({});
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate all financial metrics whenever form data changes
  useEffect(() => {
    const newCalculatedValues = {};
    
    // P&L Calculations
    newCalculatedValues.totalOperatingIncome2025 = financialCalculations.totalOperatingIncome(formData);
    newCalculatedValues.totalCogs2025 = financialCalculations.totalCogs(formData);
    newCalculatedValues.totalIndirectExpenses2025 = financialCalculations.totalIndirectExpenses(formData);
    newCalculatedValues.ebitda2025 = financialCalculations.ebitda(formData);
    newCalculatedValues.ebit2025 = financialCalculations.ebit(formData);
    newCalculatedValues.pat2025 = financialCalculations.pat(formData);
    
    // Balance Sheet Calculations
    newCalculatedValues.netWorth2025 = financialCalculations.netWorth(formData);
    newCalculatedValues.totalCurrentAssets2025 = financialCalculations.totalCurrentAssets(formData);
    newCalculatedValues.totalCurrentLiabilities2025 = financialCalculations.totalCurrentLiabilities(formData);
    
    // Financial Ratios
    newCalculatedValues.currentRatio = financialCalculations.currentRatio(formData);
    newCalculatedValues.debtorDays = financialCalculations.debtorDays(formData);
    newCalculatedValues.inventoryDays = financialCalculations.inventoryDays(formData);
    newCalculatedValues.creditorDays = financialCalculations.creditorDays(formData);
    newCalculatedValues.cashConversionCycle = financialCalculations.cashConversionCycle(formData);
    
    // Personal Net Worth
    newCalculatedValues.totalPersonalAssets = financialCalculations.totalPersonalAssets(formData);
    newCalculatedValues.totalPersonalLiabilities = financialCalculations.totalPersonalLiabilities(formData);
    newCalculatedValues.personalNetWorth = financialCalculations.personalNetWorth(formData);
    newCalculatedValues.assetLiabilityCoverageRatio = financialCalculations.assetLiabilityCoverageRatio(formData);
    
    // Working Capital Assessment
    newCalculatedValues.workingCapitalGap = financialCalculations.workingCapitalGap(formData);
    newCalculatedValues.customerMarginPercent = financialCalculations.customerMarginPercent(formData);
    
    // Growth calculations (if both years data available)
    if (formData.sales_actual_2024 && formData.sales_projected_2025) {
      const salesGrowth = ((parseFloat(formData.sales_projected_2025) - parseFloat(formData.sales_actual_2024)) / parseFloat(formData.sales_actual_2024)) * 100;
      newCalculatedValues.salesGrowth2025 = salesGrowth;
    }
    
    setCalculatedValues(newCalculatedValues);
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validateSection = (sectionIndex) => {
    const section = financialAnalysisConfig.sections[sectionIndex];
    const newErrors = {};
    
    section.fields.forEach(field => {
      if (field.required && (!formData[field.name] || parseFloat(formData[field.name] || 0) <= 0)) {
        newErrors[field.name] = `${field.label} is required and must be greater than 0`;
      }
    });
    
    // Special validation for loan amount
    if (sectionIndex === 3 && formData.loan_amount && parseFloat(formData.loan_amount) <= 50000) {
      newErrors.loan_amount = "Loan amount must be greater than $50,000";
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAllSections = () => {
    let allValid = true;
    financialAnalysisConfig.sections.forEach((_, index) => {
      if (!validateSection(index)) {
        allValid = false;
      }
    });
    return allValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAllSections()) {
      setIsSubmitted(true);
      
      // Prepare comprehensive submission data
      const submissionData = {
        ...formData,
        calculatedValues,
        currency: financialAnalysisConfig.currency,
        timestamp: new Date().toISOString(),
        assessmentType: 'Financial Analysis >$50000',
        totalInputFields: Object.keys(formData).length,
        totalCalculatedFields: Object.keys(calculatedValues).length
      };
      
      console.log('Financial Analysis Submission:', submissionData);
      alert(`Financial Analysis completed successfully!\nTotal Input Fields: ${Object.keys(formData).length}\nLoan Amount: ${financialAnalysisConfig.currency} ${parseFloat(formData.loan_amount || 0).toLocaleString()}`);
    } else {
      alert('Please fill all required fields before submitting.');
    }
  };

  const resetForm = () => {
    setFormData({ loan_amount: 50000 });
    setErrors({});
    setIsSubmitted(false);
    setActiveSection(0);
  };

  const nextSection = () => {
    if (validateSection(activeSection)) {
      setActiveSection(prev => Math.min(prev + 1, financialAnalysisConfig.sections.length - 1));
    }
  };

  const prevSection = () => {
    setActiveSection(prev => Math.max(prev - 1, 0));
  };

  const formatCurrency = (value) => {
    if (!value) return '0';
    return parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const renderField = (field) => (
    <div key={field.name} className="field-container">
      <div className="field-header">
        <label className="field-label">
          {field.label}
          {field.required && <span className="required">*</span>}
        </label>
        {field.helpText && (
          <div className="field-help" title={field.helpText}>ℹ️</div>
        )}
      </div>
      
      <div className="currency-input-container">
        <span className="currency-symbol">{financialAnalysisConfig.currency}</span>
        <input
          type="number"
          className={`currency-input ${errors[field.name] ? 'error' : ''}`}
          value={formData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          min="0"
          step="0.01"
        />
      </div>
      
      {errors[field.name] && (
        <div className="error-message">{errors[field.name]}</div>
      )}
      
      {field.helpText && (
        <div className="field-description">{field.helpText}</div>
      )}
    </div>
  );

  const renderCalculationSummary = () => (
    <div className="calculation-summary">
      <h3>📊 Financial Summary & Calculations</h3>
      
      <div className="calc-grid">
        {/* P&L Summary */}
        <div className="calc-section">
          <h4>Profit & Loss (2025)</h4>
          <div className="calc-items">
            <div className="calc-item">
              <span>Total Operating Income:</span>
              <span className="calc-value positive">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalOperatingIncome2025)}</span>
            </div>
            <div className="calc-item">
              <span>Total Cost of Goods Sold:</span>
              <span className="calc-value negative">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalCogs2025)}</span>
            </div>
            <div className="calc-item">
              <span>EBITDA:</span>
              <span className={`calc-value ${calculatedValues.ebitda2025 >= 0 ? 'positive' : 'negative'}`}>
                {financialAnalysisConfig.currency} {formatCurrency(calculatedValues.ebitda2025)}
              </span>
            </div>
            <div className="calc-item">
              <span>EBIT:</span>
              <span className={`calc-value ${calculatedValues.ebit2025 >= 0 ? 'positive' : 'negative'}`}>
                {financialAnalysisConfig.currency} {formatCurrency(calculatedValues.ebit2025)}
              </span>
            </div>
            <div className="calc-item highlight">
              <span>PAT:</span>
              <span className={`calc-value ${calculatedValues.pat2025 >= 0 ? 'positive' : 'negative'}`}>
                {financialAnalysisConfig.currency} {formatCurrency(calculatedValues.pat2025)}
              </span>
            </div>
          </div>
        </div>

        {/* Balance Sheet Summary */}
        <div className="calc-section">
          <h4>Balance Sheet (2025)</h4>
          <div className="calc-items">
            <div className="calc-item">
              <span>Net Worth:</span>
              <span className="calc-value positive">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.netWorth2025)}</span>
            </div>
            <div className="calc-item">
              <span>Total Current Assets:</span>
              <span className="calc-value">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalCurrentAssets2025)}</span>
            </div>
            <div className="calc-item">
              <span>Total Current Liabilities:</span>
              <span className="calc-value">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalCurrentLiabilities2025)}</span>
            </div>
            <div className="calc-item highlight">
              <span>Current Ratio:</span>
              <span className={`calc-value ${calculatedValues.currentRatio >= 1.5 ? 'positive' : calculatedValues.currentRatio >= 1 ? 'neutral' : 'negative'}`}>
                {calculatedValues.currentRatio?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Ratios */}
        <div className="calc-section">
          <h4>Key Ratios</h4>
          <div className="calc-items">
            <div className="calc-item">
              <span>Debtor Days:</span>
              <span className="calc-value">{calculatedValues.debtorDays?.toFixed(0) || '0'} days</span>
            </div>
            <div className="calc-item">
              <span>Inventory Days:</span>
              <span className="calc-value">{calculatedValues.inventoryDays?.toFixed(0) || '0'} days</span>
            </div>
            <div className="calc-item">
              <span>Creditor Days:</span>
              <span className="calc-value">{calculatedValues.creditorDays?.toFixed(0) || '0'} days</span>
            </div>
            <div className="calc-item highlight">
              <span>Cash Conversion Cycle:</span>
              <span className={`calc-value ${calculatedValues.cashConversionCycle <= 90 ? 'positive' : calculatedValues.cashConversionCycle <= 120 ? 'neutral' : 'negative'}`}>
                {calculatedValues.cashConversionCycle?.toFixed(0) || '0'} days
              </span>
            </div>
          </div>
        </div>

        {/* Personal Net Worth */}
        <div className="calc-section">
          <h4>Personal Net Worth</h4>
          <div className="calc-items">
            <div className="calc-item">
              <span>Total Assets:</span>
              <span className="calc-value positive">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalPersonalAssets)}</span>
            </div>
            <div className="calc-item">
              <span>Total Liabilities:</span>
              <span className="calc-value negative">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.totalPersonalLiabilities)}</span>
            </div>
            <div className="calc-item highlight">
              <span>Net Worth:</span>
              <span className={`calc-value ${calculatedValues.personalNetWorth >= 0 ? 'positive' : 'negative'}`}>
                {financialAnalysisConfig.currency} {formatCurrency(calculatedValues.personalNetWorth)}
              </span>
            </div>
            <div className="calc-item">
              <span>Asset Coverage Ratio:</span>
              <span className={`calc-value ${calculatedValues.assetLiabilityCoverageRatio >= 2 ? 'positive' : calculatedValues.assetLiabilityCoverageRatio >= 1.5 ? 'neutral' : 'negative'}`}>
                {calculatedValues.assetLiabilityCoverageRatio?.toFixed(2) || '0.00'}x
              </span>
            </div>
          </div>
        </div>

        {/* Loan Assessment */}
        <div className="calc-section">
          <h4>Loan Assessment</h4>
          <div className="calc-items">
            <div className="calc-item">
              <span>Working Capital Gap:</span>
              <span className="calc-value">{financialAnalysisConfig.currency} {formatCurrency(calculatedValues.workingCapitalGap)}</span>
            </div>
            <div className="calc-item">
              <span>Loan Amount Required:</span>
              <span className="calc-value highlight">{financialAnalysisConfig.currency} {formatCurrency(formData.loan_amount)}</span>
            </div>
            <div className="calc-item highlight">
              <span>Customer Margin %:</span>
              <span className={`calc-value ${calculatedValues.customerMarginPercent >= 25 ? 'positive' : calculatedValues.customerMarginPercent >= 15 ? 'neutral' : 'negative'}`}>
                {calculatedValues.customerMarginPercent?.toFixed(1) || '0.0'}%
              </span>
            </div>
            {calculatedValues.salesGrowth2025 && (
              <div className="calc-item">
                <span>Sales Growth (2024-2025):</span>
                <span className={`calc-value ${calculatedValues.salesGrowth2025 >= 0 ? 'positive' : 'negative'}`}>
                  {calculatedValues.salesGrowth2025?.toFixed(1) || '0.0'}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const currentSection = financialAnalysisConfig.sections[activeSection];

  return (
    <div className="financial-analysis-container">
      {/* Header */}
      <div className="form-header">
        <h1>{financialAnalysisConfig.title}</h1>
        <p className="form-description">{financialAnalysisConfig.description}</p>
        <div className="currency-indicator">Currency: {financialAnalysisConfig.currency}</div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((activeSection + 1) / financialAnalysisConfig.sections.length) * 100}%` }}
          ></div>
        </div>
        <div className="section-indicators">
          {financialAnalysisConfig.sections.map((section, index) => (
            <div
              key={index}
              className={`section-indicator ${index === activeSection ? 'active' : ''} ${index < activeSection ? 'completed' : ''}`}
              onClick={() => setActiveSection(index)}
            >
              <div className="indicator-icon">{section.icon}</div>
              <div className="indicator-label">{section.title}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="financial-form">
        {/* Current Section */}
        <div className="form-section active">
          <div className="section-header">
            <h2>{currentSection.icon} {currentSection.title}</h2>
            <p className="section-description">{currentSection.description}</p>
          </div>
          
          <div className="fields-grid">
            {currentSection.fields.map(field => renderField(field))}
          </div>
        </div>

        {/* Calculation Summary (always visible) */}
        {renderCalculationSummary()}

        {/* Navigation */}
        <div className="form-navigation">
          <button
            type="button"
            onClick={prevSection}
            disabled={activeSection === 0}
            className="btn-secondary"
          >
            ← Previous Section
          </button>
          
          <div className="nav-center">
            <span className="section-counter">
              Section {activeSection + 1} of {financialAnalysisConfig.sections.length}
            </span>
          </div>
          
          {activeSection < financialAnalysisConfig.sections.length - 1 ? (
            <button
              type="button"
              onClick={nextSection}
              className="btn-primary"
            >
              Next Section →
            </button>
          ) : (
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Analysis Submitted ✓' : 'Submit Financial Analysis'}
            </button>
          )}
        </div>
      </form>

      {/* Form Actions */}
      <div className="form-actions">
        <button type="button" onClick={resetForm} className="btn-reset">
          Reset All Data
        </button>
        
        <div className="form-stats">
          <span>Input Fields: {Object.keys(formData).length}/97</span>
          <span>Calculations: {Object.keys(calculatedValues).length}</span>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="submission-success">
          <h3>✅ Financial Analysis Completed Successfully!</h3>
          <div className="success-summary">
            <p><strong>Loan Amount:</strong> {financialAnalysisConfig.currency} {formatCurrency(formData.loan_amount)}</p>
            <p><strong>Personal Net Worth:</strong> {financialAnalysisConfig.currency} {formatCurrency(calculatedValues.personalNetWorth)}</p>
            <p><strong>Current Ratio:</strong> {calculatedValues.currentRatio?.toFixed(2) || '0.00'}</p>
            <p><strong>Customer Margin:</strong> {calculatedValues.customerMarginPercent?.toFixed(1) || '0.0'}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialAnalysisForm;