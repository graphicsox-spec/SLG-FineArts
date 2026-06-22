import os

file_path = r"c:\Users\graph\OneDrive\Desktop\SLG Art\SLG-FineArts\service.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Delivery & Production Times
content = content.replace("Please allow 5–7 business days for production", "Please allow 14-21 business days for production")
content = content.replace("Most customers receive their artwork within 2–3 weeks of ordering.", "Most customers receive their artwork within 3–4 weeks of ordering.")

# 2. Shipping Details
# Standard Shipping
content = content.replace(
    "Carefully crated and shipped via FedEx or UPS, fully insured. Delivered to your door with a signature required.",
    "Carefully packaged with the utmost security and care and shipped via UPS, FedEx, or DHL, fully insured. Delivered straight to your door."
)
# White Glove
content = content.replace(
    "A two-person team delivers, unpacks, and places the artwork in your chosen location. Available in major US metro areas.",
    "A two-person team unpacks and places your artwork in your chosen location- available in the Scottsdale/Phoenix Metro area only at this time."
)
# Destinations
content = content.replace(
    "We ship to all 50 US states and Canada. International shipping to select destinations is available — please <a href=\"contact.html\" style=\"color:var(--gold);\">contact us</a> before ordering for a custom quote.",
    "We ship to the contiguous 48 states and throughout Canada, with the shipping included in the cost of the artwork. For shipping to Alaska and Hawaii, Please email for a direct quote on shipping fees."
)
# Fully Insured
content = content.replace(
    "Every shipment is covered by full fine art insurance from studio to your door. In the rare event of transit damage, we replace at no charge.",
    "Every shipment is covered from the studio to your front door. In the rare event of transit damage, your art piece will be replaced at no charge."
)

# 3. Step-by-Step Updates
content = content.replace(
    "Your artwork is produced on archival materials in our Scottsdale studio. Acrylic mounting or frame assembly is completed by hand.",
    "Your artwork is produced on archival materials. Acrylic mounting or frame assembly is completed by hand."
)
content = content.replace(
    "You receive a tracking number via email the moment your crate leaves the studio.",
    "You receive a tracking number via email the moment your artwork leaves the lab."
)
content = content.replace(
    "Unbox your artwork. If anything appears damaged",
    "Unbox your artwork CAREFULLY. If anything appears damaged"
)

# 4. Return Policy
content = content.replace(
    "<strong>14-day satisfaction guarantee</strong>",
    "<strong>7-day satisfaction guarantee</strong>"
)
content = content.replace(
    "contact us within 14 days",
    "contact us within 7 days"
)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated service.html")
