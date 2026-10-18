const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scratch') continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = walk('.');
console.log(`Found ${htmlFiles.length} HTML files.`);

let oldTruckLinks = [];
let brideLuggageLinks = [];

for (const f of htmlFiles) {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('/blogs/furniture-moving-trucks-in-jeddah/')) {
        oldTruckLinks.push(f);
    }
    if (content.includes('/bride-luggage-moving-jeddah/')) {
        brideLuggageLinks.push(f);
    }
}

console.log('Files with /blogs/furniture-moving-trucks-in-jeddah/:', oldTruckLinks);
console.log('Files with /bride-luggage-moving-jeddah/:', brideLuggageLinks);
