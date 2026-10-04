import os
import re
import shutil
import glob

base_dir = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq"

# 1. Update Internal Links
old_to_new = {
    "/blogs/furniture-packaging-in-jeddah/": "/furniture-packaging-in-jeddah/",
    "/blogs/furniture-dismantling-and-assembly-in-jeddah/": "/furniture-dismantling-and-assembly-in-jeddah/",
    "/blogs/electrical-appliance-moving-in-jeddah/": "/moving-electrical-appliances-in-jeddah/"
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

    redirects = '''
# Redirects for Packaging, Dismantling, and Appliances
Redirect 301 /blogs/furniture-packaging-in-jeddah/ https://almontalaqmoving.com/furniture-packaging-in-jeddah/
Redirect 301 /blogs/furniture-dismantling-and-assembly-in-jeddah/ https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/
Redirect 301 /blogs/electrical-appliance-moving-in-jeddah/ https://almontalaqmoving.com/moving-electrical-appliances-in-jeddah/
'''
    if "Redirect 301 /blogs/furniture-packaging-in-jeddah/" not in htaccess:
        with open(htaccess_path, 'a', encoding='utf-8') as f:
            f.write(redirects)
        print("Added 301 redirects to .htaccess")

# 3. Update Sitemap
sitemap_path = os.path.join(base_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap = f.read()
    
    for old_url in old_to_new.keys():
        pattern = r'<url>\s*<loc>https://almontalaqmoving.com' + old_url + r'</loc>.*?</url>'
        sitemap = re.sub(pattern, '', sitemap, flags=re.DOTALL)
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print("Updated sitemap.xml")

# 4. Remove directories
for old_url in old_to_new.keys():
    dir_name = old_url.strip("/").replace("/", "\\")
    d_path = os.path.join(base_dir, dir_name)
    if os.path.exists(d_path):
        shutil.rmtree(d_path)
        print(f"Removed directory {d_path}")

print("Cleanup completed.")
