const fs = require('fs');
let html = fs.readFileSync('furniture-packaging-in-jeddah/index.html', 'utf8');

// Update H1 and subheader in Hero
html = html.replace('<h1 class="text-4xl md:text-5xl font-bold mb-4">تغليف الاثاث بجدة</h1>', '<h1 class="text-4xl md:text-5xl font-bold mb-4">تغليف العفش بجدة</h1>');

// Add cross-linking box after #features section intro
const crossLinkBox = `
                    <!-- رابط سياقي لباقة النقل الشامل ولدليل التغليف -->
                    <div class="my-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <i class="fas fa-box-open text-lg"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg text-gray-900 mb-1">هل تبحث عن خدمة نقل متكاملة تشمل التغليف والفك والتركيب؟</h3>
                                <p class="text-sm text-gray-700 leading-relaxed mb-2">إذا كنت ترغب في نقل أثاثك وتغليفه معًا ضمن خدمة موحدة ومريحة، نقدم لك <a href="https://almontalaqmoving.com/furniture-moving-with-packing/" class="text-blue-600 font-bold hover:underline">باقة نقل عفش شامل التغليف بجدة</a> التي تجمع بين عمالة التغليف وسيارات النقل والنجارين لإعادة التركيب.</p>
                                <p class="text-xs text-gray-600">للإرشادات والنصائح التعليمية لحماية القطع الحساسة خطوة بخطوة، تصفح <a href="https://almontalaqmoving.com/blogs/how-to-pack-furniture/" class="text-blue-600 font-semibold hover:underline">دليل كيفية تغليف الأثاث بجدة</a>.</p>
                            </div>
                        </div>
                    </div>`;

if (!html.includes('هل تبحث عن خدمة نقل متكاملة تشمل التغليف والفك والتركيب؟')) {
    html = html.replace('<!-- Intro & مميزات -->\r\n                <section id="features" class="bg-white rounded-2xl shadow-md p-8">', '<!-- Intro & مميزات -->\r\n                <section id="features" class="bg-white rounded-2xl shadow-md p-8">' + crossLinkBox);
    if (!html.includes('هل تبحث عن خدمة نقل متكاملة')) {
        html = html.replace('<!-- Intro & مميزات -->\n                <section id="features" class="bg-white rounded-2xl shadow-md p-8">', '<!-- Intro & مميزات -->\n                <section id="features" class="bg-white rounded-2xl shadow-md p-8">' + crossLinkBox);
    }
}

fs.writeFileSync('furniture-packaging-in-jeddah/index.html', html, 'utf8');
console.log('Successfully updated furniture-packaging-in-jeddah/index.html');
