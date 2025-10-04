// Expert Scorecard Configuration - Based on Excel Analysis
// 12 Parameters: 5 Qualitative (35%) + 7 Quantitative (65%) = 100% Weight

export const expertScorecardConfig = {
  title: "Expert Scorecard - Credit Risk Assessment",
  description: "Sales Officer assessment form for credit risk evaluation",
  
  // Risk Categories with score ranges and colors
  riskCategories: {
    'Lowest Risk': { 
      range: [82, 100], 
      color: '#28a745',
      backgroundColor: '#d4edda',
      description: 'Excellent creditworthiness'
    },
    'Low Risk': { 
      range: [76, 81], 
      color: '#6f42c1',
      backgroundColor: '#e2d9f3',
      description: 'Good creditworthiness'
    },
    'Moderate Risk': { 
      range: [69, 75], 
      color: '#fd7e14',
      backgroundColor: '#ffe8d1',
      description: 'Acceptable risk with monitoring'
    },
    'High Risk': { 
      range: [63, 68], 
      color: '#dc3545',
      backgroundColor: '#f8d7da',
      description: 'Requires careful evaluation'
    },
    'Highest Risk': { 
      range: [30, 62], 
      color: '#6c757d',
      backgroundColor: '#e2e3e5',
      description: 'Not recommended for approval'
    }
  },

  // All 12 scoring parameters
  parameters: [
    {
      name: 'age',
      label: 'Age',
      category: 'Qualitative',
      weight: 10,
      required: true,
      rationale: 'Age with experience bring in maturity',
      options: [
        { label: '21-30 years', score: 3 },
        { label: '31-40 years', score: 5 },
        { label: '41-50 years', score: 10 },
        { label: '>50 years', score: 7 }
      ]
    },
    {
      name: 'business_vintage',
      label: 'Business Vintage',
      category: 'Qualitative',
      weight: 10,
      required: true,
      rationale: 'Higher Business vintage indicates ability to handle favorable and adverse business cycles',
      options: [
        { label: '< 5 years', score: 2 },
        { label: 'Between 5-10years', score: 5 },
        { label: 'Between 11-15 years', score: 8 },
        { label: 'Greater than 15 years', score: 10 }
      ]
    },
    {
      name: 'shop_ownership',
      label: 'Shop Ownership',
      category: 'Qualitative',
      weight: 10,
      required: true,
      rationale: 'Having own place means asset creation, even parental property means longer stability at the that place',
      options: [
        { label: 'Rented', score: 5 },
        { label: 'Owned', score: 10 },
        { label: 'Parental', score: 7 }
      ]
    },
    {
      name: 'constitution',
      label: 'Constitution',
      category: 'Qualitative',
      weight: 5,
      required: true,
      rationale: 'More Formalised the entity, it is better. Also, more business partners the better',
      options: [
        { label: 'Proprietorship', score: 1 },
        { label: 'Partnership', score: 3 },
        { label: 'Company', score: 5 }
      ]
    },
    {
      name: 'income_source',
      label: 'Single or Multiple Income Source',
      category: 'Qualitative',
      weight: 10,
      required: true,
      rationale: 'Customer having multiple cash flow will be able handle short term liquidity issues',
      options: [
        { label: 'Single Source', score: 5 },
        { label: 'Customer having other income', score: 10 }
      ]
    },
    {
      name: 'debt_burden_ratio',
      label: 'Debt Burden Ratio',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Lower DBR ratio means better EMI repayment capacity',
      options: [
        { label: '<=40%', score: 10 },
        { label: '41-45%', score: 8 },
        { label: '46-50%', score: 6 },
        { label: '> 50%', score: 3 }
      ]
    },
    {
      name: 'dscr',
      label: 'DSCR (Debt Service Coverage Ratio)',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Higher DSCR means better EMI repayment capacity',
      options: [
        { label: '1.2 - 1.33 times', score: 3 },
        { label: 'Between 1.34 -1.50 times', score: 6 },
        { label: 'Between 1.51 -1.75 times', score: 8 },
        { label: '> 1.75 times', score: 10 }
      ]
    },
    {
      name: 'ltv',
      label: 'LTV (Loan to Value)',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Lower LTV means greater equity in collateral lowering risk and better recovery rate',
      options: [
        { label: '< 40%', score: 10 },
        { label: '40-50%', score: 8 },
        { label: '51-60%', score: 6 },
        { label: '61-70%', score: 4 },
        { label: '>70%', score: 2 }
      ]
    },
    {
      name: 'gross_margin',
      label: 'Gross Margin/EBITDA',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Higher gross Margin means better ability to absorb cost and credit period',
      options: [
        { label: '<=10%', score: 3 },
        { label: '11-20%', score: 5 },
        { label: '21-30%', score: 8 },
        { label: '> 30%', score: 10 }
      ]
    },
    {
      name: 'working_capital_cycle',
      label: 'Working Capital Cycle',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Shorter operating cycle means better cash flow',
      options: [
        { label: '<30 days', score: 10 },
        { label: '31-60 days', score: 7 },
        { label: '61-90 days', score: 5 },
        { label: '> 90 days', score: 2 }
      ]
    },
    {
      name: 'customer_margin',
      label: 'Customer Margin in Transaction',
      category: 'Quantitative',
      weight: 10,
      required: true,
      rationale: 'Higher customer equity in transaction shows skin in the game',
      options: [
        { label: '> 40%', score: 10 },
        { label: '36-40%', score: 8 },
        { label: '31-35%', score: 6 },
        { label: '26-30%', score: 4 },
        { label: '< 25%', score: 2 }
      ]
    },
    {
      name: 'repayment_track',
      label: 'Repayment Track Record',
      category: 'Quantitative',
      weight: 5,
      required: true,
      rationale: 'If existing track record for personal or business is good, then proper intent is established',
      options: [
        { label: '0 DPD in last 6 months, never been in 30 DPD in last 12 months and currently not delinquent', score: 5 },
        { label: 'never 30 DPD in last 6 months, never been in 60 DPD in last 12 months and currently not delinquent', score: 2 },
        { label: 'No loans', score: 3 }
      ]
    }
  ],

  // Sales Officer optional comment field
  salesOfficerField: {
    name: 'sales_officer_comment',
    label: 'Comments to be input by Sales Officer (Optional)',
    type: 'textarea',
    required: false,
    placeholder: 'Enter any additional comments or observations about the customer assessment...',
    maxLength: 1000
  }
};

