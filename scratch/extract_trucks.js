const fs = require('fs');
const html = fs.readFileSync('scratch/old_moving_trucks_blog.html', 'utf8');

const regex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    console.log(text);
}
