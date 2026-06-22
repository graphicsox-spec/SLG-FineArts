import os

file_path = r"c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts\collections\silent-sovereign.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace title and meta
content = content.replace(
    "Lake Powell Borderlands — Landscape Collection",
    "Silent Sovereign — Wildlife Collection"
)
content = content.replace(
    "Lake Powell Borderlands — a 1:2 panorama of sandstone cliffs and storm light along Lake Powell near the Arizona–Utah border. Museum-grade acrylic fine art print by Sarah L Glabman.",
    "Silent Sovereign — a museum-grade acrylic fine art photograph capturing a magnificent female leopard in South Africa's legendary Mala Mala Game Reserve. Timeless black and white wildlife art by Sarah L Glabman."
)

# Breadcrumb
content = content.replace(
    "<span>Lake Powell Borderlands</span>",
    "<span>Silent Sovereign</span>"
)

# Product Hero image
content = content.replace(
    "../assets/images/Lake Powell/lakepowell-web.jpg",
    "../assets/images/Silent Sovereign/Silent Sovereign Web.png"
)
content = content.replace(
    'alt="Lake Powell Borderlands — sandstone cliffs and storm light over Lake Powell at sunset, fine art acrylic print by Sarah L Glabman"',
    'alt="Silent Sovereign — magnificent female leopard in Mala Mala Game Reserve, black and white fine art wildlife print by Sarah L Glabman"'
)

# Product Info
content = content.replace(
    '<span class="product-eyebrow">/ Landscape Collection</span>',
    '<span class="product-eyebrow">/ Wildlife Collection</span>'
)
content = content.replace(
    '<h1 class="product-title">Lake Powell Borderlands</h1>',
    '<h1 class="product-title">Silent Sovereign</h1>'
)
content = content.replace(
    '<p class="product-subtitle">Lake Powell · Page, Arizona</p>',
    '<p class="product-subtitle">Mala Mala Game Reserve · South Africa</p>'
)

# Description text
old_desc = """        Some of the most meaningful photographs of my life have come when I simply listened. I created this image near Page, Arizona, while traveling north for a photography adventure in the canyons. As sunset approached, I felt a gentle pull to step outside — no plan, no expectation, just a feeling that I needed to look one more time.
        <br><br>
        What awaited me was this breathtaking scene along the shores of Lake Powell, only moments before the sun disappeared beyond the horizon. Golden light poured across the sandstone cliffs while storm clouds drifted overhead, creating a fleeting masterpiece of color, texture, and atmosphere — humbling in the scale and beauty of the American Southwest.
        <br><br>
        Printed as a museum-grade acrylic, <em>Lake Powell Borderlands</em> brings that immense scale and glowing desert light into luxury homes and curated spaces. It is a reminder that sometimes the most extraordinary moments are found simply by pausing to look."""

new_desc = """        There are moments on safari when the world grows completely quiet. This was one of them.
        <br><br>
        Photographed in South Africa's legendary Mala Mala Game Reserve on a gentle rainy morning, this magnificent female leopard had only just awakened from her slumber. To create this perspective, I lay flat on the floor of our safari vehicle, bringing my camera to nearly eye level with one of Africa's most elusive predators. For a few unforgettable moments, there was nothing but the sound of soft rain, the rhythm of her breathing, and the quiet privilege of sharing her world.
        <br><br>
        Printed as a museum-grade acrylic, <em>Silent Sovereign</em> celebrates the elegance, strength, and quiet confidence of one of Africa's most iconic big cats. Rich in detail and timeless in black and white, this fine art wildlife photograph brings the spirit of the African safari into luxury homes, offices, and curated collections."""

content = content.replace(old_desc, new_desc)

# JSON mapping replacement
json_old = """  const PRODUCT = {
    title: "Lake Powell Borderlands",
    basePrice: 1085,
    images: {
      "hero": "../assets/images/Lake Powell/lakepowell-web.jpg",
      "20x40_unframed": "../assets/images/Lake Powell/lakepowell20x40.jpg",
      "20x40_framed_black": "../assets/images/Lake Powell/lakepowell20x40black.jpg",
      "20x40_framed_brown": "../assets/images/Lake Powell/lakepowell20x40brown.jpg",
      "30x60_unframed": "../assets/images/Lake Powell/lakepowell30x60.jpg",
      "30x60_framed_black": "../assets/images/Lake Powell/lakepowell30x60black.jpg",
      "30x60_framed_brown": "../assets/images/Lake Powell/lakepowell30x60brown.jpg",
      "40x80_unframed": "../assets/images/Lake Powell/lakepowell40x80.jpg",
      "40x80_framed_black": "../assets/images/Lake Powell/lakepowell40x80black.jpg",
      "40x80_framed_brown": "../assets/images/Lake Powell/lakepowell40x80brown.jpg",
      "48x96_unframed": "../assets/images/Lake Powell/lakepowell48x96.jpg",
      "48x96_framed_black": "../assets/images/Lake Powell/lakepowell48x96black.jpg",
      "48x96_framed_brown": "../assets/images/Lake Powell/lakepowell48x96brown.jpg"
    }
  };"""

json_new = """  const PRODUCT = {
    title: "Silent Sovereign",
    basePrice: 1085,
    images: {
      "hero": "../assets/images/Silent Sovereign/Silent Sovereign Web.png",
      "20x40_unframed": "../assets/images/Silent Sovereign/LEOPARD 20X40 NO FRAME.jpg",
      "20x40_framed_black": "../assets/images/Silent Sovereign/LEOPARD 20X40 BLACK FRAME.jpg",
      "20x40_framed_brown": "../assets/images/Silent Sovereign/LEOPARD 20X40 BROWN FRAME.jpg",
      "30x60_unframed": "../assets/images/Silent Sovereign/LEOPARD 30X60 NO FRAME.jpg",
      "30x60_framed_black": "../assets/images/Silent Sovereign/LEOPARD 30X60 BLACK FRAME.jpg",
      "30x60_framed_brown": "../assets/images/Silent Sovereign/LEOPARD 30X60 BROWN FRAME.jpg",
      "40x80_unframed": "../assets/images/Silent Sovereign/LEOPARD 40X80 NO FRAME.jpg",
      "40x80_framed_black": "../assets/images/Silent Sovereign/LEOPARD 40X80 BLACK FRAME.jpg",
      "40x80_framed_brown": "../assets/images/Silent Sovereign/LEOPARD 40X80 BROWN FRAME.jpg",
      "48x96_unframed": "../assets/images/Silent Sovereign/LEOPARD 48X96 NO FRAME.jpg",
      "48x96_framed_black": "../assets/images/Silent Sovereign/LEOPARD 48X96 BLACK FRAME.jpg",
      "48x96_framed_brown": "../assets/images/Silent Sovereign/LEOPARD 48X96 BROWN FRAME.jpg"
    }
  };"""

content = content.replace(json_old, json_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated silent-sovereign.html")
