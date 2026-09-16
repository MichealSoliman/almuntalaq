const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        // Skip node_modules and .git
        if (isDirectory && (f === 'node_modules' || f === '.git')) return;
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

let modifiedCount = 0;

walkDir(__dirname, function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Match any font-awesome CDN link like https://cdnjs.cloudflare.com/ajax/libs/font-awesome/...
        const regex = /<link\s+rel="stylesheet"\s+href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+"\s*\/?>/gi;
        
        if (regex.test(content)) {
            // Replace with local path
            const newContent = content.replace(regex, '<link rel="stylesheet" href="/assets/css/all.min.css">');
            fs.writeFileSync(filePath, newContent, 'utf8');
            modifiedCount++;
            console.log(`Updated: ${filePath}`);
        }
    }
});

console.log(`\nSuccessfully updated ${modifiedCount} HTML files to use the local FontAwesome!`);
