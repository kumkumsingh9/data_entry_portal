// Financial Analysis Configuration for Loans >$50000
// Based on comprehensive Excel sheet analysis - 97 input fields, 36+ calculated fields

export const financialAnalysisConfig = {
  title: "Financial Analysis for Loan Amount >$50000",
  description: "Comprehensive financial assessment with P&L, Balance Sheet, Ratios, Cash Flow and Personal Net Worth analysis",
  currency: "USD",
  
  sections: [
    {
      name: "profit_loss",
      title: "Profit & Loss Account (3-Year Analysis)",
      description: "Income statement analysis with projected, current and previous year data",
      icon: "📊",
      fields: [
        // Operating Income
        { 
          name: "sales_projected_2025", 
          label: "Sales (Projected 2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Projected sales revenue for 2025"
        },
        { 
          name: "sales_actual_2024", 
          label: "Sales (Actual 2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Actual sales revenue for 2024"
        },
        { 
          name: "sales_actual_2023", 
          label: "Sales (Actual 2023)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Actual sales revenue for 2023"
        },
        { 
          name: "other_business_income_2025", 
          label: "Other Business Income (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Additional business income for 2025"
        },
        { 
          name: "other_business_income_2024", 
          label: "Other Business Income (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Additional business income for 2024"
        },

        // Cost of Goods Sold
        { 
          name: "purchases_2025", 
          label: "Purchases (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Cost of raw materials and goods purchased"
        },
        { 
          name: "purchases_2024", 
          label: "Purchases (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Cost of raw materials and goods purchased"
        },
        { 
          name: "direct_expenses_2025", 
          label: "Direct Expenses - Wages, Overheads (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Direct manufacturing expenses including wages"
        },
        { 
          name: "direct_expenses_2024", 
          label: "Direct Expenses - Wages, Overheads (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Direct manufacturing expenses including wages"
        },
        { 
          name: "stock_changes_2025", 
          label: "Changes in Stock - Closing minus Opening (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Inventory changes (positive for increase, negative for decrease)"
        },
        { 
          name: "stock_changes_2024", 
          label: "Changes in Stock - Closing minus Opening (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Inventory changes (positive for increase, negative for decrease)"
        },

        // Indirect Expenses
        { 
          name: "admin_expenses_2025", 
          label: "General & Admin Expenses (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Administrative and general business expenses"
        },
        { 
          name: "admin_expenses_2024", 
          label: "General & Admin Expenses (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Administrative and general business expenses"
        },
        { 
          name: "personnel_cost_2025", 
          label: "Personnel Cost (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Salaries, benefits, and personnel-related costs"
        },
        { 
          name: "personnel_cost_2024", 
          label: "Personnel Cost (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Salaries, benefits, and personnel-related costs"
        },
        { 
          name: "selling_expenses_2025", 
          label: "Selling and Distribution Expenses (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Marketing, sales, and distribution costs"
        },
        { 
          name: "selling_expenses_2024", 
          label: "Selling and Distribution Expenses (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Marketing, sales, and distribution costs"
        },
        { 
          name: "misc_expenses_2025", 
          label: "Miscellaneous/Deferred Revenue Expenses (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other miscellaneous business expenses"
        },
        { 
          name: "misc_expenses_2024", 
          label: "Miscellaneous/Deferred Revenue Expenses (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other miscellaneous business expenses"
        },

        // Other P&L Items
        { 
          name: "depreciation_2025", 
          label: "Depreciation and Amortisation (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Depreciation on assets and amortization"
        },
        { 
          name: "depreciation_2024", 
          label: "Depreciation and Amortisation (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Depreciation on assets and amortization"
        },
        { 
          name: "interest_charges_2025", 
          label: "Interest and Finance Charges (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Interest paid on loans and finance charges"
        },
        { 
          name: "interest_charges_2024", 
          label: "Interest and Finance Charges (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Interest paid on loans and finance charges"
        },
        { 
          name: "non_operating_income_2025", 
          label: "Non Operating Income (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Income from non-business activities"
        },
        { 
          name: "non_operating_income_2024", 
          label: "Non Operating Income (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Income from non-business activities"
        },
        { 
          name: "non_operating_expenses_2025", 
          label: "Non Operating Expenses (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Expenses from non-business activities"
        },
        { 
          name: "non_operating_expenses_2024", 
          label: "Non Operating Expenses (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Expenses from non-business activities"
        },
        { 
          name: "tax_2025", 
          label: "Tax (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Income tax and other statutory taxes"
        },
        { 
          name: "tax_2024", 
          label: "Tax (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Income tax and other statutory taxes"
        }
      ]
    },

    {
      name: "balance_sheet", 
      title: "Balance Sheet Analysis (3-Year)",
      description: "Assets, Liabilities and Equity analysis",
      icon: "🏛️",
      fields: [
        // Equity Capital
        { 
          name: "equity_share_capital_2025", 
          label: "Equity and Preference Share Capital (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total share capital invested"
        },
        { 
          name: "equity_share_capital_2024", 
          label: "Equity and Preference Share Capital (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total share capital invested"
        },
        { 
          name: "quasi_equity_2025", 
          label: "Quasi Equity - Promoter Loans (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Promoter loans not requiring immediate repayment"
        },
        { 
          name: "quasi_equity_2024", 
          label: "Quasi Equity - Promoter Loans (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Promoter loans not requiring immediate repayment"
        },
        { 
          name: "reserves_2025", 
          label: "General Reserve, Share Premium and Other Reserves (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Accumulated profits and reserves"
        },
        { 
          name: "reserves_2024", 
          label: "General Reserve, Share Premium and Other Reserves (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Accumulated profits and reserves"
        },
        { 
          name: "revaluation_reserve_2025", 
          label: "Revaluation Reserve (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Reserve from asset revaluation"
        },
        { 
          name: "revaluation_reserve_2024", 
          label: "Revaluation Reserve (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Reserve from asset revaluation"
        },

        // Long Term Debt
        { 
          name: "long_term_borrowings_2025", 
          label: "Long Term Borrowings from Banks & NBFCs (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Term loans and long-term debt"
        },
        { 
          name: "long_term_borrowings_2024", 
          label: "Long Term Borrowings from Banks & NBFCs (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Term loans and long-term debt"
        },
        { 
          name: "affiliate_borrowings_2025", 
          label: "Borrowings from Affiliates & Associates (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Loans from related parties"
        },
        { 
          name: "affiliate_borrowings_2024", 
          label: "Borrowings from Affiliates & Associates (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Loans from related parties"
        },
        { 
          name: "other_borrowings_2025", 
          label: "Other Borrowings/Provisions (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other long-term liabilities and provisions"
        },
        { 
          name: "other_borrowings_2024", 
          label: "Other Borrowings/Provisions (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other long-term liabilities and provisions"
        },

        // Current Liabilities
        { 
          name: "short_term_affiliate_borrowings_2025", 
          label: "Short Term Borrowings from Affiliates (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Short-term loans from related parties"
        },
        { 
          name: "short_term_affiliate_borrowings_2024", 
          label: "Short Term Borrowings from Affiliates (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Short-term loans from related parties"
        },
        { 
          name: "creditors_2025", 
          label: "Creditors and Bills Payable (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade creditors and payables"
        },
        { 
          name: "creditors_2024", 
          label: "Creditors and Bills Payable (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade creditors and payables"
        },
        { 
          name: "wc_limit_2025", 
          label: "Working Capital Limit from Banks (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Utilized working capital facilities"
        },
        { 
          name: "wc_limit_2024", 
          label: "Working Capital Limit from Banks (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Utilized working capital facilities"
        },
        { 
          name: "tax_provision_2025", 
          label: "Provision for Taxation (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Tax provisions and accruals"
        },
        { 
          name: "tax_provision_2024", 
          label: "Provision for Taxation (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Tax provisions and accruals"
        },
        { 
          name: "other_liabilities_2025", 
          label: "Other Liabilities (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other current liabilities and accruals"
        },
        { 
          name: "other_liabilities_2024", 
          label: "Other Liabilities (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other current liabilities and accruals"
        },

        // Fixed Assets
        { 
          name: "gross_fixed_assets_2025", 
          label: "Gross Block of Fixed Assets (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total cost of fixed assets before depreciation"
        },
        { 
          name: "gross_fixed_assets_2024", 
          label: "Gross Block of Fixed Assets (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total cost of fixed assets before depreciation"
        },
        { 
          name: "accumulated_depreciation_2025", 
          label: "Less: Accumulated Depreciation (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total depreciation charged till date"
        },
        { 
          name: "accumulated_depreciation_2024", 
          label: "Less: Accumulated Depreciation (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Total depreciation charged till date"
        },
        { 
          name: "capital_wip_2025", 
          label: "Capital Work In Progress (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Assets under construction"
        },
        { 
          name: "capital_wip_2024", 
          label: "Capital Work In Progress (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Assets under construction"
        },
        { 
          name: "investments_2025", 
          label: "Investments (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Long-term investments"
        },
        { 
          name: "investments_2024", 
          label: "Investments (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Long-term investments"
        },
        { 
          name: "deferred_tax_2025", 
          label: "Deferred Tax Asset (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Deferred tax assets net of liabilities"
        },
        { 
          name: "deferred_tax_2024", 
          label: "Deferred Tax Asset (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Deferred tax assets net of liabilities"
        },

        // Current Assets
        { 
          name: "inventories_2025", 
          label: "Inventories (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Stock of raw materials, WIP, and finished goods"
        },
        { 
          name: "inventories_2024", 
          label: "Inventories (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Stock of raw materials, WIP, and finished goods"
        },
        { 
          name: "debtors_gt6m_2025", 
          label: "Debtors > 6 months (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade receivables overdue by more than 6 months"
        },
        { 
          name: "debtors_gt6m_2024", 
          label: "Debtors > 6 months (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade receivables overdue by more than 6 months"
        },
        { 
          name: "debtors_lt6m_2025", 
          label: "Debtors < 6 months (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade receivables within 6 months"
        },
        { 
          name: "debtors_lt6m_2024", 
          label: "Debtors < 6 months (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Trade receivables within 6 months"
        },
        { 
          name: "cash_bank_2025", 
          label: "Cash and Bank (2025)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Cash in hand and bank balances"
        },
        { 
          name: "cash_bank_2024", 
          label: "Cash and Bank (2024)", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Cash in hand and bank balances"
        },
        { 
          name: "other_current_assets_2025", 
          label: "Other Current Assets (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other current assets and prepayments"
        },
        { 
          name: "other_current_assets_2024", 
          label: "Other Current Assets (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other current assets and prepayments"
        },

        // Loans & Advances
        { 
          name: "director_loans_2025", 
          label: "Loans & Advances to Directors/Partners (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Advances given to directors and partners"
        },
        { 
          name: "director_loans_2024", 
          label: "Loans & Advances to Directors/Partners (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Advances given to directors and partners"
        },
        { 
          name: "other_loans_advances_2025", 
          label: "Other Loans and Advances (2025)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other loans and advances given"
        },
        { 
          name: "other_loans_advances_2024", 
          label: "Other Loans and Advances (2024)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other loans and advances given"
        }
      ]
    },

    {
      name: "personal_networth",
      title: "Personal Net Worth Statement", 
      description: "Personal assets and liabilities assessment",
      icon: "👤",
      fields: [
        // Personal Assets
        { 
          name: "savings_bank", 
          label: "Savings in Bank", 
          type: "currency", 
          required: true, 
          category: "input",
          helpText: "Personal savings account balances"
        },
        { 
          name: "fixed_deposits", 
          label: "Fixed Deposit in Bank/NBFI/Post Office", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Fixed deposits and term deposits"
        },
        { 
          name: "cash_hand", 
          label: "Cash In Hand", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Physical cash holdings"
        },
        { 
          name: "property_value", 
          label: "Property (Market Value)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Residential and commercial property values"
        },
        { 
          name: "land_value", 
          label: "Land (Market Value)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Land holdings at current market value"
        },
        { 
          name: "recurring_deposits", 
          label: "Recurring Deposit/SIP", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Recurring deposits and SIP investments"
        },
        { 
          name: "insurance_surrender", 
          label: "Insurance Surrender Value", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Surrender value of insurance policies"
        },
        { 
          name: "precious_metals", 
          label: "Gold/Silver/Precious Metals", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Value of precious metals and jewelry"
        },
        { 
          name: "vehicles_value", 
          label: "Vehicles (Market Value)", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Current market value of vehicles"
        },
        { 
          name: "other_personal_assets", 
          label: "Other Personal Assets", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other valuable personal assets"
        },

        // Personal Liabilities
        { 
          name: "home_loan_pos", 
          label: "Home Loan Outstanding", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Outstanding balance on home loans"
        },
        { 
          name: "vehicle_loan_pos", 
          label: "Vehicle Loan Outstanding", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Outstanding balance on vehicle loans"
        },
        { 
          name: "unsecured_loan_pos", 
          label: "Unsecured Loan Outstanding", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Personal loans and unsecured debt"
        },
        { 
          name: "msme_loan_pos", 
          label: "MSME Loan Outstanding", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Outstanding MSME and business loans"
        },
        { 
          name: "other_loans_pos", 
          label: "Other Loans Outstanding", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other personal loan obligations"
        },
        { 
          name: "credit_card_dues", 
          label: "Credit Card Dues", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Outstanding credit card balances"
        },
        { 
          name: "tax_dues", 
          label: "Tax Dues", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Outstanding tax liabilities"
        },
        { 
          name: "other_dues", 
          label: "Other Dues", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Other personal liabilities and dues"
        }
      ]
    },

    {
      name: "loan_information",
      title: "Loan Information & Working Capital Assessment",
      description: "Loan amount and working capital requirements",
      icon: "💰",
      fields: [
        { 
          name: "loan_amount", 
          label: "Loan Amount Required", 
          type: "currency", 
          required: true, 
          category: "input", 
          default: 50000,
          helpText: "Total loan amount being applied for (must be >$50000)"
        },
        { 
          name: "existing_bank_borrowing", 
          label: "Existing Bank Borrowing for Working Capital", 
          type: "currency", 
          required: false, 
          category: "input",
          helpText: "Current working capital facilities utilized"
        }
      ]
    }
  ]
};

