const fs = require('fs');
const html = fs.readFileSync('scratch/old_moving_trucks_blog.html', 'utf8');

const regex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null && count < 10) {
    const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
    console.log(`--- Section ${count++}:`, text);
}
