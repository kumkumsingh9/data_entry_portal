import pandas as pd
import numpy as np
import re

def extract_all_input_fields():
    try:
        # Read the sheet without headers to see the raw structure
        df_raw = pd.read_excel('MSE CREDIT ASSESSMENT 3.1 (1).xlsx', 
                              sheet_name='Input Sheet <=$50000', 
                              header=None)
        
        print("📋 COMPLETE INPUT FIELDS ANALYSIS")
        print("=" * 80)
        
        # Comprehensive field extraction
        input_fields = []
        
        # Keywords that typically indicate input fields
        field_keywords = [
            'name', 'address', 'phone', 'email', 'age', 'gender', 'education',
            'income', 'expense', 'salary', 'business', 'occupation', 'loan',
            'amount', 'total', 'sales', 'purchase', 'balance', 'date',
            'number', 'id', 'code', 'type', 'category', 'description',
            'monthly', 'daily', 'weekly', 'annual', 'years', 'months',
            'credit', 'debt', 'asset', 'liability', 'collateral',
            'guarantor', 'reference', 'bank', 'account', 'branch'
        ]
        
        for i in range(len(df_raw)):
            for j in range(len(df_raw.columns)):
                cell_value = df_raw.iloc[i, j]
                
                if pd.notna(cell_value) and isinstance(cell_value, str):
                    cell_clean = cell_value.strip()
                    
                    # Skip if it's just instruction text
                    if 'INSTRUCTION' in cell_clean.upper() or len(cell_clean) < 3:
                        continue
                    
                    # Check if it looks like a field label
                    is_field_label = False
                    
                    # Check for field keywords
                    if any(keyword in cell_clean.lower() for keyword in field_keywords):
                        is_field_label = True
                    
                    # Check for common field patterns
                    if re.search(r'\b(total|amount|number|code|id|date|name|address)\b', cell_clean.lower()):
                        is_field_label = True
                    
                    # Check if it ends with common field suffixes
                    if re.search(r'(amount|total|balance|income|expense|sales|purchase|code|number|date|name)[\s\(\)]*$', cell_clean.lower()):
                        is_field_label = True
                    
                    if is_field_label:
                        # Look for potential input values nearby
                        input_value = None
                        input_type = "text"
                        
                        # Check adjacent cells for values
                        for di in [-1, 0, 1]:
                            for dj in [-1, 1]:
                                try:
                                    adj_i, adj_j = i + di, j + dj
                                    if 0 <= adj_i < len(df_raw) and 0 <= adj_j < len(df_raw.columns):
                                        adj_value = df_raw.iloc[adj_i, adj_j]
                                        if pd.notna(adj_value) and adj_value != cell_value:
                                            if isinstance(adj_value, (int, float)):
                                                input_value = adj_value
                                                input_type = "number"
                                                break
                                            elif isinstance(adj_value, str) and adj_value.strip():
                                                # Skip if it's another label
                                                if not any(kw in adj_value.lower() for kw in field_keywords):
                                                    input_value = adj_value.strip()
                                                    input_type = "text"
                                except:
                                    continue
                            if input_value is not None:
                                break
                        
                        # Determine field type based on content
                        field_type = "text"
                        if "amount" in cell_clean.lower() or "total" in cell_clean.lower() or "balance" in cell_clean.lower():
                            field_type = "number"
                        elif "date" in cell_clean.lower():
                            field_type = "date"
                        elif "phone" in cell_clean.lower():
                            field_type = "tel"
                        elif "email" in cell_clean.lower():
                            field_type = "email"
                        elif "age" in cell_clean.lower() or "years" in cell_clean.lower():
                            field_type = "number"
                        
                        input_fields.append({
                            'label': cell_clean,
                            'type': field_type,
                            'position': f'R{i}C{j}',
                            'sample_value': input_value
                        })
        
        # Remove duplicates and clean up
        seen_labels = set()
        unique_fields = []
        
        for field in input_fields:
            label_key = field['label'].lower().strip()
            if label_key not in seen_labels:
                seen_labels.add(label_key)
                unique_fields.append(field)
        
        # Sort and categorize fields
        categories = {
            'Personal Information': [],
            'Business Information': [],
            'Financial Information': [],
            'Loan Information': [],
            'Other Information': []
        }
        
        for field in unique_fields:
            label_lower = field['label'].lower()
            
            if any(kw in label_lower for kw in ['name', 'age', 'gender', 'address', 'phone', 'email', 'education']):
                categories['Personal Information'].append(field)
            elif any(kw in label_lower for kw in ['business', 'occupation', 'sales', 'purchase', 'daily', 'weekly', 'monthly']):
                categories['Business Information'].append(field)
            elif any(kw in label_lower for kw in ['income', 'expense', 'balance', 'amount', 'total', 'salary', 'asset', 'liability']):
                categories['Financial Information'].append(field)
            elif any(kw in label_lower for kw in ['loan', 'credit', 'debt', 'guarantor', 'collateral']):
                categories['Loan Information'].append(field)
            else:
                categories['Other Information'].append(field)
        
        # Display categorized results
        total_fields = 0
        for category, fields in categories.items():
            if fields:
                print(f"\n🏷️  {category}")
                print("-" * 50)
                for i, field in enumerate(fields, 1):
                    total_fields += 1
                    print(f"{i:2}. {field['label']}")
                    print(f"    Type: {field['type']}")
                    if field['sample_value'] is not None:
                        print(f"    Sample: {field['sample_value']}")
                    print(f"    Position: {field['position']}")
                    print()
        
        print(f"\n📊 SUMMARY: Found {total_fields} unique input fields across all categories")
        
        return unique_fields
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    fields = extract_all_input_fields()