import pandas as pd
import numpy as np

def analyze_excel_sheets():
    try:
        # Read the Excel file
        excel_file = pd.ExcelFile('MSE CREDIT ASSESSMENT 3.1 (1).xlsx')
        
        print("📋 Available sheets in Excel file:")
        for i, sheet in enumerate(excel_file.sheet_names):
            print(f"  {i+1}. {sheet}")
        
        # Analyze the Input Sheet
        sheet_name = 'Input Sheet <=$50000'
        print(f"\n🎯 Analyzing: {sheet_name}")
        
        # Read the sheet
        df = pd.read_excel('MSE CREDIT ASSESSMENT 3.1 (1).xlsx', sheet_name=sheet_name)
        
        print(f"📊 Sheet Shape: {df.shape[0]} rows × {df.shape[1]} columns")
        
        print("\n📋 Column Analysis:")
        for i, col in enumerate(df.columns):
            # Get some sample values (non-null)
            sample_values = df[col].dropna().head(3).tolist()
            data_type = str(df[col].dtype)
            null_count = df[col].isnull().sum()
            
            print(f"\n{i+1}. Column: '{col}'")
            print(f"   Type: {data_type}")
            print(f"   Null values: {null_count}")
            if sample_values:
                print(f"   Sample values: {sample_values}")
        
        # Look for specific patterns that indicate input fields
        print("\n🔍 Potential Input Fields:")
        input_fields = []
        
        for col in df.columns:
            if pd.api.types.is_string_dtype(df[col]) or pd.api.types.is_object_dtype(df[col]):
                # Check if column has mixed content (labels and values)
                non_null_values = df[col].dropna()
                if len(non_null_values) > 0:
                    input_fields.append({
                        'field_name': col,
                        'field_type': 'text',
                        'sample_values': non_null_values.head(5).tolist()
                    })
            elif pd.api.types.is_numeric_dtype(df[col]):
                non_null_values = df[col].dropna()
                if len(non_null_values) > 0:
                    input_fields.append({
                        'field_name': col,
                        'field_type': 'number',
                        'sample_values': non_null_values.head(5).tolist()
                    })
        
        print(f"\nFound {len(input_fields)} potential input fields:")
        for i, field in enumerate(input_fields):
            print(f"{i+1}. {field['field_name']} ({field['field_type']})")
            if field['sample_values']:
                print(f"   Sample: {field['sample_values'][:3]}")
                
    except Exception as e:
        print(f"❌ Error analyzing Excel file: {str(e)}")

if __name__ == "__main__":
    analyze_excel_sheets()