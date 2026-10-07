const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const rootDir = path.resolve(__dirname, '..');
const areasDir = path.join(rootDir, 'areas');
const imgDir = path.join(rootDir, 'assets', 'img');

// 1. Rename real images
const workImages = [];
for (let i = 1; i <= 9; i++) {
    const oldName = `work (${i}).jpeg`;
    const newName = `real-furniture-moving-jeddah-0${i}.jpg`;
    
    const oldPath = path.join(imgDir, oldName);
    const newPath = path.join(imgDir, newName);
    
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        workImages.push(newName);
    } else if (fs.existsSync(newPath)) {
        workImages.push(newName); // Already renamed in previous run
    }
}

// 2. Iterate over all area directories
const subdirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory() && f.startsWith('hayu-'));

subdirs.forEach((dir, index) => {
    const filePath = path.join(areasDir, dir, 'index.html');
    if (!fs.existsSync(filePath)) return;

    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if #testimonials already exists
    if (!document.getElementById('testimonials')) {
        // Find a place to inject. Before #faq or #nearby-areas or at the end of .lg:w-3/4
        const targetContainer = document.querySelector('.lg\\:w-3\\/4') || document.querySelector('main');
        if (!targetContainer) return;

        // Select 3 images for this page
        const img1 = workImages[index % workImages.length];
        const img2 = workImages[(index + 1) % workImages.length];
        const img3 = workImages[(index + 2) % workImages.length];

        // Ensure title is extracted for alt text
        const pageTitle = document.querySelector('h1') ? document.querySelector('h1').textContent.replace('نقل عفش ', '').trim() : "حي بجدة";

        const trustSection = `
        <section id="testimonials" class="bg-white rounded-2xl shadow-md p-8 mt-10 card-hover border border-gray-100">
            <h2 class="text-3xl font-bold mb-4 section-title">لماذا يثق بنا عملاؤنا في ${pageTitle}؟</h2>
            <p class="mb-6 text-gray-700 leading-relaxed">نحن في <strong>شركة المنطلق لنقل العفش</strong> نعتز بتقديم خدمات موثوقة تعتمد على الخبرة الميدانية الطويلة في شوارع وأحياء جدة. نلتزم بأعلى معايير الأمان والتغليف لضمان سلامة منقولاتكم وتجربة خالية من الإجهاد.</p>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="testimonial-card p-6 rounded-xl bg-blue-50 border border-blue-100 flex flex-col justify-center">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3 class="font-bold text-lg text-blue-900">خبرة ميدانية فعلية</h3>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed">فريق عملنا على دراية تامة بطبيعة العقارات والممرات في ${pageTitle}، مما يسهل عملية النقل ويوفر الوقت ويضمن وصول العفش بأمان تام.</p>
                </div>
                
                <div class="testimonial-card p-6 rounded-xl bg-green-50 border border-green-100 flex flex-col justify-center">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                            <i class="fas fa-box-open"></i>
                        </div>
                        <h3 class="font-bold text-lg text-blue-900">حماية وتغليف احترافي</h3>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed">نستخدم أفضل مواد التغليف من فقاعات وكرتون مقوى وفوم لضمان عدم تعرض المقتنيات الثمينة لأي خدوش أثناء التحميل والنقل والتفريغ.</p>
                </div>
            </div>
            
            <!-- Real Images Gallery -->
            <div class="mt-8">
                <h3 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">لقطات حقيقية من أعمالنا الميدانية</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex flex-col">
                        <img src="/assets/img/${img1}" alt="فريق عمل شركة المنطلق أثناء تنفيذ خدمة نقل عفش وتغليف الأثاث" class="w-full h-48 object-cover hover:scale-105 transition duration-300" loading="lazy" width="400" height="300">
                        <p class="text-xs text-center p-2 text-gray-500">تغليف وحماية الأثاث</p>
                    </div>
                    <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex flex-col">
                        <img src="/assets/img/${img2}" alt="تحميل الأثاث بأمان داخل سيارات نقل العفش المغلقة التابعة لشركة المنطلق بجدة" class="w-full h-48 object-cover hover:scale-105 transition duration-300" loading="lazy" width="400" height="300">
                        <p class="text-xs text-center p-2 text-gray-500">سيارات مغلقة ومجهزة</p>
                    </div>
                    <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex flex-col">
                        <img src="/assets/img/${img3}" alt="فك وتركيب العفش ونقله باحترافية تامة في موقع العمل بجدة" class="w-full h-48 object-cover hover:scale-105 transition duration-300" loading="lazy" width="400" height="300">
                        <p class="text-xs text-center p-2 text-gray-500">التعامل الآمن مع المنقولات</p>
                    </div>
                </div>
            </div>
        </section>
        `;

        // Inject before #faq if it exists, otherwise append
        const faqSection = document.getElementById('faq');
        if (faqSection) {
            faqSection.insertAdjacentHTML('beforebegin', trustSection);
        } else {
            const nearbySection = document.getElementById('nearby-areas');
            if (nearbySection) {
                nearbySection.insertAdjacentHTML('beforebegin', trustSection);
            } else {
                targetContainer.insertAdjacentHTML('beforeend', trustSection);
            }
        }

        // Schema Review Check - Remove any fake reviews if they exist (although none exist)
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
            if (script.textContent.includes('AggregateRating')) {
                try {
                    let schemaData = JSON.parse(script.textContent);
                    if (schemaData['@graph']) {
                        schemaData['@graph'].forEach(item => {
                            if (item.aggregateRating) delete item.aggregateRating;
                            if (item.review) delete item.review;
                        });
                    }
                    script.textContent = JSON.stringify(schemaData, null, 2);
                } catch(e) {}
            }
        });

        fs.writeFileSync(filePath, dom.serialize());
        console.log(`Processed Phase 5 E-E-A-T for: ${dir}`);
    }
});

console.log("Phase 5 E-E-A-T applied successfully.");
