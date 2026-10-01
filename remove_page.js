const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
// The page to remove
const targetPage = 'furniture-moving-company-in-jeddah';
const pageDir = path.join(projectDir, targetPage);

console.log(`Starting cleanup for: ${targetPage}...`);

// 1. Delete the directory
if (fs.existsSync(pageDir)) {
    try {
        fs.rmSync(pageDir, { recursive: true, force: true });
        console.log('✅ Deleted directory: ' + pageDir);
    } catch (e) {
        console.error('❌ Failed to delete directory:', e);
    }
} else {
    console.log('✅ Directory not found, already deleted: ' + pageDir);
}

// 2. Function to walk through all files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.xml')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(projectDir);

// Dynamic regex patterns based on the targetPage
const sitemapPattern = new RegExp(`<url>\\s*<loc>https:\\/\\/almontalaqmoving\\.com\\/${targetPage}\\/?<\\/loc>[\\s\\S]*?<\\/url>`, 'g');
const liPattern = new RegExp(`<li[^>]*>\\s*<a[^>]*href=["'](?:https:\\/\\/almontalaqmoving\\.com)?(?:\\/|\\.\\/|\\.\\.\\/)?${targetPage}\\/?["'][^>]*>[\\s\\S]*?<\\/a>\\s*<\\/li>`, 'g');
const aTagPattern = new RegExp(`<a[^>]*href=["'](?:https:\\/\\/almontalaqmoving\\.com)?(?:\\/|\\.\\/|\\.\\.\\/)?${targetPage}\\/?["'][^>]*>([\\s\\S]*?)<\\/a>`, 'g');
const exactUrlPattern = new RegExp(`https:\\/\\/almontalaqmoving\\.com\\/${targetPage}\\/?`, 'g');
const exactUrlRelPattern = new RegExp(`['"]\\/?${targetPage}\\/?['"]`, 'g');

// 3. Process each file
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Remove from sitemap.xml
    if (file.endsWith('sitemap.xml')) {
        content = content.replace(sitemapPattern, '');
    }

    // Remove entire <li> block if it contains exactly a link to this page as its main content
    content = content.replace(liPattern, '');

    // Replace <a href="...">text</a> with text for inline links in paragraphs
    content = content.replace(aTagPattern, '$1'); 

    // Update remaining exact URL strings (mostly in JSON-LD Schema)
    content = content.replace(exactUrlPattern, 'https://almontalaqmoving.com/');
    
    // Update relative URL strings (e.g., href="/target-page/") not caught above
    content = content.replace(exactUrlRelPattern, '"/"');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('✅ Updated links in: ' + path.relative(projectDir, file));
    }
});

console.log('🎉 Cleanup complete!');
