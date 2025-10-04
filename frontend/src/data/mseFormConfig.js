// MSE Credit Assessment Form Configuration (Based on Excel Analysis)
export const mseFormConfig = {
  formName: 'MSE-Credit-Assessment-Excel',
  version: '1.0',
  totalSteps: 6,
  steps: [
    {
      step: 1,
      title: 'Business Sales Data',
      description: 'Historical sales patterns and current sales information',
      fields: [
        { name: 'salesMemoType', label: 'Sales Memo/Cash Book Type', type: 'select', required: true, options: ['Sales Memo', 'Cash Book', 'Digital Records', 'Manual Records'] },
        
        // Last Month Sales Data
        { name: 'lastMonthSales5th', label: 'Last Month Sales (5th)', type: 'number', required: true },
        { name: 'lastMonthSales15th', label: 'Last Month Sales (15th)', type: 'number', required: true },
        { name: 'lastMonthSales25th', label: 'Last Month Sales (25th)', type: 'number', required: true },
        
        // Two Months Back Sales Data
        { name: 'twoMonthsSales5th', label: 'Two Months Back Sales (5th)', type: 'number', required: true },
        { name: 'twoMonthsSales15th', label: 'Two Months Back Sales (15th)', type: 'number', required: true },
        { name: 'twoMonthsSales25th', label: 'Two Months Back Sales (25th)', type: 'number', required: true },
        
        // Three Months Back Sales Data
        { name: 'threeMonthsSales5th', label: 'Three Months Back Sales (5th)', type: 'number', required: true },
        { name: 'threeMonthsSales15th', label: 'Three Months Back Sales (15th)', type: 'number', required: true },
        { name: 'threeMonthsSales25th', label: 'Three Months Back Sales (25th)', type: 'number', required: true },
        
        // Current Sales Patterns
        { name: 'salesDaily', label: 'Sales Daily (USD)', type: 'number', required: true },
        { name: 'salesWeekly', label: 'Sales Weekly (USD)', type: 'number', required: true },
        { name: 'salesMonthly', label: 'Sales Monthly (USD)', type: 'number', required: true },
        { name: 'averageDailySales', label: 'Average Daily Sales (USD)', type: 'number', required: true },
        
        // Sales Growth and Seasonality
        { name: 'salesGrowth', label: 'Sales Growth (%)', type: 'number', required: false },
        { name: 'salesSeasonality', label: 'Sales Seasonality (Months)', type: 'number', required: false, max: 12 },
        { name: 'seasonalityAmount', label: 'Seasonality Amount (USD)', type: 'number', required: false }
      ]
    },
    {
      step: 2,
      title: 'Business Purchase Data',
      description: 'Purchase patterns and supplier information',
      fields: [
        { name: 'purchaseMemoType', label: 'Purchase Memo/Cash Book Type', type: 'select', required: true, options: ['Purchase Memo', 'Cash Book', 'Digital Records', 'Manual Records'] },
        
        // Last Month Purchase Data
        { name: 'lastMonthPurchase5th', label: 'Last Month Purchase (5th)', type: 'number', required: true },
        { name: 'lastMonthPurchase15th', label: 'Last Month Purchase (15th)', type: 'number', required: true },
        { name: 'lastMonthPurchase25th', label: 'Last Month Purchase (25th)', type: 'number', required: true },
        
        // Historical Purchase Data
        { name: 'fourMonthsPurchase', label: 'Four Months Back Purchase', type: 'number', required: true },
        { name: 'fiveMonthsPurchase', label: 'Five Months Back Purchase', type: 'number', required: true },
        { name: 'sixMonthsPurchase', label: 'Six Months Back Purchase', type: 'number', required: true },
        
        // Current Purchase Patterns
        { name: 'purchaseDaily', label: 'Daily Purchases (USD)', type: 'number', required: true },
        { name: 'purchaseWeekly', label: 'Weekly Purchases (USD)', type: 'number', required: true },
        { name: 'purchaseMonthly', label: 'Monthly Purchases (USD)', type: 'number', required: true },
        { name: 'averageDailyPurchase', label: 'Average Daily Purchase (USD)', type: 'number', required: true },
        
        // Product/Service Details
        { name: 'typeOfProduct', label: 'Type of Product', type: 'select', required: true, options: ['Goods', 'Services', 'Mixed', 'Trading', 'Manufacturing'] },
        { name: 'numberOfUnits', label: 'Number of Units', type: 'number', required: true },
        { name: 'productPurchasePrice', label: 'Product Purchase Price (USD)', type: 'number', required: true },
        { name: 'servicePurchasePrice', label: 'Service Purchase Price (USD)', type: 'number', required: false },
        { name: 'averagePricePerProduct', label: 'Average Price per Product/Unit (USD)', type: 'number', required: true },
        { name: 'averagePricePerService', label: 'Average Price per Service/Unit (USD)', type: 'number', required: false }
      ]
    },
    {
      step: 3,
      title: 'Financial Information',
      description: 'Bank balances, cash flow and financial position',
      fields: [
        // Bank and Cash Information
        { name: 'currentBankBalance', label: 'Current Bank Balance (USD)', type: 'number', required: true },
        { name: 'averageBankBalance', label: 'Average Bank Balance (USD)', type: 'number', required: true },
        { name: 'cashInHandEndMonth', label: 'Cash in Hand End of Month from Business (USD)', type: 'number', required: true },
        
        // Business Expenses
        { name: 'businessExpenseMonthly', label: 'Business Expense - Monthly (USD)', type: 'number', required: true },
        { name: 'staffSalary', label: 'Staff Salary (USD)', type: 'number', required: false },
        { name: 'labourExpense', label: 'Labour Expense (USD)', type: 'number', required: false },
        { name: 'telephoneInternetExpense', label: 'Telephone/Mobile/Internet (USD)', type: 'number', required: false },
        { name: 'otherBusinessExpense', label: 'Other Business Expense (USD)', type: 'number', required: false },
        { name: 'totalBusinessExpense', label: 'Total Business Expense (USD)', type: 'number', required: true },
        
        // Pricing and Margins
        { name: 'averageProductMargin', label: 'Average Product Margin (%)', type: 'number', required: true, step: 0.01 },
        { name: 'averageSalePricePerUnit', label: 'Average Sale Price per Unit (USD)', type: 'number', required: true },
        
        // Assets and Liabilities
        { name: 'debtors', label: 'Debtors (USD)', type: 'number', required: false },
        { name: 'creditors', label: 'Creditors (USD)', type: 'number', required: false },
        
        // Financial Ratios
        { name: 'debtBurdenPercentage', label: 'Debt Burden (%)', type: 'number', required: true, step: 0.01, max: 100 }
      ]
    },
    {
      step: 4,
      title: 'Income Sources',
      description: 'Primary business income and additional income sources',
      fields: [
        // Primary Business Income
        { name: 'primaryBusinessIncome', label: 'Primary Business Income Monthly (USD)', type: 'number', required: true },
        
        // Co-Applicant/Guarantor Income Sources
        { name: 'agricultureIncome', label: 'Agriculture Income (Co applicant/Guarantor) (USD)', type: 'number', required: false },
        { name: 'rentalIncome', label: 'Rental Income (Co applicant/Guarantor) (USD)', type: 'number', required: false },
        { name: 'salaryIncome', label: 'Salary Income (Co applicant/Guarantor) (USD)', type: 'number', required: false },
        { name: 'alliedAgriIncome', label: 'Allied Agri Income (Co applicant/Guarantor) (USD)', type: 'number', required: false },
        { name: 'otherInterestIncome', label: 'Other Income (Interest etc) (Co applicant/Guarantor) (USD)', type: 'number', required: false },
        { name: 'applicantGuarantorOtherIncome', label: 'Applicant/Guarantor Other Income (Monthly) (USD)', type: 'number', required: false },
        
        // Total Calculations
        { name: 'totalOtherIncome', label: 'Total Other Income (USD)', type: 'number', required: true },
        { name: 'totalMonthlyIncome', label: 'Total Monthly Income (USD)', type: 'number', required: true },
        
        // Income Verification Flags
        { name: 'agricultureIncomeConsider', label: 'Consider Agriculture Income', type: 'checkbox', required: false },
        { name: 'rentalIncomeConsider', label: 'Consider Rental Income', type: 'checkbox', required: false },
        { name: 'salaryIncomeConsider', label: 'Consider Salary Income', type: 'checkbox', required: false },
        { name: 'otherIncomeConsider', label: 'Consider Other Income', type: 'checkbox', required: false }
      ]
    },
    {
      step: 5,
      title: 'Credit & Debt Information',
      description: 'Loan details, guarantor information and credit history',
      fields: [
        // Co-Applicant/Guarantor Details
        { name: 'coApplicantGuarantorName', label: 'Co applicant/Guarantor Name', type: 'text', required: false },
        { name: 'coApplicantGuarantorRelation', label: 'Relation to Applicant', type: 'select', required: false, options: ['Spouse', 'Parent', 'Sibling', 'Child', 'Business Partner', 'Friend', 'Other'] },
        { name: 'coApplicantGuarantorOccupation', label: 'Co applicant/Guarantor Occupation', type: 'text', required: false },
        { name: 'coApplicantGuarantorIncome', label: 'Co applicant/Guarantor Monthly Income (USD)', type: 'number', required: false },
        
        // Guarantor Additional Details
        { name: 'guarantorName', label: 'Guarantor Name', type: 'text', required: false },
        { name: 'guarantorAddress', label: 'Guarantor Address', type: 'textarea', required: false },
        { name: 'guarantorPhone', label: 'Guarantor Phone Number', type: 'tel', required: false },
        { name: 'guarantorOccupation', label: 'Guarantor Occupation', type: 'text', required: false },
        
        // Current Loan Information
        { name: 'existingLoanAmount', label: 'Existing Loan Amount (USD)', type: 'number', required: false },
        { name: 'existingLoanEMI', label: 'Existing Loan EMI (USD)', type: 'number', required: false },
        { name: 'existingLoanTenure', label: 'Existing Loan Remaining Tenure (Months)', type: 'number', required: false },
        
        // Credit History
        { name: 'creditHistoryYears', label: 'Credit History (Years)', type: 'number', required: false },
        { name: 'previousLoanDefaults', label: 'Previous Loan Defaults', type: 'select', required: false, options: ['None', '1-2 times', '3-5 times', 'More than 5 times'] },
        { name: 'currentCreditScore', label: 'Current Credit Score', type: 'number', required: false, min: 300, max: 900 }
      ]
    },
    {
      step: 6,
      title: 'Business Operations',
      description: 'Operational details and business characteristics',
      fields: [
        // Business Type and Operations
        { name: 'businessType', label: 'Type of Business', type: 'select', required: true, options: ['Trading', 'Manufacturing', 'Service', 'Mixed', 'Retail', 'Wholesale'] },
        { name: 'typeOfProductService', label: 'Type of Product/Service', type: 'text', required: true },
        { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
        { name: 'businessVintage', label: 'Business Vintage (Years)', type: 'number', required: true },
        
        // Operational Metrics
        { name: 'numberOfEmployees', label: 'Number of Employees', type: 'number', required: false },
        { name: 'workingDaysPerWeek', label: 'Working Days per Week', type: 'number', required: true, min: 1, max: 7 },
        { name: 'workingHoursPerDay', label: 'Working Hours per Day', type: 'number', required: true, min: 1, max: 24 },
        
        // Market and Competition
        { name: 'marketCompetition', label: 'Market Competition Level', type: 'select', required: false, options: ['Low', 'Medium', 'High', 'Very High'] },
        { name: 'seasonalBusiness', label: 'Seasonal Business', type: 'radio', required: false, options: ['Yes', 'No'] },
        { name: 'peakSeasonMonths', label: 'Peak Season Months', type: 'text', required: false, conditional: 'seasonalBusiness', conditionalValue: 'Yes' },
        
        // Additional Information
        { name: 'businessRegistered', label: 'Business Registered', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: false, conditional: 'businessRegistered', conditionalValue: 'Yes' },
        { name: 'gstRegistered', label: 'GST Registered', type: 'radio', required: false, options: ['Yes', 'No'] },
        { name: 'gstNumber', label: 'GST Number', type: 'text', required: false, conditional: 'gstRegistered', conditionalValue: 'Yes' },
        
        // Final Assessment
        { name: 'loanAmountRequested', label: 'Loan Amount Requested (USD)', type: 'number', required: true, max: 50000 },
        { name: 'loanPurpose', label: 'Loan Purpose', type: 'select', required: true, options: ['Business Expansion', 'Working Capital', 'Equipment Purchase', 'Inventory Purchase', 'Other'] },
        { name: 'repaymentCapacity', label: 'Monthly Repayment Capacity (USD)', type: 'number', required: true }
      ]
    }
  ],
  
  // Validation rules
  validationRules: {
    // Financial validations
    debtBurdenPercentage: { max: 100, message: 'Debt burden cannot exceed 100%' },
    loanAmountRequested: { max: 50000, message: 'Loan amount cannot exceed $50,000 for this assessment' },
    
    // Logical validations
    totalMonthlyIncome: {
      validate: (formData) => {
        const businessIncome = parseFloat(formData.primaryBusinessIncome || 0);
        const otherIncome = parseFloat(formData.totalOtherIncome || 0);
        const totalIncome = parseFloat(formData.totalMonthlyIncome || 0);
        return Math.abs(totalIncome - (businessIncome + otherIncome)) < 0.01;
      },
      message: 'Total monthly income should equal business income plus other income'
    },
    
    repaymentCapacity: {
      validate: (formData) => {
        const totalIncome = parseFloat(formData.totalMonthlyIncome || 0);
        const repaymentCapacity = parseFloat(formData.repaymentCapacity || 0);
        return repaymentCapacity <= totalIncome * 0.5; // Max 50% of income for repayment
      },
      message: 'Repayment capacity should not exceed 50% of total monthly income'
    }
  }
};