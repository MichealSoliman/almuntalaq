const fs = require('fs');

let html = fs.readFileSync('blogs/index.html', 'utf8');

// Replace relative blog URLs in blogs/index.html with absolute canonical service URLs
html = html.replace('href="./furniture-dismantling-and-assembly-in-jeddah/"', 'href="https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/"');
html = html.replace('href="./furniture-moving-trucks-in-jeddah/"', 'href="https://almontalaqmoving.com/moving-trucks-in-jeddah/"');
html = html.replace('href="./furniture-packaging-in-jeddah/"', 'href="https://almontalaqmoving.com/furniture-packaging-in-jeddah/"');
html = html.replace('href="./best-furniture-moving-company-jeddah/"', 'href="https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/"');
html = html.replace('href="./best-furniture-moving-companies-in-jeddah/"', 'href="https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/"');
html = html.replace('href="./furniture-moving-companies-in-jeddah/"', 'href="https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/"');

fs.writeFileSync('blogs/index.html', html, 'utf8');
console.log('Successfully updated blogs/index.html internal links');
