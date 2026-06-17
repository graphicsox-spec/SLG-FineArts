import os, re

path = r'c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts\collections'
missing_report = {}

for f in os.listdir(path):
    if not f.endswith('.html'): continue
    with open(os.path.join(path, f), 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Find sizes
    sizes = re.findall(r'data-size=\"([^\"]+)\"', content)
    
    # 2. Extract images object
    match = re.search(r'images:\s*\{([^}]+)\}', content)
    if not match: continue
    
    block = match.group(1)
    # Parse object into dictionary
    img_map = {}
    lines = block.split('\n')
    for line in lines:
        m = re.search(r'[\'\"]([^\'\"]+)[\'\"]\s*:\s*[\'\"]([^\'\"]+)[\'\"]', line)
        if m:
            img_map[m.group(1)] = m.group(2)
            
    # Check each size
    missing_for_file = []
    
    for s in sizes:
        expected = [f'{s}_unframed', f'{s}_framed_black', f'{s}_framed_brown']
        for exp in expected:
            if exp not in img_map:
                missing_for_file.append(f'{exp} (Key completely missing)')
            else:
                val = img_map[exp]
                for other_exp in expected:
                    if other_exp != exp and other_exp in img_map and img_map[other_exp] == val:
                        missing_for_file.append(f'{exp} (Shares image with {other_exp})')
                
                # Check if file actually exists
                val_path = val.replace('../', '').replace('/', '\\')
                full_path = os.path.join(r'c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts', val_path)
                if not os.path.exists(full_path):
                    missing_for_file.append(f'{exp} (File missing from disk -> {val})')
                    
    if missing_for_file:
        missing_report[f] = set(missing_for_file)

for f, missing in sorted(missing_report.items()):
    print(f'\n--- {f} ---')
    for m in sorted(list(missing)):
        print(f'  {m}')