// Utility functions for scoring calculations
export const calculateTotalScore = (formData) => {
  let totalScore = 0;
  
  expertScorecardConfig.parameters.forEach(parameter => {
    const selectedValue = formData[parameter.name];
    if (selectedValue) {
      const selectedOption = parameter.options.find(option => option.label === selectedValue);
      if (selectedOption) {
        totalScore += (selectedOption.score * parameter.weight) / 100;
      }
    }
  });
  
  return parseFloat(totalScore.toFixed(1));
};

export const getRiskCategory = (totalScore) => {
  for (const [categoryName, categoryData] of Object.entries(expertScorecardConfig.riskCategories)) {
    const [minScore, maxScore] = categoryData.range;
    if (totalScore >= minScore && totalScore <= maxScore) {
      return {
        name: categoryName,
        ...categoryData
      };
    }
  }
  
  // Default fallback
  return {
    name: 'Highest Risk',
    ...expertScorecardConfig.riskCategories['Highest Risk']
  };
};

export const getParametersByCategory = () => {
  const qualitative = expertScorecardConfig.parameters.filter(p => p.category === 'Qualitative');
  const quantitative = expertScorecardConfig.parameters.filter(p => p.category === 'Quantitative');
  
  return {
    qualitative,
    quantitative,
    qualitativeWeight: qualitative.reduce((sum, p) => sum + p.weight, 0),
    quantitativeWeight: quantitative.reduce((sum, p) => sum + p.weight, 0)
  };
};

export default expertScorecardConfig;