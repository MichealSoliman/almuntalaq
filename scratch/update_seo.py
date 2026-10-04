import os
import re
import shutil
import glob

base_dir = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq"

# 1. Update Internal Links
html_files = glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True)
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace B, C, D links with A
    old_urls = [
        "/blogs/furniture-moving-companies-in-jeddah/",
        "/blogs/best-furniture-moving-companies-in-jeddah/",
        "/blogs/best-furniture-moving-company-jeddah/"
    ]
    new_url = "/furniture-moving-companies-in-jeddah/"
    
    changed = False
    for old_url in old_urls:
        if old_url in content:
            content = content.replace(old_url, new_url)
            changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in {filepath}")

# 2. Add 301 Redirects
htaccess_path = os.path.join(base_dir, '.htaccess')
with open(htaccess_path, 'r', encoding='utf-8') as f:
    htaccess = f.read()

redirects = '''
# 301 Redirects for Cannibalization
Redirect 301 /blogs/furniture-moving-companies-in-jeddah/ https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/
Redirect 301 /blogs/best-furniture-moving-companies-in-jeddah/ https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/
Redirect 301 /blogs/best-furniture-moving-company-jeddah/ https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/
'''
if "Redirect 301 /blogs/furniture-moving-companies-in-jeddah/" not in htaccess:
    with open(htaccess_path, 'a', encoding='utf-8') as f:
        f.write(redirects)
    print("Added 301 redirects to .htaccess")

# 3. Update Sitemap
sitemap_path = os.path.join(base_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap = f.read()
    
    # Simple regex removal for the <url> blocks of the 3 blogs
    for url in old_urls:
        pattern = r'<url>\s*<loc>https://almontalaqmoving.com' + url + r'</loc>.*?</url>'
        sitemap = re.sub(pattern, '', sitemap, flags=re.DOTALL)
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print("Updated sitemap.xml")

# 4. Remove directories B, C, D
dirs_to_remove = [
    os.path.join(base_dir, "blogs", "furniture-moving-companies-in-jeddah"),
    os.path.join(base_dir, "blogs", "best-furniture-moving-companies-in-jeddah"),
    os.path.join(base_dir, "blogs", "best-furniture-moving-company-jeddah")
]
for d in dirs_to_remove:
    if os.path.exists(d):
        shutil.rmtree(d)
        print(f"Removed directory {d}")
