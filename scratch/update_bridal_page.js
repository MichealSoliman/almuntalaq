const fs = require('fs');

const path = 'bridal-trousseau-moving-jeddah/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Link to cheapest-furniture-moving-jeddah in cost section (section9)
content = content.replace(
    /(<h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900 mt-10">\s*تكلفة نقل دبش العروسة بجدة\s*<\/h2>\s*<p class="mb-4 text-gray-700">لا يوجد سعر ثابت لجميع عمليات نقل الدبش\. وتختلف التكلفة حسب:<\/p>)/,
    `$1
                    <p class="mb-4 text-sm text-gray-600">يمكنك أيضًا مراجعة دليلنا المفصل حول <a href="https://almontalaqmoving.com/cheapest-furniture-moving-jeddah/" class="text-blue-600 underline font-semibold">أسعار نقل العفش بجدة وعوامل تحديد التكلفة</a> لفهم كيفية حساب التكاليف الاقتصادية.</p>`
);

// 2. Link to moving-trucks-in-jeddah in truck section (section8)
content = content.replace(
    /(<h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">سيارة نقل دبش العروسة بجدة<\/h3>\s*<p class="mb-4 text-gray-700">اختيار السيارة يعتمد على كمية الدبش)/,
    `<h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">سيارة نقل دبش العروسة بجدة</h3>
                    <p class="mb-4 text-gray-700">نوفر أسطولاً مجهزاً من <a href="https://almontalaqmoving.com/moving-trucks-in-jeddah/" class="text-blue-600 underline font-semibold">سيارات ودينا نقل العفش بجدة</a> بصناديق مقفلة لحماية المنقولات. واختيار السيارة يعتمد على كمية الدبش`
);

// 3. Link to packaging service in packaging section
content = content.replace(
    /(<h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">هل يمكن نقل دبش العروسة بدون تغليف؟<\/h3>\s*<p class="mb-4 text-gray-700">نعم، بعض محتويات الدبش مثل الملابس والمفروشات والشنط قد لا تحتاج إلى\s*نفس مستوى الحماية المطلوب للزجاج أو القطع القابلة للكسر\. لكن القطع الحساسة تستفيد من التغليف\s*المناسب\.)/,
    `$1 ويمكنك مراجعة مواد التغليف المتوفرة من كراتين وفقاعات وفوم عبر خدمة <a href="https://almontalaqmoving.com/furniture-packaging-in-jeddah/" class="text-blue-600 underline font-semibold">تغليف العفش بجدة</a>.`
);

// 4. Link to furniture-moving-with-packing in combined move
content = content.replace(
    /(<h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">هل يتم نقل دبش العروسة مع العفش؟<\/h3>\s*<p class="mb-4 text-gray-700">يمكن جمع الخدمتين في عملية واحدة عندما توجد كميات من الأثاث والدبش في\s*نفس عملية الانتقال)/,
    `$1، سواء من خلال <a href="https://almontalaqmoving.com/furniture-moving-with-packing/" class="text-blue-600 underline font-semibold">باقة نقل العفش مع التغليف</a> أو عبر خدماتنا العامة في <a href="https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/" class="text-blue-600 underline font-semibold">نقل العفش بجدة</a>`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated bridal-trousseau-moving-jeddah/index.html');
