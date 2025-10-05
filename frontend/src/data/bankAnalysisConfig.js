// Bank Analysis Form Configuration
// Based on Excel analysis: 62 input fields + 15 calculated fields

export const bankAnalysisConfig = {
  title: 'Bank Analysis >$50000',
  description: 'Comprehensive banking analysis for loans above $50,000 including balance tracking and credit analysis',
  
  sections: [
    {
      id: 'bank-info',
      title: 'Bank Information',
      description: 'Primary bank account details and specifications',
      fields: [
        {
          id: 'bankName',
          label: 'Bank Name',
          type: 'text',
          required: true,
          placeholder: 'Enter primary bank name',
          section: 'bank-info'
        },
        {
          id: 'accountType',
          label: 'Account Type',
          type: 'select',
          required: true,
          options: [
            { value: 'savings', label: 'Savings Account' },
            { value: 'current', label: 'Current Account' }
          ],
          section: 'bank-info'
        }
      ]
    },
    
    {
      id: 'monthly-balances',
      title: 'Monthly Balance Tracking',
      description: 'End-of-day balances for the last 6 months across specific dates',
      fields: [
        // Generate 36 balance tracking fields (6 months × 6 dates per month)
        ...generateBalanceFields()
      ]
    },
    
    {
      id: 'banking-credits',
      title: 'Banking Credits Analysis',
      description: 'Monthly credit analysis for the last 12 months across multiple banks',
      fields: [
        // Generate 24 credit input fields (12 months × 2 banks)
        ...generateCreditFields()
      ]
    },
    
    {
      id: 'analysis-summary',
      title: 'Banking Analysis Summary',
      description: 'Calculated metrics and risk assessment indicators',
      fields: [
        // Summary and calculated fields
        {
          id: 'averageMonthlyBalance',
          label: 'Average Monthly Balance',
          type: 'calculated',
          formula: 'calculateAverageBalance',
          format: 'currency',
          section: 'analysis-summary'
        },
        {
          id: 'balanceVolatility',
          label: 'Balance Volatility Index',
          type: 'calculated',
          formula: 'calculateVolatility',
          format: 'percentage',
          section: 'analysis-summary'
        },
        {
          id: 'totalAnnualCredits',
          label: 'Total Annual Credits',
          type: 'calculated',
          formula: 'calculateTotalCredits',
          format: 'currency',
          section: 'analysis-summary'
        },
        {
          id: 'monthlyAverageCredits',
          label: 'Monthly Average Credits',
          type: 'calculated',
          formula: 'calculateMonthlyAverageCredits',
          format: 'currency',
          section: 'analysis-summary'
        },
        {
          id: 'creditTrend',
          label: 'Credit Trend Analysis',
          type: 'calculated',
          formula: 'calculateCreditTrend',
          format: 'percentage',
          section: 'analysis-summary'
        },
        {
          id: 'bankConcentrationRisk',
          label: 'Bank Concentration Risk',
          type: 'calculated',
          formula: 'calculateConcentrationRisk',
          format: 'percentage',
          section: 'analysis-summary'
        },
        {
          id: 'cashFlowStability',
          label: 'Cash Flow Stability Score',
          type: 'calculated',
          formula: 'calculateCashFlowStability',
          format: 'score',
          section: 'analysis-summary'
        },
        {
          id: 'operationalEfficiency',
          label: 'Banking Operational Efficiency',
          type: 'calculated',
          formula: 'calculateOperationalEfficiency',
          format: 'score',
          section: 'analysis-summary'
        }
      ]
    }
  ],
  
  // Calculation functions for banking metrics
  calculations: {
    calculateAverageBalance: (formData) => {
      const balanceFields = getAllBalanceValues(formData);
      const validBalances = balanceFields.filter(val => val > 0);
      return validBalances.length > 0 ? validBalances.reduce((sum, val) => sum + val, 0) / validBalances.length : 0;
    },
    
    calculateVolatility: (formData) => {
      const balanceFields = getAllBalanceValues(formData);
      const validBalances = balanceFields.filter(val => val > 0);
      if (validBalances.length < 2) return 0;
      
      const mean = validBalances.reduce((sum, val) => sum + val, 0) / validBalances.length;
      const variance = validBalances.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validBalances.length;
      const stdDev = Math.sqrt(variance);
      
      return mean > 0 ? (stdDev / mean) * 100 : 0;
    },
    
    calculateTotalCredits: (formData) => {
      let totalCredits = 0;
      
      // Sum all bank credits for 12 months
      for (let month = 1; month <= 12; month++) {
        const bank1Credit = parseFloat(formData[`bank1_credit_month_${month}`] || 0);
        const bank2Credit = parseFloat(formData[`bank2_credit_month_${month}`] || 0);
        totalCredits += bank1Credit + bank2Credit;
      }
      
      return totalCredits;
    },
    
    calculateMonthlyAverageCredits: (formData) => {
      const totalCredits = bankAnalysisConfig.calculations.calculateTotalCredits(formData);
      return totalCredits / 12;
    },
    
    calculateCreditTrend: (formData) => {
      const firstHalf = [];
      const secondHalf = [];
      
      for (let month = 1; month <= 6; month++) {
        const bank1Credit = parseFloat(formData[`bank1_credit_month_${month}`] || 0);
        const bank2Credit = parseFloat(formData[`bank2_credit_month_${month}`] || 0);
        firstHalf.push(bank1Credit + bank2Credit);
      }
      
      for (let month = 7; month <= 12; month++) {
        const bank1Credit = parseFloat(formData[`bank1_credit_month_${month}`] || 0);
        const bank2Credit = parseFloat(formData[`bank2_credit_month_${month}`] || 0);
        secondHalf.push(bank1Credit + bank2Credit);
      }
      
      const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / 6;
      const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / 6;
      
      return firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;
    },
    
    calculateConcentrationRisk: (formData) => {
      let bank1Total = 0;
      let bank2Total = 0;
      
      for (let month = 1; month <= 12; month++) {
        bank1Total += parseFloat(formData[`bank1_credit_month_${month}`] || 0);
        bank2Total += parseFloat(formData[`bank2_credit_month_${month}`] || 0);
      }
      
      const totalCredits = bank1Total + bank2Total;
      if (totalCredits === 0) return 0;
      
      const maxBankShare = Math.max(bank1Total, bank2Total);
      return (maxBankShare / totalCredits) * 100;
    },
    
    calculateCashFlowStability: (formData) => {
      const balanceVolatility = bankAnalysisConfig.calculations.calculateVolatility(formData);
      const creditTrend = Math.abs(bankAnalysisConfig.calculations.calculateCreditTrend(formData));
      const concentrationRisk = bankAnalysisConfig.calculations.calculateConcentrationRisk(formData);
      
      // Scoring: Lower volatility, stable trend, and lower concentration = higher score
      let stabilityScore = 100;
      stabilityScore -= Math.min(balanceVolatility, 50); // Max 50 point reduction for volatility
      stabilityScore -= Math.min(creditTrend / 2, 25); // Max 25 point reduction for trend volatility
      stabilityScore -= Math.min((concentrationRisk - 50) / 2, 25); // Penalty if concentration > 50%
      
      return Math.max(0, Math.min(100, stabilityScore));
    },
    
    calculateOperationalEfficiency: (formData) => {
      const averageBalance = bankAnalysisConfig.calculations.calculateAverageBalance(formData);
      const monthlyCredits = bankAnalysisConfig.calculations.calculateMonthlyAverageCredits(formData);
      
      if (averageBalance === 0 || monthlyCredits === 0) return 0;
      
      // Efficiency ratio: Credits to Balance ratio (higher is better for operational efficiency)
      const efficiencyRatio = monthlyCredits / averageBalance;
      
      // Convert to score (0-100 scale)
      return Math.min(100, efficiencyRatio * 20); // Scaled for typical banking ratios
    }
  }
};

