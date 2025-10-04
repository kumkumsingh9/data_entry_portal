// MSE Credit Assessment Form Configuration
export const formConfig = {
  formName: 'MSE-Credit-Assessment',
  version: '3.1',
  totalSteps: 6,
  steps: [
    {
      step: 1,
      title: 'Customer Details',
      fields: [
        { name: 'customerName', label: 'Customer Name', type: 'text', required: true },
        { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'maritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Married', 'Unmarried', 'Divorced', 'Widowed'] },
        { name: 'qualification', label: 'Qualification', type: 'select', required: true, options: ['Graduate', 'Post Graduate', 'Diploma', 'High School', 'Others'] },
        { name: 'familyMembers', label: 'No. of Family Members staying together including customer', type: 'number', required: true },
        { name: 'earningMembers', label: 'No. of Earning member in the family including customer', type: 'number', required: true },
        { name: 'existingCustomer', label: 'Existing Customer', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'existingSinceYear', label: 'If yes, since which year', type: 'number', required: false, conditional: 'existingCustomer', conditionalValue: 'Yes' },
        { name: 'residenceOwnership', label: 'Residence Ownership', type: 'select', required: true, options: ['Owned', 'Rented', 'Others'] },
        { name: 'residenceLocation', label: 'Residence Location', type: 'text', required: true },
        { name: 'residenceVintage', label: 'Residence Stay Vintage (Years)', type: 'number', required: true },
        { name: 'multipleIncomeSource', label: 'Does Customer have more than one income source', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'liveLoan', label: 'Does customer have any live loan', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'pastLoan', label: 'Did the customer have any loan in last 2 years', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'dpdCondition1', label: '0 DPD in last 6 months, never been in 30 DPD in last 12 months and currently not delinquent', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'dpdCondition2', label: 'Never 30 DPD in last 6 months, never been in 60 DPD in last 12 months and currently not delinquent', type: 'radio', required: true, options: ['Yes', 'No'] },
        { name: 'currentlyNoLoans', label: 'Currently No loans', type: 'radio', required: true, options: ['Yes', 'No'] }
      ]
    },
    {
      step: 2,
      title: 'Co-Applicant/Guarantor Details',
      fields: [
        { name: 'coApplicantName', label: 'Name', type: 'text', required: true },
        { name: 'coApplicantGender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
        { name: 'coApplicantDateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { name: 'coApplicantMaritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Married', 'Unmarried', 'Divorced', 'Widowed'] },
        { name: 'coApplicantQualification', label: 'Qualification', type: 'select', required: true, options: ['Graduate', 'Post Graduate', 'Diploma', 'High School', 'Others'] },
        { name: 'relationshipWithCustomer', label: 'Relationship with Customer', type: 'select', required: true, options: ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Business Partner', 'Others'] },
        { name: 'profession', label: 'Profession', type: 'select', required: true, options: ['Salaried', 'Self Employed', 'Not Employed', 'Business Owner', 'Others'] },
        { name: 'typeOfBusiness', label: 'Type of Business', type: 'text', required: false, conditional: 'profession', conditionalValue: 'Self Employed' },
        { name: 'businessSubSegment', label: 'Business Sub-Segment', type: 'text', required: false, conditional: 'profession', conditionalValue: 'Self Employed' },
        { name: 'residenceLocation', label: 'Residence Location', type: 'text', required: true },
        { name: 'workLocation', label: 'Work Location', type: 'text', required: false },
        { name: 'companyName', label: 'If Salaried, then Name of company employed with', type: 'text', required: false, conditional: 'profession', conditionalValue: 'Salaried' },
        { name: 'employmentVintage', label: 'If Salaried, Vintage of current employment', type: 'number', required: false, conditional: 'profession', conditionalValue: 'Salaried' },
        { name: 'firmName', label: 'If Self Employed, Name of the Firm', type: 'text', required: false, conditional: 'profession', conditionalValue: 'Self Employed' },
        { name: 'firmVintage', label: 'If Self Employed, Vintage of the firm', type: 'number', required: false, conditional: 'profession', conditionalValue: 'Self Employed' },
        { name: 'yearsKnowingCustomer', label: 'Number of Years Knowing the Customer', type: 'number', required: true },
        { name: 'interactionLevel', label: 'Level of interaction with customer', type: 'select', required: true, options: ['Frequent (D/W/M)', 'Occasional', 'Rare'] },
        { name: 'grossMargin', label: 'Gross Margin in business (sales - purchase or cost of service/production)', type: 'number', required: false }
      ]
    },
    {
      step: 3,
      title: 'Customer Business & Loan Details',
      fields: [
        { name: 'enterpriseName', label: 'Enterprise Name', type: 'text', required: true },
        { name: 'constitutionOfEnterprise', label: 'Constitution of Enterprise', type: 'select', required: true, options: ['Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'LLP', 'Others'] },
        { name: 'businessLocation', label: 'Location', type: 'text', required: true },
        { name: 'businessSegment', label: 'Business Segment', type: 'select', required: true, options: ['Trading', 'Manufacturing', 'Services', 'Agriculture', 'Others'] },
        { name: 'businessSubSegment', label: 'Business Sub-Segment', type: 'text', required: true },
        { name: 'businessVintage', label: 'Business Vintage (Years)', type: 'number', required: true },
        { name: 'workplaceOwnership', label: 'Workplace Ownership', type: 'select', required: true, options: ['Owned', 'Rented', 'Leased', 'Others'] },
        { name: 'workplaceVintage', label: 'Workplace Vintage (Years)', type: 'number', required: true },
        { name: 'workplaceSpace', label: 'Workplace Space (Sq feet)', type: 'number', required: true },
        { name: 'grossMarginBusiness', label: 'Gross Margin in business (sales - purchase or cost of service/production)', type: 'number', required: true },
        { name: 'regularEmployees', label: 'Number of paid regular employees', type: 'number', required: true },
        { name: 'loanType', label: 'Loan Type', type: 'select', required: true, options: ['Secured', 'Unsecured'] },
        { name: 'loanAmount', label: 'Loan Applied Amount (USD.)', type: 'number', required: true },
        { name: 'loanTenure', label: 'Tenure Applied (Months)', type: 'number', required: true },
        { name: 'interestRate', label: 'Rate of Interest (%)', type: 'number', required: true, step: 0.01 },
        { name: 'processingFee', label: 'Processing Fee', type: 'number', required: true, step: 0.01 },
        { name: 'endUse', label: 'End Use', type: 'select', required: true, options: ['Working Capital', 'Capital Expenditure', 'Both'] },
        { name: 'capitalExpenditureCost', label: 'Capital Expenditure Cost USD)', type: 'number', required: false },
        { name: 'expectedMarginWorkingCapital', label: 'Expected Customer Margin in Working Capital Transaction', type: 'number', required: true },
        { name: 'expectedMarginCapitalExpenditure', label: 'Expected Customer Margin in Capital Expenditure Transaction', type: 'number', required: true },
        { name: 'affordableEMI', label: 'Customer Afforable EMI (USD)', type: 'number', required: true },
        { name: 'loanEligibility', label: 'Loan Eligilibity as per Cash Flow Analysis and Policy (USD)', type: 'number', required: true },
        { name: 'loanAmountApproved', label: 'Loan Amount Approved (USD)- To be filled at the end', type: 'number', required: false },
        { name: 'loanPerProgramLTV', label: 'Loan per program LTV', type: 'number', required: true },
        { name: 'loanToMarketValue', label: 'Loan to Market Value (%)', type: 'number', required: true },
        { name: 'customerMarginTransaction', label: 'Customer Margin in Transaction (%)', type: 'number', required: true }
      ]
    },
    {
      step: 4,
      title: 'Property & Asset Details',
      fields: [
        // Property 1
        { name: 'property1Location', label: 'Property 1 - Location', type: 'text', required: false },
        { name: 'property1Type', label: 'Property 1 - Type of Property', type: 'select', required: false, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Others'] },
        { name: 'property1Status', label: 'Property 1 - Current Status', type: 'select', required: false, options: ['Owner Occupied', 'Rented', 'Vacant', 'Under Construction'] },
        { name: 'property1OwnedBy', label: 'Property 1 - Owned by', type: 'select', required: false, options: ['Sole', 'Jointly', 'Others'] },
        { name: 'property1Share', label: 'Property 1 - % Share', type: 'number', required: false },
        { name: 'property1MarketValue', label: 'Property 1 - Market Value (USD)', type: 'number', required: false },
        { name: 'property1LTVValue', label: 'Property 1 - Value to be considered as LTV', type: 'number', required: false },
        
        // Property 2
        { name: 'property2Location', label: 'Property 2 - Location', type: 'text', required: false },
        { name: 'property2Type', label: 'Property 2 - Type of Property', type: 'select', required: false, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Others'] },
        { name: 'property2Status', label: 'Property 2 - Current Status', type: 'select', required: false, options: ['Owner Occupied', 'Rented', 'Vacant', 'Under Construction'] },
        { name: 'property2OwnedBy', label: 'Property 2 - Owned by', type: 'select', required: false, options: ['Sole', 'Jointly', 'Others'] },
        { name: 'property2Share', label: 'Property 2 - % Share', type: 'number', required: false },
        { name: 'property2MarketValue', label: 'Property 2 - Market Value (USD)', type: 'number', required: false },
        { name: 'property2LTVValue', label: 'Property 2 - Value to be considered as LTV', type: 'number', required: false },
        
        // Property 3
        { name: 'property3Location', label: 'Property 3 - Location', type: 'text', required: false },
        { name: 'property3Type', label: 'Property 3 - Type of Property', type: 'select', required: false, options: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Others'] },
        { name: 'property3Status', label: 'Property 3 - Current Status', type: 'select', required: false, options: ['Owner Occupied', 'Rented', 'Vacant', 'Under Construction'] },
        { name: 'property3OwnedBy', label: 'Property 3 - Owned by', type: 'select', required: false, options: ['Sole', 'Jointly', 'Others'] },
        { name: 'property3Share', label: 'Property 3 - % Share', type: 'number', required: false },
        { name: 'property3MarketValue', label: 'Property 3 - Market Value (USD)', type: 'number', required: false },
        { name: 'property3LTVValue', label: 'Property 3 - Value to be considered as LTV', type: 'number', required: false },
        
        // Bank Details
        { name: 'bank1Name', label: 'Bank 1 - Bank Name', type: 'text', required: false },
        { name: 'bank1AccountType', label: 'Bank 1 - Account Type', type: 'select', required: false, options: ['Savings', 'Current', 'Fixed Deposit', 'Others'] },
        { name: 'bank1AccountOwner', label: 'Bank 1 - Account Owner', type: 'select', required: false, options: ['Applicant', 'Co-applicant', 'Joint'] },
        { name: 'bank1Balance', label: 'Bank 1 - Bank Balance including Fixed Deposit (USD)', type: 'number', required: false },
        
        { name: 'bank2Name', label: 'Bank 2 - Bank Name', type: 'text', required: false },
        { name: 'bank2AccountType', label: 'Bank 2 - Account Type', type: 'select', required: false, options: ['Savings', 'Current', 'Fixed Deposit', 'Others'] },
        { name: 'bank2AccountOwner', label: 'Bank 2 - Account Owner', type: 'select', required: false, options: ['Applicant', 'Co-applicant', 'Joint'] },
        { name: 'bank2Balance', label: 'Bank 2 - Bank Balance including Fixed Deposit (USD)', type: 'number', required: false }
      ]
    },
    {
      step: 5,
      title: 'Existing/Past Loans',
      fields: [
        // Customer Loans
        { name: 'customerLoan1Institution', label: 'Customer Loan 1 - Name Of Institution', type: 'text', required: false },
        { name: 'customerLoan1Amount', label: 'Customer Loan 1 - Loan amount', type: 'number', required: false },
        { name: 'customerLoan1EMI', label: 'Customer Loan 1 - EMI', type: 'number', required: false },
        { name: 'customerLoan1Outstanding', label: 'Customer Loan 1 - Loan Outstanding', type: 'number', required: false },
        { name: 'customerLoan1Tenor', label: 'Customer Loan 1 - Tenor', type: 'number', required: false },
        { name: 'customerLoan1PaidTenor', label: 'Customer Loan 1 - Paid Tenor', type: 'number', required: false },
        { name: 'customerLoan1BalanceTenor', label: 'Customer Loan 1 - Balance Tenor', type: 'number', required: false },
        { name: 'customerLoan1ToBeClosed', label: 'Customer Loan 1 - Loan to be Closed (Yes/No)', type: 'radio', required: false, options: ['Yes', 'No'] },
        { name: 'customerLoan1Obligate', label: 'Customer Loan 1 - Obligate', type: 'number', required: false },
        { name: 'customerLoan1PreviousObligation', label: 'Customer Loan 1 - Previous Loan Obligation', type: 'number', required: false },
        { name: 'customerLoan1EverOverdue', label: 'Customer Loan 1 - Ever Overdue', type: 'radio', required: false, options: ['Yes', 'No'] },
        
        { name: 'customerLoan2Institution', label: 'Customer Loan 2 - Name Of Institution', type: 'text', required: false },
        { name: 'customerLoan2Amount', label: 'Customer Loan 2 - Loan amount', type: 'number', required: false },
        { name: 'customerLoan2EMI', label: 'Customer Loan 2 - EMI', type: 'number', required: false },
        { name: 'customerLoan2Outstanding', label: 'Customer Loan 2 - Loan Outstanding', type: 'number', required: false },
        { name: 'customerLoan2Tenor', label: 'Customer Loan 2 - Tenor', type: 'number', required: false },
        { name: 'customerLoan2PaidTenor', label: 'Customer Loan 2 - Paid Tenor', type: 'number', required: false },
        { name: 'customerLoan2BalanceTenor', label: 'Customer Loan 2 - Balance Tenor', type: 'number', required: false },
        { name: 'customerLoan2ToBeClosed', label: 'Customer Loan 2 - Loan to be Closed (Yes/No)', type: 'radio', required: false, options: ['Yes', 'No'] },
        { name: 'customerLoan2Obligate', label: 'Customer Loan 2 - Obligate', type: 'number', required: false },
        { name: 'customerLoan2PreviousObligation', label: 'Customer Loan 2 - Previous Loan Obligation', type: 'number', required: false },
        { name: 'customerLoan2EverOverdue', label: 'Customer Loan 2 - Ever Overdue', type: 'radio', required: false, options: ['Yes', 'No'] },
        
        { name: 'customerLoan3Institution', label: 'Customer Loan 3 - Name Of Institution', type: 'text', required: false },
        { name: 'customerLoan3Amount', label: 'Customer Loan 3 - Loan amount', type: 'number', required: false },
        { name: 'customerLoan3EMI', label: 'Customer Loan 3 - EMI', type: 'number', required: false },
        { name: 'customerLoan3Outstanding', label: 'Customer Loan 3 - Loan Outstanding', type: 'number', required: false },
        { name: 'customerLoan3Tenor', label: 'Customer Loan 3 - Tenor', type: 'number', required: false },
        { name: 'customerLoan3PaidTenor', label: 'Customer Loan 3 - Paid Tenor', type: 'number', required: false },
        { name: 'customerLoan3BalanceTenor', label: 'Customer Loan 3 - Balance Tenor', type: 'number', required: false },
        { name: 'customerLoan3ToBeClosed', label: 'Customer Loan 3 - Loan to be Closed (Yes/No)', type: 'radio', required: false, options: ['Yes', 'No'] },
        { name: 'customerLoan3Obligate', label: 'Customer Loan 3 - Obligate', type: 'number', required: false },
        { name: 'customerLoan3PreviousObligation', label: 'Customer Loan 3 - Previous Loan Obligation', type: 'number', required: false },
        { name: 'customerLoan3EverOverdue', label: 'Customer Loan 3 - Ever Overdue', type: 'radio', required: false, options: ['Yes', 'No'] }
      ]
    },
    {
      step: 6,
      title: 'Verification Details',
      fields: [
        // Supplier Verification 1
        { name: 'supplier1Name', label: 'Supplier 1 - Name of the Supplier', type: 'text', required: false },
        { name: 'supplier1Location', label: 'Supplier 1 - Location', type: 'text', required: false },
        { name: 'supplier1Years', label: 'Supplier 1 - Number of Years supplying to the Customer', type: 'number', required: false },
        { name: 'supplier1Frequency', label: 'Supplier 1 - Supply Frequency', type: 'select', required: false, options: ['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Yearly'] },
        { name: 'supplier1Product', label: 'Supplier 1 - Type of product/service supplied', type: 'text', required: false },
        { name: 'supplier1Amount', label: 'Supplier 1 - Average Supply Amount (USD)', type: 'number', required: false },
        { name: 'supplier1PaymentTerms', label: 'Supplier 1 - Payment Terms', type: 'select', required: false, options: ['Cash', 'Credit'] },
        { name: 'supplier1PaymentMode', label: 'Supplier 1 - Payment Mode', type: 'text', required: false },
        { name: 'supplier1CreditDays', label: 'Supplier 1 - If Credit then how many days credit', type: 'number', required: false, conditional: 'supplier1PaymentTerms', conditionalValue: 'Credit' },
        { name: 'supplier1Timeliness', label: 'Supplier 1 - Payment Timeliness', type: 'select', required: false, options: ['On or Before Time', 'Late', 'Very Late'] },
        { name: 'supplier1Feedback', label: 'Supplier 1 - Supplier Feedback on Customer', type: 'select', required: false, options: ['Positive', 'Negative', 'Neutral'] },
        
        // Buyer Verification 1
        { name: 'buyer1Name', label: 'Buyer 1 - Name of the Buyer', type: 'text', required: false },
        { name: 'buyer1Mobile', label: 'Buyer 1 - Mobile Number', type: 'tel', required: false },
        { name: 'buyer1Location', label: 'Buyer 1 - Location', type: 'text', required: false },
        { name: 'buyer1Years', label: 'Buyer 1 - Number of Years purchasing from the Customer', type: 'number', required: false },
        { name: 'buyer1Frequency', label: 'Buyer 1 - Purchase Frequency', type: 'select', required: false, options: ['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Yearly'] },
        { name: 'buyer1Amount', label: 'Buyer 1 - Average Purchase Amount (USD)', type: 'number', required: false },
        { name: 'buyer1PaymentTerms', label: 'Buyer 1 - Payment Terms', type: 'select', required: false, options: ['Cash', 'Credit'] },
        { name: 'buyer1PaymentMode', label: 'Buyer 1 - Payment Mode', type: 'text', required: false },
        { name: 'buyer1Quality', label: 'Buyer 1 - Product/Service Quality', type: 'select', required: false, options: ['Excellent', 'Good', 'Average', 'Poor'] },
        { name: 'buyer1CreditDays', label: 'Buyer 1 - If Credit then how many days credit', type: 'number', required: false, conditional: 'buyer1PaymentTerms', conditionalValue: 'Credit' },
        { name: 'buyer1Feedback', label: 'Buyer 1 - Buyer Feedback on Customer', type: 'select', required: false, options: ['Positive', 'Negative', 'Neutral'] },
        
        // Personal Reference
        { name: 'personalRefName', label: 'Personal Reference - Name of the Person', type: 'text', required: false },
        { name: 'personalRefMobile', label: 'Personal Reference - Mobile Number', type: 'tel', required: false },
        { name: 'personalRefLocation', label: 'Personal Reference - Location', type: 'text', required: false },
        { name: 'personalRefRelation', label: 'Personal Reference - Relation with the Customer', type: 'select', required: false, options: ['Family', 'Friend', 'Colleague', 'Business Partner', 'Others'] },
        { name: 'personalRefYears', label: 'Personal Reference - Number of Years Knowing the Customer', type: 'number', required: false },
        { name: 'personalRefInteraction', label: 'Personal Reference - Level of interaction with customer', type: 'select', required: false, options: ['High', 'Medium', 'Low'] },
        { name: 'personalRefFeedback', label: 'Personal Reference - Feedback on Customer', type: 'select', required: false, options: ['Positive', 'Negative', 'Neutral'] }
      ]
    }
  ]
};