// Financial calculation formulas
export const financialCalculations = {
  // P&L Calculations
  totalOperatingIncome: (data) => {
    const sales = parseFloat(data.sales_projected_2025 || 0);
    const otherIncome = parseFloat(data.other_business_income_2025 || 0);
    return sales + otherIncome;
  },

  totalCogs: (data) => {
    const purchases = parseFloat(data.purchases_2025 || 0);
    const directExpenses = parseFloat(data.direct_expenses_2025 || 0);
    const stockChanges = parseFloat(data.stock_changes_2025 || 0);
    return purchases + directExpenses + stockChanges;
  },

  totalIndirectExpenses: (data) => {
    const admin = parseFloat(data.admin_expenses_2025 || 0);
    const personnel = parseFloat(data.personnel_cost_2025 || 0);
    const selling = parseFloat(data.selling_expenses_2025 || 0);
    const misc = parseFloat(data.misc_expenses_2025 || 0);
    return admin + personnel + selling + misc;
  },

  ebitda: (data) => {
    const totalIncome = financialCalculations.totalOperatingIncome(data);
    const totalCogs = financialCalculations.totalCogs(data);
    const totalIndirect = financialCalculations.totalIndirectExpenses(data);
    return totalIncome - totalCogs - totalIndirect;
  },

  ebit: (data) => {
    const ebitda = financialCalculations.ebitda(data);
    const depreciation = parseFloat(data.depreciation_2025 || 0);
    return ebitda - depreciation;
  },

  pat: (data) => {
    const ebit = financialCalculations.ebit(data);
    const interest = parseFloat(data.interest_charges_2025 || 0);
    const nonOpIncome = parseFloat(data.non_operating_income_2025 || 0);
    const nonOpExpenses = parseFloat(data.non_operating_expenses_2025 || 0);
    const tax = parseFloat(data.tax_2025 || 0);
    return ebit - interest + nonOpIncome - nonOpExpenses - tax;
  },

  // Balance Sheet Calculations
  netWorth: (data) => {
    const equity = parseFloat(data.equity_share_capital_2025 || 0);
    const quasiEquity = parseFloat(data.quasi_equity_2025 || 0);
    const reserves = parseFloat(data.reserves_2025 || 0);
    return equity + quasiEquity + reserves;
  },

  totalCurrentAssets: (data) => {
    const inventories = parseFloat(data.inventories_2025 || 0);
    const debtorsGt6m = parseFloat(data.debtors_gt6m_2025 || 0);
    const debtorsLt6m = parseFloat(data.debtors_lt6m_2025 || 0);
    const cash = parseFloat(data.cash_bank_2025 || 0);
    const otherAssets = parseFloat(data.other_current_assets_2025 || 0);
    return inventories + debtorsGt6m + debtorsLt6m + cash + otherAssets;
  },

  totalCurrentLiabilities: (data) => {
    const affiliateBorrowings = parseFloat(data.short_term_affiliate_borrowings_2025 || 0);
    const creditors = parseFloat(data.creditors_2025 || 0);
    const wcLimit = parseFloat(data.wc_limit_2025 || 0);
    const taxProvision = parseFloat(data.tax_provision_2025 || 0);
    const otherLiabilities = parseFloat(data.other_liabilities_2025 || 0);
    return affiliateBorrowings + creditors + wcLimit + taxProvision + otherLiabilities;
  },

  // Financial Ratios
  currentRatio: (data) => {
    const currentAssets = financialCalculations.totalCurrentAssets(data);
    const currentLiabilities = financialCalculations.totalCurrentLiabilities(data);
    return currentLiabilities > 0 ? (currentAssets / currentLiabilities) : 0;
  },

  debtorDays: (data) => {
    const totalDebtors = parseFloat(data.debtors_gt6m_2025 || 0) + parseFloat(data.debtors_lt6m_2025 || 0);
    const sales = parseFloat(data.sales_projected_2025 || 0);
    return sales > 0 ? (totalDebtors * 365) / sales : 0;
  },

  inventoryDays: (data) => {
    const inventories = parseFloat(data.inventories_2025 || 0);
    const cogs = financialCalculations.totalCogs(data);
    return cogs > 0 ? (inventories * 365) / cogs : 0;
  },

  creditorDays: (data) => {
    const creditors = parseFloat(data.creditors_2025 || 0);
    const purchases = parseFloat(data.purchases_2025 || 0);
    return purchases > 0 ? (creditors * 365) / purchases : 0;
  },

  cashConversionCycle: (data) => {
    const debtorDays = financialCalculations.debtorDays(data);
    const inventoryDays = financialCalculations.inventoryDays(data);
    const creditorDays = financialCalculations.creditorDays(data);
    return debtorDays + inventoryDays - creditorDays;
  },

  // Personal Net Worth Calculations
  totalPersonalAssets: (data) => {
    const savings = parseFloat(data.savings_bank || 0);
    const fd = parseFloat(data.fixed_deposits || 0);
    const cash = parseFloat(data.cash_hand || 0);
    const property = parseFloat(data.property_value || 0);
    const land = parseFloat(data.land_value || 0);
    const rd = parseFloat(data.recurring_deposits || 0);
    const insurance = parseFloat(data.insurance_surrender || 0);
    const metals = parseFloat(data.precious_metals || 0);
    const vehicles = parseFloat(data.vehicles_value || 0);
    const others = parseFloat(data.other_personal_assets || 0);
    return savings + fd + cash + property + land + rd + insurance + metals + vehicles + others;
  },

  totalPersonalLiabilities: (data) => {
    const homeLoan = parseFloat(data.home_loan_pos || 0);
    const vehicleLoan = parseFloat(data.vehicle_loan_pos || 0);
    const unsecuredLoan = parseFloat(data.unsecured_loan_pos || 0);
    const msmeLoan = parseFloat(data.msme_loan_pos || 0);
    const otherLoans = parseFloat(data.other_loans_pos || 0);
    const creditCard = parseFloat(data.credit_card_dues || 0);
    const tax = parseFloat(data.tax_dues || 0);
    const others = parseFloat(data.other_dues || 0);
    return homeLoan + vehicleLoan + unsecuredLoan + msmeLoan + otherLoans + creditCard + tax + others;
  },

  personalNetWorth: (data) => {
    const assets = financialCalculations.totalPersonalAssets(data);
    const liabilities = financialCalculations.totalPersonalLiabilities(data);
    return assets - liabilities;
  },

  assetLiabilityCoverageRatio: (data) => {
    const assets = financialCalculations.totalPersonalAssets(data);
    const liabilities = financialCalculations.totalPersonalLiabilities(data);
    return liabilities > 0 ? (assets / liabilities) : assets > 0 ? 999 : 0;
  },

  // Working Capital Assessment
  workingCapitalGap: (data) => {
    const currentAssets = financialCalculations.totalCurrentAssets(data);
    const otherCurrentLiabilities = financialCalculations.totalCurrentLiabilities(data) - parseFloat(data.wc_limit_2025 || 0);
    return currentAssets - otherCurrentLiabilities;
  },

  customerMarginPercent: (data) => {
    const wcGap = financialCalculations.workingCapitalGap(data);
    const loanAmount = parseFloat(data.loan_amount || 0);
    const customerContribution = wcGap - loanAmount;
    return wcGap > 0 ? (customerContribution / wcGap) * 100 : 0;
  }
};

export default financialAnalysisConfig;