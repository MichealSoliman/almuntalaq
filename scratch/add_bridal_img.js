const fs = require('fs');
let c = fs.readFileSync('bridal-trousseau-moving-jeddah/index.html', 'utf8');
const target = '<section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-gray-100">';
const replacement = `<section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <div class="service-img-placeholder mb-6">
                        <img src="https://almontalaqmoving.com/assets/img/bridal-trousseau-moving-jeddah.webp" alt="نقل دبش العروسة بجدة" class="w-full max-w-lg h-auto rounded-xl object-cover shadow-sm" loading="lazy" decoding="async">
                    </div>`;

if (c.includes(target)) {
    c = c.replace(target, replacement);
    fs.writeFileSync('bridal-trousseau-moving-jeddah/index.html', c, 'utf8');
    console.log('Successfully added image to bridal intro.');
} else {
    console.error('Target not found!');
}
