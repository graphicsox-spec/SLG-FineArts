import os
import re

file_path = r"c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts\collections\silent-sovereign.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace description part 2
content = re.sub(
    r"What awaited me was this breathtaking scene along the shores of Lake Powell.*?forever\.",
    "",
    content,
    flags=re.DOTALL
)

# Replace PRODUCT.images keys
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-20x40.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 20X40 NO FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-20x40 black frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 20X40 BLACK FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-20x40 brown frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 20X40 BROWN FRAME.jpg'", content)

content = re.sub(r"'../assets/images/Lake Powell/lakepowell-30x60.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 30X60 NO FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-30x60 black frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 30X60 BLACK FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-30x60 brown frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 30X60 BROWN FRAME.jpg'", content)

content = re.sub(r"'../assets/images/Lake Powell/lakepowell-40x80.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 40X80 NO FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-40x80 black frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 40X80 BLACK FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-40x80 brown frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 40X80 BROWN FRAME.jpg'", content)

content = re.sub(r"'../assets/images/Lake Powell/lakepowell-48x96.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 48X96 NO FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-48x96 black frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 48X96 BLACK FRAME.jpg'", content)
content = re.sub(r"'../assets/images/Lake Powell/lakepowell-48x96 brown frame.jpg'", r"'../assets/images/Silent Sovereign/LEOPARD 48X96 BROWN FRAME.jpg'", content)

# Remove the comments with Lake Powell
content = re.sub(r"/\* 1:2 ratio panorama mockups — Lake Powell Borderlands.*?\*/", r"/* 1:2 ratio panorama mockups — Silent Sovereign */", content)
content = re.sub(r"/\* 48x96 XL — 1:2 ratio.*?\*/", r"/* 48x96 XL — 1:2 ratio */", content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Regex update done")
