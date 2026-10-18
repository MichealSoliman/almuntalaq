const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const footerStart = indexHtml.indexOf('<!-- Footer / Contact Section - نسخة مطورة وقوية -->');
const footerEndTag = '</footer>';
const footerEnd = indexHtml.indexOf(footerEndTag, footerStart) + footerEndTag.length;

if (footerStart === -1 || footerEnd === -1) {
    console.error('Footer not found in index.html');
    process.exit(1);
}

const footerHtml = indexHtml.substring(footerStart, footerEnd);

// Save to footer.html in root
fs.writeFileSync(path.join(root, 'footer.html'), footerHtml, 'utf8');

// Ensure components directory exists and save to components/footer.html
const componentsDir = path.join(root, 'components');
if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
}
fs.writeFileSync(path.join(componentsDir, 'footer.html'), footerHtml, 'utf8');

console.log('Successfully saved footer.html (bytes:', footerHtml.length, ')');
