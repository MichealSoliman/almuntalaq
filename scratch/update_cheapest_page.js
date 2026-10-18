const fs = require('fs');

const path = 'cheapest-furniture-moving-jeddah/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Title and OG/Twitter/Schema
content = content.replace(
    /<title>.*?<\/title>/,
    '<title>أسعار نقل العفش بجدة | اطلب عرض سعر مناسب</title>'
);

content = content.replace(
    /<meta property="og:title" content="[^"]+">/,
    '<meta property="og:title" content="أسعار نقل العفش بجدة | اطلب عرض سعر مناسب">'
);

content = content.replace(
    /<meta name="twitter:title" content="[^"]+">/,
    '<meta name="twitter:title" content="أسعار نقل العفش بجدة | اطلب عرض سعر مناسب">'
);

// Update H1
content = content.replace(
    /<h1 class="text-4xl md:text-5xl font-bold mb-4">.*?<\/h1>/,
    '<h1 class="text-4xl md:text-5xl font-bold mb-4">تبحث عن أرخص شركة نقل عفش بجدة؟ تعرّف على عوامل التكلفة</h1>'
);

// 2. Add contextual links in sections:

// A. In truck-cost section -> link to moving-trucks-in-jeddah
content = content.replace(
    /(<section id="truck-cost"[^>]*>[\s\S]*?<h2[^>]*>تكلفة دينا نقل عفش بجدة<\/h2>[\s\S]*?<p class="mb-4">تعتمد تكلفة سيارة النقل على:<\/p>)/,
    `$1
                    <p class="mb-4 text-sm text-gray-600">يمكنك الاطلاع على تفاصيل أسطول سياراتنا وخيارات الحجز عبر صفحة <a href="https://almontalaqmoving.com/moving-trucks-in-jeddah/" class="text-blue-600 hover:underline font-semibold">دينا نقل عفش بجدة</a>.</p>`
);

// B. In dismantling-cost section -> link to dismantling service
content = content.replace(
    /(<section id="dismantling-cost"[^>]*>[\s\S]*?<h2[^>]*>تكلفة فك وتركيب العفش بجدة<\/h2>[\s\S]*?<p class="mb-4">الفك والتركيب قد يكون جزءًا من خدمة النقل أو خدمة مستقلة حسب الاتفاق\.)/,
    `$1 ولمزيد من التفاصيل حول أعمال النجارة المتخصصة، راجع <a href="https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/" class="text-blue-600 hover:underline font-semibold">خدمة فك وتركيب العفش بجدة</a>.`
);

// C. In packaging-cost section -> link to packaging service & moving with packing
content = content.replace(
    /(<section id="packaging-cost"[^>]*>[\s\S]*?<h2[^>]*>تكلفة تغليف العفش بجدة<\/h2>[\s\S]*?<p class="mb-4">تختلف تكلفة التغليف حسب نوع وحجم الأثاث\.)/,
    `$1 للتعرف على باقات الحماية وأنواع الكراتين والمواد، تفضل بزيارة صفحة <a href="https://almontalaqmoving.com/furniture-packaging-in-jeddah/" class="text-blue-600 hover:underline font-semibold">تغليف العفش بجدة</a>، أو اختر <a href="https://almontalaqmoving.com/furniture-moving-with-packing/" class="text-blue-600 hover:underline font-semibold">باقة نقل العفش مع التغليف</a> الشاملة.`
);

// D. In meaning section -> link to companies
content = content.replace(
    /وبهذه الطريقة تستطيع مقارنة عروض <strong>شركات نقل العفش في جدة<\/strong> بصورة\s+عادلة\./,
    'وبهذه الطريقة تستطيع مقارنة عروض <a href="https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/" class="text-blue-600 hover:underline font-semibold">شركات نقل العفش في جدة</a> بصورة عادلة ومدروسة.'
);

// E. Add bridal luggage link in special services or intro
content = content.replace(
    /(<li>فصل المقتنيات الشخصية\.<\/li>)/,
    `$1
                        <li>إذا كنتِ بصدد نقل تجهيزات الزواج، فنوفر خدمة مخصصة عبر <a href="https://almontalaqmoving.com/bridal-trousseau-moving-jeddah/" class="text-blue-600 hover:underline font-semibold">نقل دبش العروسة بجدة</a> بعناية فائقة.</li>`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated cheapest-furniture-moving-jeddah/index.html');
