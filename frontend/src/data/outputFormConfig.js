// Output Sheet Form Configuration - Cash Flow & Loan Analysis
// Based on analysis of "Output Sheet <=$50000" - 58 input fields across 6 sections

export const outputFormSections = [
  {
    id: 1,
    title: 'Cash Flow Analysis',
    description: 'Primary cash inflow and outflow analysis for the business',
    fields: [
      {
        name: 'customer_cash_flow',
        label: 'Customer Cash Flow (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter customer cash flow amount'
      },
      {
        name: 'co_applicant_cash_flow',
        label: 'Co Applicant/Guarantor Cash Flow (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter co-applicant cash flow amount'
      },
      {
        name: 'business_cash_outflow',
        label: 'Business Cash Outflow (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total business outflow'
      },
      {
        name: 'total_business_outflow',
        label: 'Total Business Outflow (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter calculated total business outflow'
      },
      {
        name: 'monthly_cash_in_hand',
        label: 'Monthly Cash In Hand (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly cash available'
      }
    ]
  },
  {
    id: 2,
    title: 'Business Operations',
    description: 'Sales data, purchase information, and core business metrics',
    fields: [
      {
        name: 'sales_daily',
        label: 'Sales Daily (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter daily sales amount'
      },
      {
        name: 'sales_weekly',
        label: 'Sales Weekly (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter weekly sales amount'
      },
      {
        name: 'sales_monthly',
        label: 'Sales Monthly (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly sales amount'
      },
      {
        name: 'monthly_sales_average',
        label: 'Monthly Sales Average (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter average monthly sales'
      },
      {
        name: 'business_income',
        label: 'Business Income (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total business income'
      },
      {
        name: 'average_sales_register',
        label: 'Average Sales as per Register (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter sales from register records'
      },
      {
        name: 'sales_volume_monthly',
        label: 'Sales Volume Monthly (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly sales volume'
      },
      {
        name: 'total_sales',
        label: 'Total Sales (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total sales amount'
      },
      {
        name: 'purchases',
        label: 'Purchases (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total purchases'
      },
      {
        name: 'purchases_usd',
        label: 'Purchases USD (Detailed)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter detailed purchase amount'
      },
      {
        name: 'total_monthly_purchase',
        label: 'Total Monthly Purchase (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total monthly purchases'
      },
      {
        name: 'average_purchase_register',
        label: 'Average Purchase as per Register (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter purchases from register'
      },
      {
        name: 'sales_growth',
        label: 'Sales Growth (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter sales growth percentage'
      },
      {
        name: 'annual_sales_usd',
        label: 'Annual Sales USD',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter annual sales amount'
      },
      {
        name: 'average_credit_throughput',
        label: 'Average Credit Throughput to Monthly Sales',
        type: 'number',
        required: true,
        min: 0,
        max: 1,
        step: 0.0001,
        placeholder: 'Enter credit throughput ratio'
      }
    ]
  },
  {
    id: 3,
    title: 'Business Expenses',
    description: 'Detailed breakdown of business operational expenses',
    fields: [
      {
        name: 'rental_income_co_applicant',
        label: 'Rental Income (Co Applicant/Guarantor) (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter rental income of co-applicant'
      },
      {
        name: 'salary_income_co_applicant',
        label: 'Salary Income (Co Applicant/Guarantor) (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter salary income of co-applicant'
      },
      {
        name: 'shop_rent',
        label: 'Shop/Godown/Factory Rent (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly rent amount'
      },
      {
        name: 'electricity',
        label: 'Electricity (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly electricity cost'
      },
      {
        name: 'staff_salary',
        label: 'Staff Salary (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total staff salary'
      },
      {
        name: 'transport_conveyance',
        label: 'Transport/Conveyance (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter transport expenses'
      },
      {
        name: 'labour_expense',
        label: 'Labour Expense (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter labour costs'
      },
      {
        name: 'other_business_expense',
        label: 'Other Business Expense (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter other business expenses'
      },
      {
        name: 'current_loan',
        label: 'Current Loan (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter existing loan amount'
      },
      {
        name: 'current_working_capital_funded',
        label: 'Current Working Capital Funded (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter current working capital'
      }
    ]
  },
  {
    id: 4,
    title: 'Financial Ratios & Margins',
    description: 'Profit margins and financial performance indicators',
    fields: [
      {
        name: 'margin',
        label: 'Margin (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter profit margin percentage'
      },
      {
        name: 'product_margin',
        label: 'Product Margin (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter product margin percentage'
      },
      {
        name: 'gp_margin',
        label: 'GP Margin (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter gross profit margin'
      },
      {
        name: 'gp_margin_considered',
        label: 'GP Margin Considered (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter considered GP margin'
      },
      {
        name: 'np_margin',
        label: 'NP Margin (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter net profit margin'
      },
      {
        name: 'actual_customer_margin',
        label: 'Actual Customer Margin (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter actual customer margin'
      },
      {
        name: 'customer_equity_margin_stated',
        label: 'Customer Equity/Margin - Stated (%)',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 0.01,
        placeholder: 'Enter stated customer equity margin'
      }
    ]
  },
  {
    id: 5,
    title: 'Loan Parameters',
    description: 'Loan eligibility and repayment calculations',
    fields: [
      {
        name: 'debtors',
        label: 'Debtors (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter debtors amount'
      },
      {
        name: 'existing_loan_emi',
        label: 'Existing Loan EMI (Personal + Business) + OD CC Interest (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter existing EMI obligations'
      },
      {
        name: 'customer_affordable_emi',
        label: 'Customer Affordable EMI (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter affordable EMI amount'
      },
      {
        name: 'eligible_loan_amount',
        label: 'Eligible Loan Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter eligible loan amount'
      },
      {
        name: 'max_loan_amount',
        label: 'Max Loan Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter maximum loan amount'
      },
      {
        name: 'loan_amount_ltv',
        label: 'Loan Amount as per LTV (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter loan amount per LTV'
      },
      {
        name: 'final_emi_amount',
        label: 'Final EMI Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter final EMI amount'
      }
    ]
  },
  {
    id: 6,
    title: 'Additional Information',
    description: 'Supporting income sources and operational details',
    fields: [
      {
        name: 'frequency',
        label: 'Sales Frequency',
        type: 'select',
        required: true,
        options: ['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Annualy'],
        placeholder: 'Select sales frequency'
      },
      {
        name: 'agriculture_income_co_applicant',
        label: 'Agriculture Income (Co Applicant/Guarantor) (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter agriculture income'
      },
      {
        name: 'allied_agri_income_co_applicant',
        label: 'Allied Agri Income (Co Applicant/Guarantor) (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter allied agriculture income'
      },
      {
        name: 'other_income_co_applicant',
        label: 'Other Income - Interest etc (Co Applicant/Guarantor) (USD)',
        type: 'number',
        required: false,
        min: 0,
        placeholder: 'Enter other income sources'
      },
      {
        name: 'purchase_frequency_weekly',
        label: 'Weekly Purchase Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter weekly purchase amount'
      },
      {
        name: 'purchase_frequency_monthly',
        label: 'Monthly Purchase Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter monthly purchase amount'
      },
      {
        name: 'customer_category',
        label: 'Customer Category',
        type: 'select',
        required: true,
        options: ['New', 'Existing'],
        placeholder: 'Select customer category'
      },
      {
        name: 'creditors',
        label: 'Creditors (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter creditors amount'
      },
      {
        name: 'net_profit_business',
        label: 'Net Profit From Business (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter net profit from business'
      },
      {
        name: 'net_profit_lower_gpm',
        label: 'Net Profit Based on Lower GPM (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter net profit based on lower GPM'
      },
      {
        name: 'total_monthly_surplus',
        label: 'Total Monthly Surplus (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter total monthly surplus'
      },
      {
        name: 'customer_contribution',
        label: 'Customer Contribution (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter customer contribution amount'
      },
      {
        name: 'funding_amount_required',
        label: 'Funding Amount Required (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter required funding amount'
      },
      {
        name: 'final_amount',
        label: 'Final Amount (USD)',
        type: 'number',
        required: true,
        min: 0,
        placeholder: 'Enter final loan amount'
      }
    ]
  }
];

