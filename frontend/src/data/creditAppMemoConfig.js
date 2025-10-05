// Credit App Memo Form Configuration
// Based on Excel analysis: 31 input fields + 6 calculated fields

export const creditAppMemoConfig = {
  title: 'Credit Application Memo',
  description: 'Comprehensive credit application memo with risk assessment, qualitative analysis, and approval workflow',
  
  sections: [
    {
      id: 'customer-loan-details',
      title: 'Customer & Loan Details',
      description: 'Basic customer information and loan parameters',
      fields: [
        {
          id: 'dateOfProposal',
          label: 'Date of Proposal',
          type: 'date',
          required: true,
          section: 'customer-loan-details'
        },
        {
          id: 'branch',
          label: 'Branch',
          type: 'text',
          required: true,
          placeholder: 'Enter branch name',
          section: 'customer-loan-details'
        },
        {
          id: 'customerName',
          label: 'Customer Name',
          type: 'text',
          required: true,
          placeholder: 'Enter full customer name',
          section: 'customer-loan-details'
        },
        {
          id: 'purposeForBorrowing',
          label: 'Purpose for Borrowing',
          type: 'select',
          required: true,
          options: [
            { value: 'working-capital', label: 'Working Capital' },
            { value: 'term-loan', label: 'Term Loan' },
            { value: 'asset-purchase', label: 'Asset Purchase' },
            { value: 'business-expansion', label: 'Business Expansion' },
            { value: 'other', label: 'Other' }
          ],
          section: 'customer-loan-details'
        },
        {
          id: 'businessSegment',
          label: 'Business Segment',
          type: 'select',
          required: true,
          options: [
            { value: 'trading', label: 'Trading' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'services', label: 'Services' },
            { value: 'agriculture', label: 'Agriculture' },
            { value: 'retail', label: 'Retail' }
          ],
          section: 'customer-loan-details'
        },
        {
          id: 'businessSubSegment',
          label: 'Business Sub-Segment',
          type: 'text',
          required: true,
          placeholder: 'e.g., Garments, Electronics, Food',
          section: 'customer-loan-details'
        },
        {
          id: 'currentBankers',
          label: 'Current Bankers',
          type: 'text',
          required: true,
          placeholder: 'Enter existing bank relationships',
          section: 'customer-loan-details'
        },
        {
          id: 'facilityType',
          label: 'Type of Facility Offered',
          type: 'select',
          required: true,
          options: [
            { value: 'term-loan', label: 'Term Loan' },
            { value: 'working-capital', label: 'Working Capital' },
            { value: 'overdraft', label: 'Overdraft' },
            { value: 'credit-line', label: 'Credit Line' },
            { value: 'letter-of-credit', label: 'Letter of Credit' }
          ],
          section: 'customer-loan-details'
        },
        {
          id: 'loanAmount',
          label: 'Loan Amount Approved (USD)',
          type: 'currency',
          required: true,
          placeholder: '0.00',
          section: 'customer-loan-details'
        },
        {
          id: 'loanTerm',
          label: 'Loan Term in Months',
          type: 'number',
          required: true,
          min: 1,
          max: 360,
          placeholder: 'Enter number of months',
          section: 'customer-loan-details'
        },
        {
          id: 'interestRate',
          label: 'Interest Rate (%)',
          type: 'percentage',
          required: true,
          min: 0,
          max: 100,
          step: 0.01,
          placeholder: '0.00',
          section: 'customer-loan-details'
        },
        {
          id: 'processingFee',
          label: 'Processing Fee (USD)',
          type: 'currency',
          required: false,
          placeholder: '0.00',
          section: 'customer-loan-details'
        },
        {
          id: 'thirdPartyGuarantor',
          label: '3rd Party Guarantor Present',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          section: 'customer-loan-details'
        },
        {
          id: 'guarantorIncome',
          label: '3rd Party Guarantor Income Coverage',
          type: 'select',
          required: true,
          options: [
            { value: 'adequate', label: 'Adequate' },
            { value: 'not-applicable', label: 'Not Applicable' },
            { value: 'insufficient', label: 'Insufficient' }
          ],
          section: 'customer-loan-details'
        }
      ]
    },
    
    {
      id: 'risk-assessment',
      title: 'Risk Assessment & References',
      description: 'Credit risk evaluation and reference verification',
      fields: [
        {
          id: 'supplierReference',
          label: 'Supplier Reference',
          type: 'select',
          required: true,
          options: [
            { value: 'positive', label: 'Positive' },
            { value: 'negative', label: 'Negative' },
            { value: 'not-available', label: 'Not Available' }
          ],
          section: 'risk-assessment'
        },
        {
          id: 'buyerReference',
          label: 'Buyer Reference (B2B)',
          type: 'select',
          required: false,
          options: [
            { value: 'positive', label: 'Positive' },
            { value: 'negative', label: 'Negative' },
            { value: 'not-available', label: 'Not Available' },
            { value: 'not-applicable', label: 'Not Applicable' }
          ],
          section: 'risk-assessment'
        },
        {
          id: 'creditRiskScore',
          label: 'Credit Risk Score',
          type: 'select',
          required: true,
          options: [
            { value: 'low-risk', label: 'Low Risk' },
            { value: 'medium-risk', label: 'Medium Risk' },
            { value: 'high-risk', label: 'High Risk' },
            { value: 'very-high-risk', label: 'Very High Risk' }
          ],
          section: 'risk-assessment'
        },
        {
          id: 'anyLoansOverdue',
          label: 'Any Current or Past Loans Overdue',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          section: 'risk-assessment'
        },
        {
          id: 'totalAssetsValue',
          label: 'Total Value of Assets and Investment (USD)',
          type: 'currency',
          required: true,
          placeholder: '0.00',
          section: 'risk-assessment'
        },
        {
          id: 'policyDeviation',
          label: 'Any Policy Deviation',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ],
          section: 'risk-assessment'
        },
        {
          id: 'deviationReason',
          label: 'Reason and Mitigant for Deviation',
          type: 'textarea',
          required: false,
          placeholder: 'Enter detailed explanation if any policy deviation exists',
          rows: 3,
          section: 'risk-assessment'
        }
      ]
    },
    
    {
      id: 'qualitative-assessment',
      title: 'Qualitative Assessment',
      description: 'Detailed business and market analysis',
      fields: [
        {
          id: 'promoterEntrepreneur',
          label: 'Promoter/Entrepreneur Analysis',
          type: 'textarea',
          required: true,
          placeholder: 'Analyze the promoter background, experience, qualifications, and track record',
          rows: 4,
          section: 'qualitative-assessment'
        },
        {
          id: 'businessActivity',
          label: 'Business Activity Description',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the nature of business, operations, location, and key activities',
          rows: 4,
          section: 'qualitative-assessment'
        },
        {
          id: 'marketDemand',
          label: 'Market and Demand Analysis',
          type: 'textarea',
          required: true,
          placeholder: 'Analyze market conditions, demand trends, competition, and growth prospects',
          rows: 4,
          section: 'qualitative-assessment'
        },
        {
          id: 'cashFlowAnalysis',
          label: 'Cash Flow Assessment',
          type: 'textarea',
          required: true,
          placeholder: 'Evaluate cash flow patterns, seasonality, and sustainability',
          rows: 4,
          section: 'qualitative-assessment'
        },
        {
          id: 'guarantorReferences',
          label: 'Guarantor and References',
          type: 'textarea',
          required: true,
          placeholder: 'Detail guarantor information and reference check results',
          rows: 4,
          section: 'qualitative-assessment'
        },
        {
          id: 'endUse',
          label: 'End Use of Funds',
          type: 'textarea',
          required: true,
          placeholder: 'Specify how the loan proceeds will be utilized',
          rows: 3,
          section: 'qualitative-assessment'
        },
        {
          id: 'recommendation',
          label: 'Recommendation',
          type: 'textarea',
          required: true,
          placeholder: 'Provide detailed recommendation with rationale',
          rows: 4,
          section: 'qualitative-assessment'
        }
      ]
    },
    
    {
      id: 'approval-decision',
      title: 'Approval & Decision',
      description: 'Final approval workflow and decision',
      fields: [
        {
          id: 'approverComments',
          label: 'Approver Comments',
          type: 'textarea',
          required: false,
          placeholder: 'Additional comments from approving authority',
          rows: 3,
          section: 'approval-decision'
        },
        {
          id: 'observations',
          label: 'Observations',
          type: 'textarea',
          required: true,
          placeholder: 'Key observations and final assessment summary',
          rows: 4,
          section: 'approval-decision'
        },
        {
          id: 'decision',
          label: 'Final Decision',
          type: 'select',
          required: true,
          options: [
            { value: 'approve', label: 'Approve' },
            { value: 'reject', label: 'Reject' },
            { value: 'conditional-approval', label: 'Conditional Approval' },
            { value: 'defer', label: 'Defer' }
          ],
          section: 'approval-decision'
        },
        
        // Calculated fields displayed in this section
        {
          id: 'dbrPercentage',
          label: 'DBR % (Debt Burden Ratio)',
          type: 'calculated',
          formula: 'calculateDBR',
          format: 'percentage',
          section: 'approval-decision'
        },
        {
          id: 'assetCoverage',
          label: 'Asset Coverage Ratio',
          type: 'calculated',
          formula: 'calculateAssetCoverage',
          format: 'ratio',
          section: 'approval-decision'
        },
        {
          id: 'deviationCode',
          label: 'Deviation Code',
          type: 'calculated',
          formula: 'calculateDeviationCode',
          format: 'text',
          section: 'approval-decision'
        },
        {
          id: 'riskCategory',
          label: 'Risk Category Assessment',
          type: 'calculated',
          formula: 'calculateRiskCategory',
          format: 'text',
          section: 'approval-decision'
        },
        {
          id: 'emiAmount',
          label: 'Estimated EMI Amount',
          type: 'calculated',
          formula: 'calculateEMI',
          format: 'currency',
          section: 'approval-decision'
        },
        {
          id: 'loanToValueRatio',
          label: 'Loan to Value Ratio',
          type: 'calculated',
          formula: 'calculateLTV',
          format: 'percentage',
          section: 'approval-decision'
        }
      ]
    }
  ],
  
  // Calculation functions for credit assessment metrics
  calculations: {
    calculateDBR: (formData) => {
      // DBR = (Monthly EMI / Monthly Income) * 100
      const emiAmount = creditAppMemoConfig.calculations.calculateEMI(formData);
      // Assume monthly income based on business patterns (simplified calculation)
      const estimatedMonthlyIncome = parseFloat(formData.loanAmount || 0) * 0.15; // 15% of loan as monthly income estimate
      
      return estimatedMonthlyIncome > 0 ? (emiAmount / estimatedMonthlyIncome) * 100 : 0;
    },
    
    calculateAssetCoverage: (formData) => {
      // Asset Coverage = Total Assets / Loan Amount
      const totalAssets = parseFloat(formData.totalAssetsValue || 0);
      const loanAmount = parseFloat(formData.loanAmount || 0);
      
      return loanAmount > 0 ? totalAssets / loanAmount : 0;
    },
    
    calculateDeviationCode: (formData) => {
      const deviationCodes = [];
      
      // Check various deviation conditions
      const dbr = creditAppMemoConfig.calculations.calculateDBR(formData);
      const assetCoverage = creditAppMemoConfig.calculations.calculateAssetCoverage(formData);
      const riskScore = formData.creditRiskScore;
      
      if (dbr > 40) deviationCodes.push('D1'); // High DBR
      if (assetCoverage < 1.25) deviationCodes.push('D2'); // Low asset coverage
      if (riskScore === 'high-risk' || riskScore === 'very-high-risk') deviationCodes.push('D3'); // High risk
      if (formData.thirdPartyGuarantor === 'no') deviationCodes.push('D4'); // No guarantor
      if (formData.anyLoansOverdue === 'yes') deviationCodes.push('D5'); // Past overdue
      
      return deviationCodes.length > 0 ? deviationCodes.join(', ') : 'No Deviation';
    },
    
    calculateRiskCategory: (formData) => {
      const riskScore = formData.creditRiskScore;
      const dbr = creditAppMemoConfig.calculations.calculateDBR(formData);
      const assetCoverage = creditAppMemoConfig.calculations.calculateAssetCoverage(formData);
      const hasOverdue = formData.anyLoansOverdue === 'yes';
      
      // Risk scoring logic
      let riskPoints = 0;
      
      if (riskScore === 'very-high-risk') riskPoints += 4;
      else if (riskScore === 'high-risk') riskPoints += 3;
      else if (riskScore === 'medium-risk') riskPoints += 2;
      else riskPoints += 1;
      
      if (dbr > 50) riskPoints += 2;
      else if (dbr > 30) riskPoints += 1;
      
      if (assetCoverage < 1) riskPoints += 2;
      else if (assetCoverage < 1.5) riskPoints += 1;
      
      if (hasOverdue) riskPoints += 2;
      
      // Categorize based on total risk points
      if (riskPoints >= 8) return 'Very High Risk';
      if (riskPoints >= 6) return 'High Risk';
      if (riskPoints >= 4) return 'Medium Risk';
      return 'Low Risk';
    },
    
    calculateEMI: (formData) => {
      // EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
      const principal = parseFloat(formData.loanAmount || 0);
      const annualRate = parseFloat(formData.interestRate || 0) / 100;
      const monthlyRate = annualRate / 12;
      const tenure = parseFloat(formData.loanTerm || 0);
      
      if (principal === 0 || monthlyRate === 0 || tenure === 0) return 0;
      
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                  (Math.pow(1 + monthlyRate, tenure) - 1);
      
      return emi;
    },
    
    calculateLTV: (formData) => {
      // LTV = (Loan Amount / Asset Value) * 100
      const loanAmount = parseFloat(formData.loanAmount || 0);
      const assetValue = parseFloat(formData.totalAssetsValue || 0);
      
      return assetValue > 0 ? (loanAmount / assetValue) * 100 : 0;
    }
  }
};

export default creditAppMemoConfig;