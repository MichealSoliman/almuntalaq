import os
import re
import shutil
import glob

base_dir = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq"

# 1. Update Internal Links
old_to_new = {
    "/blogs/furniture-moving-trucks-in-jeddah/": "/moving-trucks-in-jeddah/"
}

html_files = glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True)
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    for old_url, new_url in old_to_new.items():
        if old_url in content:
            content = content.replace(old_url, new_url)
            changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in {filepath}")

# 2. Update .htaccess
htaccess_path = os.path.join(base_dir, '.htaccess')
if os.path.exists(htaccess_path):
    with open(htaccess_path, 'r', encoding='utf-8') as f:
        htaccess = f.read()

    redirect = '\nRedirect 301 /blogs/furniture-moving-trucks-in-jeddah/ https://almontalaqmoving.com/moving-trucks-in-jeddah/\n'
    if "Redirect 301 /blogs/furniture-moving-trucks-in-jeddah/" not in htaccess:
        with open(htaccess_path, 'a', encoding='utf-8') as f:
            f.write(redirect)
        print("Added 301 redirect to .htaccess")

# 3. Update Sitemap
sitemap_path = os.path.join(base_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap = f.read()
    
    # Remove old url
    pattern = r'<url>\s*<loc>https://almontalaqmoving.com/blogs/furniture-moving-trucks-in-jeddah/</loc>.*?</url>'
    sitemap = re.sub(pattern, '', sitemap, flags=re.DOTALL)
    
    # Check and add new URLs
    new_urls = [
        "/moving-trucks-in-jeddah/",
        "/bride-luggage-moving-jeddah/",
        "/cheapest-furniture-moving-jeddah/"
    ]
    
    last_url_match = re.search(r'(<url>.*?</url>)\s*</urlset>', sitemap, flags=re.DOTALL)
    if last_url_match:
        addition = ""
        import datetime
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        for n_url in new_urls:
            if f"<loc>https://almontalaqmoving.com{n_url}</loc>" not in sitemap:
                addition += f"""
  <url>
    <loc>https://almontalaqmoving.com{n_url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>"""
        if addition:
            sitemap = sitemap.replace("</urlset>", f"{addition}\n</urlset>")
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print("Updated sitemap.xml")

# 4. Remove directories
dir_name = "blogs\\furniture-moving-trucks-in-jeddah"
d_path = os.path.join(base_dir, dir_name)
if os.path.exists(d_path):
    shutil.rmtree(d_path)
    print(f"Removed directory {d_path}")

print("Cleanup phase 2 completed.")
