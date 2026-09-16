const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'assets', 'css', 'main.css');

let html = fs.readFileSync(indexPath, 'utf8');

let extractedCss = '';

// Extract all <style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
html = html.replace(styleRegex, (match, p1) => {
    extractedCss += p1.trim() + '\n\n';
    return '';
});

// Remove animation attributes (data-aos, fade-up)
html = html.replace(/\bdata-aos="[^"]*"/g, '');
html = html.replace(/\bdata-aos-[a-z-]+="[^"]*"/g, '');
html = html.replace(/\s*fade-up\b/g, '');
html = html.replace(/\s*aos-animate\b/g, '');
html = html.replace(/\s*animate-bounce-slow\b/g, '');

// Clean up any empty class attributes
html = html.replace(/class="\s*"/g, '');

// Ensure assets/css folder exists
const cssDir = path.dirname(cssPath);
if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
}

// Write the CSS file
fs.writeFileSync(cssPath, extractedCss, 'utf8');

// Add stylesheet link right before </head> if not already there
if (!html.includes('assets/css/main.css')) {
    html = html.replace('</head>', '    <link rel="stylesheet" href="/assets/css/main.css">\n</head>');
}

// Write the updated HTML back
fs.writeFileSync(indexPath, html, 'utf8');

console.log("Successfully extracted CSS and removed animations.");
