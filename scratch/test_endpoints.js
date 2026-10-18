const http = require('http');

const endpoints = [
    '/moving-trucks-in-jeddah/',
    '/bridal-trousseau-moving-jeddah/',
    '/cheapest-furniture-moving-jeddah/'
];

endpoints.forEach(ep => {
    http.get(`http://127.0.0.1:3456${ep}`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`Endpoint: ${ep} | Status: ${res.statusCode} | Length: ${data.length} bytes`);
        });
    }).on('error', err => {
        console.error(`Error requesting ${ep}:`, err.message);
    });
});