// Auto-calculation formulas based on Excel sheet logic
export const calculationFormulas = {
  // Total Business Outflow = Sum of all expenses
  total_business_outflow: (data) => {
    const expenses = [
      'shop_rent', 'electricity', 'staff_salary', 'transport_conveyance',
      'labour_expense', 'other_business_expense'
    ];
    return expenses.reduce((sum, field) => sum + (parseFloat(data[field]) || 0), 0);
  },

  // Monthly Sales Average = (Daily * 30 + Weekly * 4 + Monthly) / 3
  monthly_sales_average: (data) => {
    const daily = (parseFloat(data.sales_daily) || 0) * 30;
    const weekly = (parseFloat(data.sales_weekly) || 0) * 4;
    const monthly = parseFloat(data.sales_monthly) || 0;
    return (daily + weekly + monthly) / 3;
  },

  // Total Sales = Sum of all sales volumes
  total_sales: (data) => {
    const salesVolume = parseFloat(data.sales_volume_monthly) || 0;
    const monthlySales = parseFloat(data.sales_monthly) || 0;
    return Math.max(salesVolume, monthlySales);
  },

  // Business Income = Monthly Sales Average
  business_income: (data) => {
    return parseFloat(data.monthly_sales_average) || 0;
  },

  // GP Margin = (Sales - Purchases) / Sales * 100
  gp_margin: (data) => {
    const sales = parseFloat(data.total_sales) || parseFloat(data.monthly_sales_average) || 0;
    const purchases = parseFloat(data.total_monthly_purchase) || parseFloat(data.purchases) || 0;
    return sales > 0 ? ((sales - purchases) / sales) * 100 : 0;
  },

  // GP Margin Considered = GP Margin (same value)
  gp_margin_considered: (data) => {
    return parseFloat(data.gp_margin) || 0;
  },

  // NP Margin = GP Margin - (Total Outflow / Sales) * 100
  np_margin: (data) => {
    const gpMargin = parseFloat(data.gp_margin) || 0;
    const sales = parseFloat(data.total_sales) || parseFloat(data.monthly_sales_average) || 0;
    const outflow = parseFloat(data.total_business_outflow) || 0;
    const operatingCostRatio = sales > 0 ? (outflow / sales) * 100 : 0;
    return Math.max(0, gpMargin - operatingCostRatio);
  },

  // Net Profit = (Sales * NP Margin) / 100
  net_profit_business: (data) => {
    const sales = parseFloat(data.total_sales) || parseFloat(data.monthly_sales_average) || 0;
    const npMargin = parseFloat(data.np_margin) || 0;
    return (sales * npMargin) / 100;
  },

  // Net Profit Lower GPM = Net Profit (conservative estimate)
  net_profit_lower_gpm: (data) => {
    return parseFloat(data.net_profit_business) || 0;
  },

  // Total Monthly Surplus = Net Profit - Existing Loan EMI
  total_monthly_surplus: (data) => {
    const netProfit = parseFloat(data.net_profit_business) || 0;
    const existingEMI = parseFloat(data.existing_loan_emi) || 0;
    return Math.max(0, netProfit - existingEMI);
  },

  // Annual Sales = Monthly Sales * 12
  annual_sales_usd: (data) => {
    const monthly = parseFloat(data.monthly_sales_average) || 0;
    return monthly * 12;
  },

  // Eligible Loan Amount = (Monthly Surplus * 0.65 * 24) - existing obligations
  eligible_loan_amount: (data) => {
    const monthlySurplus = parseFloat(data.total_monthly_surplus) || 0;
    const affordableEMI = parseFloat(data.customer_affordable_emi) || 0;
    const eligibleEMI = Math.min(monthlySurplus * 0.65, affordableEMI);
    
    // Calculate loan amount using EMI formula
    const tenure = 24;
    const rate = 0.12 / 12; // 12% annual rate
    
    if (eligibleEMI > 0 && rate > 0) {
      const loanAmount = eligibleEMI * ((Math.pow(1 + rate, tenure) - 1) / 
                         (rate * Math.pow(1 + rate, tenure)));
      return Math.round(loanAmount);
    }
    return 0;
  },

  // Max Loan Amount = minimum of eligible amount and applied amount
  max_loan_amount: (data) => {
    const eligible = parseFloat(data.eligible_loan_amount) || 0;
    const applied = parseFloat(data.final_amount) || 0;
    return applied > 0 ? Math.min(eligible, applied) : eligible;
  },

  // LTV calculation (assuming 70% max LTV for secured loans)
  loan_amount_ltv: (data) => {
    const maxLoan = parseFloat(data.max_loan_amount) || 0;
    // Assuming property value is derived from max loan / 0.7 (70% LTV)
    return maxLoan * 1.2; // Shows the LTV capacity
  },

  // Final EMI calculation based on final loan amount
  final_emi_amount: (data) => {
    const loanAmount = parseFloat(data.final_amount) || parseFloat(data.max_loan_amount) || 0;
    const tenure = 24; // Default tenure in months
    const rate = 0.12 / 12; // Monthly interest rate (12% annual)
    
    if (loanAmount > 0) {
      const emi = (loanAmount * rate * Math.pow(1 + rate, tenure)) / 
                  (Math.pow(1 + rate, tenure) - 1);
      return Math.round(emi * 100) / 100;
    }
    return 0;
  },

  // Customer Contribution (25% of working capital requirement)
  customer_contribution: (data) => {
    const workingCapitalReq = parseFloat(data.funding_amount_required) || 0;
    return workingCapitalReq * 0.25;
  },

  // Actual Customer Margin based on equity contribution
  actual_customer_margin: (data) => {
    const contribution = parseFloat(data.customer_contribution) || 0;
    const totalFunding = parseFloat(data.funding_amount_required) || 0;
    return totalFunding > 0 ? (contribution / totalFunding) * 100 : 0;
  },

  // Credit Throughput Ratio = Debtors / Monthly Sales
  average_credit_throughput: (data) => {
    const debtors = parseFloat(data.debtors) || 0;
    const monthlySales = parseFloat(data.monthly_sales_average) || 0;
    return monthlySales > 0 ? debtors / monthlySales : 0;
  }
};

export default { outputFormSections, calculationFormulas };