// Helper function to generate balance tracking fields
function generateBalanceFields() {
  const fields = [];
  const dates = ['5th', '10th', '15th', '20th', '25th', 'lastDay'];
  const dateLabels = ['5th', '10th', '15th', '20th', '25th', 'Last Day'];
  const months = ['July', 'August', 'September', 'October', 'November', 'December'];
  
  dates.forEach((date, dateIndex) => {
    months.forEach((month, monthIndex) => {
      fields.push({
        id: `balance_${date}_month_${monthIndex + 1}`,
        label: `${dateLabels[dateIndex]} - ${month} 2024`,
        type: 'currency',
        required: false,
        placeholder: '0.00',
        section: 'monthly-balances',
        gridColumn: monthIndex + 1,
        gridRow: dateIndex + 1
      });
    });
  });
  
  return fields;
}

// Helper function to generate banking credit fields
function generateCreditFields() {
  const fields = [];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate fields for 2 banks across 12 months
  months.forEach((month, index) => {
    // Bank 1 Credits
    fields.push({
      id: `bank1_credit_month_${index + 1}`,
      label: `Bank 1 Credits - ${month} 2024`,
      type: 'currency',
      required: false,
      placeholder: '0.00',
      section: 'banking-credits',
      gridColumn: index + 1,
      gridRow: 1
    });
    
    // Bank 2 Credits
    fields.push({
      id: `bank2_credit_month_${index + 1}`,
      label: `Bank 2 Credits - ${month} 2024`,
      type: 'currency',
      required: false,
      placeholder: '0.00',
      section: 'banking-credits',
      gridColumn: index + 1,
      gridRow: 2
    });
  });
  
  return fields;
}

// Helper function to get all balance values
function getAllBalanceValues(formData) {
  const balanceValues = [];
  const dates = ['5th', '10th', '15th', '20th', '25th', 'lastDay'];
  
  dates.forEach(date => {
    for (let month = 1; month <= 6; month++) {
      const fieldValue = formData[`balance_${date}_month_${month}`];
      if (fieldValue && !isNaN(fieldValue)) {
        balanceValues.push(parseFloat(fieldValue));
      }
    }
  });
  
  return balanceValues;
}

export default bankAnalysisConfig;