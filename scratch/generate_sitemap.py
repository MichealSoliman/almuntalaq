import datetime

def build_url(loc, priority, date):
    return f"""  <url>
    <loc>https://almontalaqmoving.com{loc}</loc>
    <lastmod>{date}</lastmod>
    <priority>{priority}</priority>
  </url>"""

date = "2026-10-04T11:00:00+03:00"

main_pages = [
    ("/", "1.00"),
    ("/about/", "0.80"),
    ("/services/", "0.90"),
    ("/areas/", "0.85"),
    ("/blogs/", "0.80"),
    ("/contact/", "0.80"),
]

service_pages = [
    "/ac-relocation-in-jeddah/",
    "/bedroom-moving-jeddah/",
    "/bridal-trousseau-moving-jeddah/",
    "/cheapest-furniture-moving-jeddah/",
    "/furniture-dismantling-and-assembly-in-jeddah/",
    "/furniture-moving-companies-in-jeddah/",
    "/furniture-moving-with-packing/",
    "/furniture-moving-workers-in-jeddah/",
    "/furniture-packaging-in-jeddah/",
    "/furniture-storage-in-jeddah/",
    "/hotel-furniture-moving-in-jeddah/",
    "/hydraulic-winch-moving-jeddah/",
    "/kitchen-moving-in-jeddah/",
    "/moving-electrical-appliances-in-jeddah/",
    "/moving-office-furniture-in-jeddah/",
    "/moving-trucks-in-jeddah/",
    "/moving-villa-furniture-in-jeddah/",
    "/residential-furniture-moving-in-jeddah/",
]

blog_pages = [
    "/blogs/furniture-moving-mistakes-in-jeddah/",
    "/blogs/furniture-moving-prices-in-jeddah/",
    "/blogs/how-to-choose-furniture-moving-company/",
    "/blogs/how-to-pack-furniture/",
    "/blogs/villa-furniture-moving-prices-jeddah/",
]

area_pages = [
    "/areas/hayu-albasateen/",
    "/areas/hayu-albawadi/",
    "/areas/hayu-aleazizia/",
    "/areas/hayu-alfaysalia/",
    "/areas/hayu-alhamdania/",
    "/areas/hayu-almarwa/",
    "/areas/hayu-alnasim/",
    "/areas/hayu-alnuzha/",
    "/areas/hayu-alrawda/",
    "/areas/hayu-alrubwa/",
    "/areas/alsafa/",
    "/areas/hayu-alsalama/",
    "/areas/hayu-alsamer/",
    "/areas/hayu-alshaati/",
    "/areas/hayu-alwaha/",
    "/areas/hayu-alzahra/",
    "/areas/jeddah-to-dammam/",
    "/areas/jeddah-to-madinah/",
    "/areas/jeddah-to-makkah/",
    "/areas/jeddah-to-riyadh/",
    "/areas/jeddah-to-taif/",
]

# Note: The bash output for alsafa is "hayu-alsafa", let's fix it.
area_pages[10] = "/areas/hayu-alsafa/"

xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

xml_content += "  <!-- Main Pages -->\n"
for loc, prio in main_pages:
    xml_content += build_url(loc, prio, date) + "\n"

xml_content += "\n  <!-- Service Pages -->\n"
for loc in service_pages:
    xml_content += build_url(loc, "0.85", date) + "\n"

xml_content += "\n  <!-- Blog Pages -->\n"
for loc in blog_pages:
    xml_content += build_url(loc, "0.70", date) + "\n"

xml_content += "\n  <!-- Area Pages -->\n"
for loc in area_pages:
    xml_content += build_url(loc, "0.60", date) + "\n"

xml_content += "</urlset>\n"

with open(r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq\sitemap.xml", "w", encoding="utf-8") as f:
    f.write(xml_content)

print("Sitemap generated successfully.")
