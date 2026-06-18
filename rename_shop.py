import os

base_dir = r"c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts"
old_name = "shop.html"
new_name = "the-shop.html"

# 1. Rename the file
old_file = os.path.join(base_dir, old_name)
new_file = os.path.join(base_dir, new_name)
if os.path.exists(old_file):
    os.rename(old_file, new_file)
    print(f"Renamed {old_name} to {new_name}")

# 2. Search and replace in all HTML and JS files
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html") or f.endswith(".js"):
            file_path = os.path.join(root, f)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
            
            updated = False
            # Standard replacement
            if "shop.html" in content:
                content = content.replace("shop.html", "the-shop.html")
                updated = True
                
            # Specifically for the regex in components.js
            if "shop\.html" in content:
                content = content.replace("shop\.html", "the-shop\.html")
                updated = True
            
            if updated:
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(content)
                print(f"Updated links in: {file_path}")
