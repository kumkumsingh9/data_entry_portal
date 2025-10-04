import pandas as pd
import numpy as np

def detailed_analysis():
    try:
        # Read the sheet without headers to see the raw structure
        df_raw = pd.read_excel('MSE CREDIT ASSESSMENT 3.1 (1).xlsx', 
                              sheet_name='Input Sheet <=$50000', 
                              header=None)
        
        print("🔍 Raw Sheet Data Analysis (First 20 rows):")
        print("="*80)
        
        # Show first 20 rows to understand structure
        for i in range(min(20, len(df_raw))):
            row_data = []
            for j in range(len(df_raw.columns)):
                cell_value = df_raw.iloc[i, j]
                if pd.notna(cell_value):
                    if isinstance(cell_value, str):
                        row_data.append(f"'{cell_value[:30]}'")
                    else:
                        row_data.append(str(cell_value))
                else:
                    row_data.append("NULL")
            print(f"Row {i:2}: {' | '.join(row_data)}")
        
        print("\n" + "="*80)
        print("🎯 Identifying Input Field Patterns:")
        
        # Look for patterns that indicate input fields
        input_fields = []
        
        for i in range(len(df_raw)):
            for j in range(len(df_raw.columns)):
                cell_value = df_raw.iloc[i, j]
                
                if pd.notna(cell_value) and isinstance(cell_value, str):
                    # Look for field labels (contains words like 'name', 'amount', 'date', etc.)
                    if any(keyword in cell_value.lower() for keyword in [
                        'name', 'amount', 'date', 'address', 'phone', 'email', 
                        'income', 'expense', 'total', 'business', 'sales',
                        'age', 'gender', 'education', 'loan', 'credit'
                    ]):
                        # Check adjacent cells for input values
                        adjacent_values = []
                        for k in range(max(0, j-1), min(len(df_raw.columns), j+3)):
                            if k != j and pd.notna(df_raw.iloc[i, k]):
                                adjacent_values.append(df_raw.iloc[i, k])
                        
                        input_fields.append({
                            'position': f'Row {i}, Col {j}',
                            'label': cell_value.strip(),
                            'adjacent_values': adjacent_values[:3]
                        })
        
        print(f"\n📋 Found {len(input_fields)} potential input fields:")
        for i, field in enumerate(input_fields[:15]):  # Show first 15
            print(f"{i+1:2}. {field['label']}")
            print(f"    Position: {field['position']}")
            if field['adjacent_values']:
                print(f"    Adjacent: {field['adjacent_values']}")
            print()
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    detailed_analysis()