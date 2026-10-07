const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const rootDir = path.resolve(__dirname, '..');
const areasDir = path.join(rootDir, 'areas');
const templatePath = path.join(areasDir, 'hayu-albasateen', 'index.html');

const areas = [
    {
        slug: 'hayu-alsanabel',
        keyword: 'نقل عفش حي السنابل جدة',
        title: 'نقل عفش حي السنابل جدة | فك وتركيب وتغليف العفش',
        desc: 'شركة المنطلق لنقل العفش في حي السنابل جنوب جدة، خدمة احترافية لنقل الأثاث المنزلي والتجاري مع الفك والتركيب والتغليف الشامل، اطلب الخدمة الآن.',
        placename: 'حي السنابل، جدة',
        intro: 'يقع حي السنابل في جنوب مدينة جدة ويعتبر من الأحياء السكنية المتنامية التي تشهد حركة تنقل مستمرة. نحن في شركة المنطلق نوفر لك أسطولاً مجهزاً لتلبية احتياجات النقل السكني بالحي بكفاءة عالية.',
        scenario: 'في حي السنابل الذي يتميز بالشوارع المتسعة والتنظيم السكني الهادئ، نبدأ بمعاينة العفش وتجهيزه عبر الفك المتخصص للغرف، ثم التغليف الشامل المضاد للصدمات. نستخدم أوناش الرفع عند الحاجة للمنازل متعددة الطوابق لتسريع التحميل الآمن.',
        nearby: [
            { name: 'حي الأجاويد', link: '/areas/hayu-alajawid/' }
        ],
        mapUrl: 'https://www.google.com/maps?q=حي+السنابل+جدة&output=embed',
        faq: [
            { q: "هل يتوفر نقل عفش من السنابل إلى أحياء أخرى؟", a: "نعم، نغطي النقل من حي السنابل إلى جميع أحياء جدة وحتى المدن المجاورة." },
            { q: "هل تقدمون خدمات الفك والتركيب لغرف إيكيا؟", a: "بالتأكيد، نمتلك نجارين متخصصين في فك وتركيب غرف نوم إيكيا وغيرها باحترافية تامة." },
            { q: "كم يستغرق نقل العفش في حي السنابل؟", a: "عادة يستغرق النقل للشقة المتوسطة من 4 إلى 6 ساعات شاملة الفك والتغليف." },
            { q: "هل يتوفر دينا نقل صغيرة للشحنات البسيطة؟", a: "نعم، نوفر دينات بمقاسات مختلفة لتناسب حجم عفشك بأسعار اقتصادية." },
            { q: "كيف أحصل على عرض سعر لحي السنابل؟", a: "يمكنك التواصل معنا عبر الواتساب أو الاتصال وسنقدم لك السعر بناءً على كمية العفش المطلوبة نقلها." }
        ]
    },
    {
        slug: 'hayu-alajawid',
        keyword: 'نقل عفش حي الأجاويد جدة',
        title: 'نقل عفش حي الأجاويد جدة | نقل وفك وتركيب وتغليف العفش',
        desc: 'شركة المنطلق تقدم خدمة نقل عفش حي الأجاويد بجدة، مع الفك والتركيب والتغليف الآمن للأثاث وسيارات نقل مجهزة بأفضل الأسعار.',
        placename: 'حي الأجاويد، جدة',
        intro: 'يعتبر حي الأجاويد من أبرز الأحياء في جنوب جدة والملاصقة لحي السنابل، ويشهد توسعاً عمرانياً مستمراً. تتطلب طبيعة الإسكان في المنطقة خبرة في التعامل مع مختلف أنواع الشقق والفلل، وهو ما نوفره من خلال كوادرنا المتخصصة.',
        scenario: 'تبدأ خدمة النقل في الأجاويد بمعاينة حجم الأثاث، ثم الفك الاحترافي لغرف النوم والمطابخ، مروراً بمرحلة التغليف بالفقاعات والكرتون لحماية القطع القابلة للكسر، وانتهاءً بالنقل بسيارات دينا مغلقة ومجهزة لحماية العفش من التغيرات الجوية.',
        nearby: [
            { name: 'حي السنابل', link: '/areas/hayu-alsanabel/' }
        ],
        mapUrl: 'https://www.google.com/maps?q=حي+الأجاويد+جدة&output=embed',
        faq: [
            { q: "هل توفرون كراتين لنقل الأغراض الشخصية في الأجاويد؟", a: "نعم، نوفر كراتين بمقاسات متعددة ومواد تغليف لحماية أغراضك الشخصية أثناء النقل." },
            { q: "هل يمكنني طلب خدمة التغليف فقط؟", a: "نعم، نقدم خدمة التغليف كخدمة مستقلة أو ضمن باقة النقل الشاملة." },
            { q: "هل تقدمون ضماناً على المنقولات؟", a: "نحرص على سلامة عفشك بالكامل، ونتحمل مسؤولية أي ضرر قد يحدث أثناء التحميل أو النقل." },
            { q: "هل يمكن نقل العفش في يوم الإجازة؟", a: "نعم، خدماتنا متاحة طوال أيام الأسبوع لتلبية احتياجات عملائنا في الأجاويد." },
            { q: "ما هي تكلفة نقل غرفة واحدة في الأجاويد؟", a: "التكلفة تعتمد على حجم الغرفة، وتتراوح الأسعار بشكل عام بين 200 إلى 400 ريال للغرفة الواحدة حسب التغليف." }
        ]
    },
    {
        slug: 'hayu-almuhammadiyah',
        keyword: 'نقل عفش حي المحمدية جدة',
        title: 'نقل عفش حي المحمدية جدة | فك وتركيب وتغليف العفش الفاخر',
        desc: 'متخصصون في نقل عفش حي المحمدية جدة، نتعامل مع الأثاث الفاخر للفلل والشقق الراقية بأعلى معايير الأمان والتغليف المضاعف لتجربة انتقال خالية من القلق.',
        placename: 'حي المحمدية، جدة',
        intro: 'يقع حي المحمدية في شمال غرب جدة بين شارع الأمير سلطان وطريق المدينة، وهو من أرقى أحياء جدة التي تضم مجمعات سكنية فاخرة وفللاً راقية. يتطلب نقل العفش هنا مستوى استثنائي من العناية لضمان سلامة القطع الثمينة والمقتنيات الخاصة.',
        scenario: 'نتعامل مع الأثاث في المحمدية بخطة دقيقة تشمل فك الأثاث المودرن والكلاسيكي على يد نجارين محترفين، وتغليفه بمواد عالية الجودة مثل الفوم المقوى، ثم نقله بسيارات دينا مبطنة لضمان عدم حدوث أي خدش للمنقولات الثمينة.',
        nearby: [
            { name: 'حي النزهة', link: '/areas/hayu-alnuzha/' },
            { name: 'حي الزهراء', link: '/areas/hayu-alzahra/' },
            { name: 'حي الخالدية', link: '/areas/hayu-alkhalidiya/' }
        ],
        mapUrl: 'https://www.google.com/maps?q=حي+المحمدية+جدة&output=embed',
        faq: [
            { q: "هل يتم تغليف التحف والمقتنيات الثمينة في فلل المحمدية؟", a: "نعم، نستخدم تغليفاً خاصاً بالفقاعات الإسفنجية والصناديق المبطنة لضمان حماية قصوى للتحف والزجاجيات الثمينة." },
            { q: "هل يمكنكم فك وتركيب الستائر والمكيفات؟", a: "نوفر فنيين لفك وتركيب الستائر وتجهيز المكيفات للشحن كجزء من خدماتنا الشاملة." },
            { q: "هل تنقلون الأثاث المكتبي لشركات المحمدية؟", a: "بالتأكيد، لدينا خدمة متخصصة في نقل المكاتب والمقرات الإدارية بسرعة وفعالية." },
            { q: "هل توفرون أوناش رفع للعمائر في المحمدية؟", a: "نعم، نوفر أوناش رفع هيدروليكية لتسهيل عملية إنزال العفش من الطوابق العليا بأمان." },
            { q: "كم سعر نقل فيلا كاملة من حي المحمدية؟", a: "يتطلب ذلك معاينة مجانية لتقدير حجم الأثاث وعدد الغرف وتحديد السعر النهائي بشفافية." }
        ]
    },
    {
        slug: 'hayu-alkhalidiya',
        keyword: 'نقل عفش حي الخالدية جدة',
        title: 'نقل عفش حي الخالدية جدة | احترافية النقل السكني والتجاري',
        desc: 'خدمات نقل عفش حي الخالدية جدة بأيدي خبراء متخصصين. نوفر نقل أثاث المكاتب والفلل والشقق مع ضمان الفك والتركيب والتغليف الاحترافي وبأسعار منافسة.',
        placename: 'حي الخالدية، جدة',
        intro: 'يمثل حي الخالدية مركزاً حيوياً راقياً يجمع بين الإسكان الفاخر والنشاط التجاري المتنوع في قلب جدة. ونظراً لطبيعة العقارات الفاخرة، نوفر حلول نقل مرنة تناسب المكاتب التجارية والشقق الفخمة بمرونة وسرعة.',
        scenario: 'لضمان سلاسة الانتقال في شوارع الخالدية التي قد تكون مزدحمة، نخطط لموعد النقل بعناية، نستخدم رافعات متطورة لتجاوز ضيق الممرات الداخلية للعمائر، ونعتمد التغليف الشامل الذي يوفر حماية قصوى للأجهزة الإلكترونية والأثاث المكتبي والمنزلي.',
        nearby: [
            { name: 'حي الروضة', link: '/areas/hayu-alrawda/' },
            { name: 'حي الزهراء', link: '/areas/hayu-alzahra/' }
        ],
        mapUrl: 'https://www.google.com/maps?q=حي+الخالدية+جدة&output=embed',
        faq: [
            { q: "هل تتأثر عملية نقل العفش بازدحام شوارع الخالدية؟", a: "نحن نختار أوقاتاً مناسبة للنقل بالتشاور مع العميل لتفادي أوقات الذروة وتسريع عملية الانتقال." },
            { q: "هل تنقلون الأجهزة الرياضية والطبية في الخالدية؟", a: "نعم، نتعامل بحرص مع المعدات الرياضية والأجهزة الثقيلة مع تغليفها بالكامل لضمان سلامتها." },
            { q: "هل يمكن تخزين العفش لفترة مؤقتة؟", a: "نوفر خدمة تخزين الأثاث في مستودعات آمنة ونظيفة لفترات قصيرة أو طويلة حسب رغبة العميل." },
            { q: "هل فريق العمل مدرب على التعامل مع الأثاث الراقي؟", a: "بالتأكيد، فريقنا يضم كوادر متخصصة ومدربة على فك وتركيب ونقل الأثاث المستورد بكل احترافية." },
            { q: "هل يشمل النقل فك وتركيب المطابخ في الخالدية؟", a: "نعم، نقدم خدمة فك وتركيب دواليب المطبخ كجزء من خدماتنا الاختيارية." }
        ]
    }
];

