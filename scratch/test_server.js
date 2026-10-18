const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    let reqUrl = decodeURI(req.url.split('?')[0]);
    
    // rewrite for directory index
    let filePath = path.join(__dirname, '..', reqUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(3456, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3456');
});
