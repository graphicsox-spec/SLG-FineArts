import re

file_path = r"c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts\collections\the-edge.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Meta and Title
content = content.replace(
    "<title>The Window of Light — Landscape Collection | SLG Masterworks</title>",
    "<title>The Edge — Landscape Collection | SLG Masterworks</title>"
)
content = content.replace(
    '<meta name="description" content="The Window of Light — Photographed in Page, Arizona, capturing a rare natural sunbeam. Fine art acrylic print by Sarah L Glabman." />',
    '<meta name="description" content="The Edge — Photographed along the rugged coastline of Cape Town, South Africa in extreme winds. Fine art landscape acrylic print by Sarah L Glabman." />'
)

# Breadcrumb
content = content.replace("<span>The Window of Light</span>", "<span>The Edge</span>")

# Hero image
content = content.replace(
    'src="../assets/images/The Window of Light/Window-of-Light-Web.png"',
    'src="../assets/images/The Edge/Cape Town The Edge web.jpg"'
)
content = content.replace(
    'alt="The Window of Light — rare natural sunbeam in Page Arizona, fine art acrylic print by Sarah L Glabman"',
    'alt="The Edge — dramatic coastline of Cape Town, South Africa with crashing waves, fine art landscape print by Sarah L Glabman"'
)

# Title & Subtitle
content = content.replace(
    '<h1 class="product-title">The Window of Light</h1>',
    '<h1 class="product-title">The Edge</h1>'
)
content = content.replace(
    '<p class="product-subtitle">Page, Arizona</p>',
    '<p class="product-subtitle">Cape Town, South Africa</p>'
)

# Specs Origin
content = content.replace(
    '<span class="spec-value">Page, Arizona, USA</span>',
    '<span class="spec-value">Cape Town, South Africa</span>'
)

# Acrylic card img
content = content.replace(
    '<img class="framing-card-img" src="../assets/images/Faces/Page-6253-MAIN-website.jpg" alt="Acrylic Mount preview" />',
    '<img class="framing-card-img" src="../assets/images/The Edge/Cape Town The Edge web.jpg" alt="Acrylic Mount preview" />'
)

# Description text
old_desc_regex = r"Photographed in Page, Arizona, this image is a reminder that some photographs cannot be forced.*? transforms the scene into something almost otherworldly\."

new_desc = """Some photographs ask you to be patient. Others ask you to be brave.
        <br><br>
        I created this image along the rugged coastline of Cape Town, South Africa, while standing at the very edge of a sheer cliff in winds exceeding 50 miles per hour. Every gust pushed against me as the Atlantic Ocean exploded against the rocks hundreds of feet below, but the dramatic contrast between the ancient cliffs and the brilliant turquoise water was impossible to walk away from.
        <br><br>
        For me, this photograph represents the reward that often waits just beyond our comfort zone. It is a reminder that some of nature's greatest masterpieces can only be witnessed by stepping a little closer to the edge.
        <br><br>
        Museum-grade acrylic wall art featuring the dramatic coastline of Cape Town, South Africa. This artwork showcases the powerful Atlantic Ocean, rugged sea cliffs, turquoise water, crashing waves, and the untamed beauty of South Africa's iconic coastline."""

content = re.sub(old_desc_regex, new_desc, content, flags=re.DOTALL)

# PRODUCT image mapping
old_json_regex = r"hero: '\.\./assets/images/The Window of Light/Window-of-Light-Web\.png',.*?  },[\s\S]*?frames:"

new_json = """hero: '../assets/images/The Edge/Cape Town The Edge web.jpg',
        '24x36_unframed':     '../assets/images/The Edge/THE EDGE 24X36 NO FRAME.jpg',
        '24x36_framed_black': '../assets/images/The Edge/THE EDGE 24X36 BLACK FRAME.jpg',
        '24x36_framed_brown': '../assets/images/The Edge/THE EDGE 24X36 BROWN FRAME.jpg',
        '32x48_unframed':     '../assets/images/The Edge/THE EDGE 32X48 NO FRAME.jpg',
        '32x48_framed_black': '../assets/images/The Edge/THE EDGE 32X48 BLACK FRAME.jpg',
        '32x48_framed_brown': '../assets/images/The Edge/THE EDGE 32X48 BROWN FRAME.jpg',
        '40x60_unframed':     '../assets/images/The Edge/THE EDGE 40X60 NO FRAME.jpg',
        '40x60_framed_black': '../assets/images/The Edge/THE EDGE 40X60 BLACK FRAME.jpg',
        '40x60_framed_brown': '../assets/images/The Edge/THE EDGE 40X60 BROWN FRAME.jpg',
        '48x72_unframed':     '../assets/images/The Edge/THE EDGE 48X72 NO FRAME.jpg',
        '48x72_framed_black': '../assets/images/The Edge/THE EDGE 48X72 BLACK FRAME.jpg',
        '48x72_framed_brown': '../assets/images/The Edge/THE EDGE 48X72 BROWN FRAME.jpg',
      },
      frames:"""

content = re.sub(old_json_regex, new_json, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated the-edge.html successfully.")