if (!fs.existsSync(templatePath)) {
    console.error("Template not found: " + templatePath);
    process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

areas.forEach(area => {
    const areaDir = path.join(areasDir, area.slug);
    if (!fs.existsSync(areaDir)) {
        fs.mkdirSync(areaDir, { recursive: true });
    }
    
    const dom = new JSDOM(templateHtml);
    const document = dom.window.document;

    // 1. Update Title & Meta
    document.title = area.title;
    document.querySelector('meta[name="description"]').setAttribute('content', area.desc);
    document.querySelector('meta[name="keywords"]').setAttribute('content', `${area.keyword}, ${area.keyword.replace('جدة','').trim()}, شركة نقل عفش, فك وتركيب وتغليف`);
    
    document.querySelector('link[rel="canonical"]').setAttribute('href', `https://almontalaqmoving.com/areas/${area.slug}/`);
    
    document.querySelector('meta[property="og:title"]').setAttribute('content', area.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', area.desc);
    document.querySelector('meta[property="og:url"]').setAttribute('content', `https://almontalaqmoving.com/areas/${area.slug}/`);
    
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', area.title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', area.desc);
    
    document.querySelector('meta[name="geo.placename"]').setAttribute('content', area.placename);

    // 2. Update Schema
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => {
        let text = script.textContent;
        if(text.includes('WebPage')) {
            const data = JSON.parse(text);
            data['@graph'].forEach(item => {
                if(item['@type'] === 'WebPage') {
                    item['@id'] = `https://almontalaqmoving.com/areas/${area.slug}/#webpage`;
                    item.url = `https://almontalaqmoving.com/areas/${area.slug}/`;
                    item.name = area.title;
                    item.description = area.desc;
                }
                if(item['@type'] === 'Service') {
                    item['@id'] = `https://almontalaqmoving.com/areas/${area.slug}/#service`;
                    item.name = area.keyword;
                    item.areaServed = { "@type": "Place", "name": area.placename };
                }
                if(item['@type'] === 'FAQPage') {
                    item['@id'] = `https://almontalaqmoving.com/areas/${area.slug}/#faq`;
                    item.mainEntity = area.faq.map(f => ({
                        "@type": "Question",
                        "name": f.q,
                        "acceptedAnswer": { "@type": "Answer", "text": f.a }
                    }));
                }
            });
            script.textContent = JSON.stringify(data, null, 2);
        }
    });

    // 3. Update Hero
    const h1 = document.querySelector('h1');
    if(h1) h1.textContent = area.keyword;
    
    const heroP = document.querySelector('.hero-grad p');
    if(heroP) heroP.innerHTML = `إذا كنت تبحث عن <strong>شركة نقل عفش بحي ${area.keyword.replace('نقل عفش حي ', '').replace(' جدة', '')}</strong> تقدم خدمة فك وتركيب وتغليف ونش رفع بأسعار تنافسية، فإن <a href="https://almontalaqmoving.com/" class="underline font-bold text-blue-300">شركة المنطلق</a> هي خيارك الأمثل.`;

    // 4. Update Sidebar
    const sidebarTitle = document.querySelector('.lg\\:w-1\\/4 h3');
    if (sidebarTitle) sidebarTitle.textContent = `خدماتنا في حي ${area.keyword.replace('نقل عفش حي ', '').replace(' جدة', '')}`;

    const sidebarLinks = document.querySelectorAll('.lg\\:w-1\\/4 ul li a');
    if(sidebarLinks.length > 0) {
        sidebarLinks[0].textContent = area.keyword;
    }

    // 5. Update Main Content
    let mainContainer = document.querySelector('main');
    if (!mainContainer) {
        const divs = Array.from(document.querySelectorAll('div'));
        mainContainer = divs.find(d => d.className && d.className.includes('lg:w-3/4') && d.className.includes('space-y-'));
    }

    if (mainContainer) {
        // Build the new sections
        let newContent = `
        <section id="intro" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">${area.keyword}</h2>
            <p class="mb-4 text-gray-700 leading-relaxed">${area.intro}</p>
            <div class="flex gap-3 mt-6">
                <a href="tel:0563806459" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                    <i class="fas fa-phone-alt ml-2"></i>اتصل بنا
                </a>
                <a href="https://wa.me/966563806459" class="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                    <i class="fab fa-whatsapp ml-2"></i>واتساب
                </a>
            </div>
        </section>

        <section id="services" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">خدمات نقل العفش في ${area.placename.split('،')[0]}</h2>
            <p class="mb-4 text-gray-700">تغطي خدماتنا جميع متطلبات الانتقال السكني والتجاري من خلال الخيارات التالية:</p>
            
            <div class="grid md:grid-cols-2 gap-4 mt-4">
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-home ml-2"></i>نقل عفش المنازل والفلل والشقق</h3>
                    <p class="text-sm text-gray-600">خدمات متكاملة تناسب جميع أحجام المساكن.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-building ml-2"></i>نقل عفش المكاتب</h3>
                    <p class="text-sm text-gray-600">نقل آمن للتجهيزات المكتبية والملفات الهامة.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-tools ml-2"></i>فك وتركيب العفش</h3>
                    <p class="text-sm text-gray-600">نجارون متخصصون في جميع أنواع الأثاث.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-box ml-2"></i>تغليف العفش</h3>
                    <p class="text-sm text-gray-600">استخدام أفضل مواد التغليف لحماية الممتلكات.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-truck ml-2"></i>دينا نقل العفش</h3>
                    <p class="text-sm text-gray-600">سيارات مغلقة مبطنة بأحجام متنوعة.</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 class="font-bold text-lg text-blue-700 mb-2"><i class="fas fa-warehouse ml-2"></i>تخزين العفش</h3>
                    <p class="text-sm text-gray-600">مستودعات آمنة للتخزين طويل وقصير الأجل.</p>
                </div>
            </div>
            
            <p class="mt-4 text-sm text-gray-500">للمزيد من التفاصيل حول <a href="/furniture-moving-in-jeddah/" class="text-blue-600 hover:underline font-bold">خدمات نقل العفش بجدة</a>، يمكنك زيارة صفحتنا الرئيسية للخدمات.</p>
        </section>

        <section id="scenario" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">خطوات النقل وتجهيز العفش</h2>
            <p class="text-gray-700 leading-relaxed mb-4">${area.scenario}</p>
            <ol class="list-decimal list-inside space-y-2 text-gray-700 font-semibold mb-4">
                <li>معاينة حجم المنقولات لتحديد حجم سيارة الدينا المطلوبة.</li>
                <li>إرسال فني فك وتركيب للتعامل مع غرف النوم والمجالس.</li>
                <li>تغليف شامل للأجهزة الإلكترونية والزجاجيات.</li>
                <li>تحميل آمن بواسطة عمالة مدربة، واستخدام أوناش الرفع إن تطلب الأمر.</li>
                <li>النقل ثم التفريغ وإعادة التركيب في المنزل الجديد.</li>
            </ol>
            <p class="text-sm text-gray-500">هل تحتاج لخدمة تغليف مستقلة؟ اطلع على <a href="/furniture-packaging-in-jeddah/" class="text-blue-600 hover:underline font-bold">تغليف العفش بجدة</a>.</p>
        </section>

        <section id="prices" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">أسعار وعوامل تحديد التكلفة</h2>
            <p class="text-gray-700 leading-relaxed mb-4">تعتمد تكلفة النقل على عدة عوامل مهمة تشمل:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>حجم وكمية الأثاث المنقول (شقة صغيرة مقابل فيلا).</li>
                <li>عدد الغرف التي تتطلب فك وتركيب.</li>
                <li>نوع التغليف المطلوب.</li>
                <li>المسافة بين المنزل القديم والجديد.</li>
            </ul>
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center mt-4">
                <span class="font-bold text-blue-900">للحصول على عرض سعر دقيق:</span>
                <a href="tel:0563806459" class="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold">اطلب تسعيرة الآن</a>
            </div>
        </section>
        
        <section id="map" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">موقع ${area.placename.split('،')[0]}</h2>
            <div class="w-full h-64 rounded-xl overflow-hidden mt-4">
                <iframe src="${area.mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>

        <section id="faq" class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-3xl font-bold mb-4 section-title">الأسئلة الشائعة</h2>
            <div class="space-y-4 mt-6">
                ${area.faq.map(f => `
                <div class="faq-item">
                    <h3 class="font-bold text-lg text-blue-900 mb-2"><i class="fas fa-question-circle text-blue-500 ml-2"></i>${f.q}</h3>
                    <p class="text-gray-700">${f.a}</p>
                </div>
                `).join('')}
            </div>
        </section>

        <section id="nearby-areas" class="bg-blue-50 rounded-2xl shadow-sm p-6 mt-10 border border-blue-100 card-hover">
            <h3 class="text-2xl font-bold mb-3 text-blue-800">أحياء جدة المجاورة</h3>
            <p class="mb-4 text-gray-700">إذا كنت تنتقل إلى حي مجاور، يمكنك الاطلاع على خدماتنا المخصصة للأحياء التالية:</p>
            <ul class="list-disc list-inside space-y-2">
                ${area.nearby.map(n => `<li><a href="${n.link}" class="hover:underline text-blue-600 font-bold">نقل عفش ${n.name} جدة</a></li>`).join('')}
            </ul>
        </section>
        `;
        
        mainContainer.innerHTML = newContent;
    }

    // Save File
    fs.writeFileSync(path.join(areaDir, 'index.html'), dom.serialize());
    console.log("Generated: " + area.slug);
});
