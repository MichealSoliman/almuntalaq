/**
 * home-services.js
 * بيانات بطاقات الخدمات في الصفحة الرئيسية وزر "المزيد من الخدمات".
 * أول 10 بطاقات موجودة كـ HTML ثابت في index.html، والباقي يُضاف عند الضغط على الزر.
 */
// ========== بيانات الخدمات (JavaScript Object - Array of Objects) ==========
const servicesData = [
    // الخدمات الأساسية (الـ 6 الأولى ستظهر تلقائياً عند تحميل الصفحة)
    {
        id: 1,
        title: "نقل عفش بجدة",
        description: "خدمة نقل سريعة وآمنة لجميع أنواع الأثاث مع عمالة مدربة وشاحنات دينا مجهزة بأحدث أنظمة التثبيت والتبطين الداخلي لحماية المنقولات.",
        image: "./assets/img/furniture-moving-in-jeddah.webp",
        badge: "الأكثر طلباً",
        badgeColor: "bg-white/90",
        badgeIcon: "fa-star",
        badgeIconColor: "text-amber-400",
        features: [
            { icon: "fa-clock", text: "24 ساعة" },
            { icon: "fa-shield-alt", text: "ضمان شامل" }
        ],
        link: "./furniture-moving-companies-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 2,
        title: "فك وتركيب الأثاث",
        description: "فك جميع أنواع الأثاث (غرف نوم – مجالس – مطابخ) وإعادة تركيبها بدقة واحترافية بواسطة نجارين محترفين ودون أي أضرار.",
        image: "./assets/img/furniture-dismantling-and-assembly.webp",
        badge: null,
        features: [
            { icon: "fa-wrench", text: "أدوات حديثة" },
            { icon: "fa-check-circle", text: "تركيب متقن" }
        ],
        link: "./furniture-dismantling-and-assembly-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 3,
        title: "تغليف الأثاث بجدة",
        description: "تغليف متقن باستخدام أجود الخامات العازلة (بلاستيك فقاعي، كرتون سميك، نايلون ستريتش، فوم) لحماية العفش والزجاج من الخدوش والكسر.",
        image: "./assets/img/furniture-packaging-and-protection.webp",
        badge: null,
        features: [
            { icon: "fa-box", text: "مواد فاخرة" },
            { icon: "fa-shield-alt", text: "حماية فائقة" }
        ],
        link: "./furniture-packaging-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 4,
        title: "ونش رفع عفش بجدة",
        description: "تنزيل ورفع العفش والأثاث للأدوار العليا والمباني الشاهقة باستخدام أحدث الأوناش الهيدروليكية لحماية العفش من ضيق السلالم.",
        image: "./assets/img/hydraulic-winch-moving-jeddah.webp",
        badge: "ونش هيدروليكي",
        badgeColor: "bg-orange-500 text-white",
        badgeIcon: "fa-truck-pickup",
        badgeIconColor: "text-white",
        features: [
            { icon: "fa-building", text: "للأدوار العليا" },
            { icon: "fa-shield-alt", text: "أمان كامل" }
        ],
        link: "./hydraulic-winch-moving-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 5,
        title: "تخزين أثاث بجدة",
        description: "مستودعات آمنة، مكيفة ومحمية لتخزين العفش والأثاث لفترات قصيرة أو طويلة مع نظام مراقبة مستمر ورش وقائي للحشرات.",
        image: "./assets/img/furniture-storage.webp",
        badge: null,
        features: [
            { icon: "fa-temperature-low", text: "تكييف مثالي" },
            { icon: "fa-lock", text: "أمان عالي" }
        ],
        link: "./furniture-storage-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 6,
        title: "دليل اختيار شركات نقل العفش",
        description: "كيف تقارن بين شركات نقل العفش في جدة؟ معايير واضحة للسعر والتغليف والضمان وأسئلة تسألها قبل الحجز.",
        image: "./assets/img/furniture-moving-company-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-shipping-fast", text: "نقل سريع" },
            { icon: "fa-shield-alt", text: "حماية كاملة" }
        ],
        link: "/furniture-moving-companies-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 7,
        title: "عمال نقل عفش بجدة",
        description: "طاقم عمل محترف من عمالة مدربة على رفع ونقل العفش الثقيل والتعامل مع الأنتيكات والزجاج بحرص شديد وكفاءة عالية.",
        image: "./assets/img/furniture-moving-workers-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-users", text: "عمالة مدربة" },
            { icon: "fa-bolt", text: "سرعة وإتقان" }
        ],
        link: "./furniture-moving-workers-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 8,
        title: "نقل غرف النوم بجدة",
        description: "خدمة متخصصة لنقل غرف النوم بجدة تشمل فك وتركيب جميع أنواع الغرف المودرن والكلاسيك والايكيا وتغليفها بدقة عالية لضمان عدم خدشها.",
        image: "./assets/img/bedroom-moving-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-bed", text: "فك وتركيب غرف النوم" },
            { icon: "fa-box-open", text: "تغليف احترافي" }
        ],
        link: "./bedroom-moving-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },

    // ========== خدمات إضافية (ستظهر عند الضغط على زر المزيد) ==========

    {
        id: 9,
        title: "شركة نقل عفش فلل بجدة",
        description: "شركة متخصصة في نقل عفش الفلل والقصور بجدة مع الفك والتركيب والتغليف الشامل لنقل الأثاث الفاخر والثقيل بسيارات مجهزة.",
        image: "./assets/img/moving-villa-furniture-in-jeddah.webp",
        badge: "نقل فلل",
        features: [
            { icon: "fa-home", text: "نقل كافة الفلل" },
            { icon: "fa-shield-alt", text: "حماية كاملة للأثاث" }
        ],
        link: "./moving-villa-furniture-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 10,
        title: "نقل أثاث مكاتب بجدة",
        description: "نقدم خدمات نقل أثاث المكاتب والشركات بجدة باحترافية تشمل فك وتركيب المكاتب الإدارية، تغليف الأجهزة والمستندات بأسلوب منظم وسريع.",
        image: "./assets/img/moving-office-furniture-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-briefcase", text: "نقل مكاتب احترافي" },
            { icon: "fa-shield-alt", text: "حماية للمعدات" }
        ],
        link: "./moving-office-furniture-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 11,
        title: "نقل أثاث شركات بجدة",
        description: "نقل وتجهيز مكاتب ومقرات الشركات في جدة مع الفك والتغليف والتركيب السريع لحفظ استمرارية بيئة العمل وتوفير عروض للشركات.",
        image: "./assets/img/furniture-moving-companies-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-building", text: "نقل أثاث الشركات" },
            { icon: "fa-truck-moving", text: "نقل سريع وآمن" }
        ],
        link: "./furniture-moving-companies-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 12,
        title: "نقل أجهزة كهربائية بجدة",
        description: "نقل الثلاجات والغسالات والمكيفات والشاشات بحذر شديد مع الاستعانة بمعدات تثبيت خاصة وسيارات مجهزة تحمي الأجهزة الإلكترونية.",
        image: "./assets/img/moving-electrical-appliances-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-plug", text: "نقل الأجهزة الكهربائية" },
            { icon: "fa-truck-moving", text: "نقل آمن وسريع" }
        ],
        link: "./moving-electrical-appliances-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    },
    {
        id: 13,
        title: "نقل المكيفات بجدة",
        description: "فك ونقل وإعادة تركيب المكيفات السبليت والشباك بواسطة فنيين متمرسين مع فحص الفريون واختبار التبريد بعد النقل بكفاءة.",
        image: "./assets/img/ac-relocation-in-jeddah.webp",
        badge: null,
        features: [
            { icon: "fa-snowflake", text: "فك وتركيب المكيفات" },
            { icon: "fa-truck-moving", text: "نقل آمن وسريع" }
        ],
        link: "./ac-relocation-in-jeddah/",
        phone: "0563806459",
        whatsapp: "966563806459",
        isNew: false
    }



];

// ========== إعدادات التحميل ==========
let currentIndex = 0;       // المؤشر الحالي
const servicesPerLoad = 3;   // عدد الخدمات التي تظهر في كل ضغطة

// عناصر DOM
const servicesGrid = document.getElementById('servicesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');

// ========== دالة إنشاء بطاقة خدمة ==========
function createServiceCard(service, index) {
    const isEvenLoad = Math.floor(index / servicesPerLoad) % 2 === 0;
    const delay = (index % servicesPerLoad) * 100;

    // إنشاء عنصر البطاقة
    const card = document.createElement('div');
    card.className = `service-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2`;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', delay);

    // بناء محتوى البطاقة
    let badgeHTML = '';
    if (service.badge) {
        badgeHTML = `
    <div class="absolute top-4 left-4 ${service.badgeColor || 'bg-white/90'} backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold shadow-md z-10">
        <i class="fas ${service.badgeIcon || 'fa-star'} ${service.badgeIconColor || 'text-amber-400'} ml-1"></i> 
        ${service.badge}
    </div>
`;
    }

    // بناء المميزات (features)
    let featuresHTML = '';
    if (service.features && service.features.length > 0) {
        featuresHTML = `
    <div class="flex items-center gap-2 mb-4 text-sm text-slate-400">
        ${service.features.map((feature, idx) => `
            <span class="flex items-center gap-1">
                <i class="fas ${feature.icon} text-blue-400 text-xs"></i> 
                ${feature.text}
            </span>
            ${idx < service.features.length - 1 ? '<span class="w-1 h-1 bg-slate-300 rounded-full"></span>' : ''}
        `).join('')}
    </div>
`;
    }

    // صورة افتراضية في حالة فشل التحميل
    const defaultImage = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(service.title)}`;

    card.innerHTML = `
<div class="relative overflow-hidden">
    <img src="${service.image}" 
         alt="${service.title}" 
         class="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-110" 
         loading="lazy"
         onerror="this.src='${defaultImage}'" decoding="async">
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    ${badgeHTML}
</div>
<div class="p-6">
    <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-slate-800">${service.title}</h3>
        <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <i class="fas fa-truck-moving text-blue-500 text-lg"></i>
        </div>
    </div>
    <p class="text-slate-500 leading-relaxed mb-4">${service.description}</p>
    <a href="${service.link}" class="inline-block text-blue-600 hover:text-blue-800 text-sm font-semibold mb-4 transition">
        قراءة المزيد ←
    </a>
    ${featuresHTML}
    <div class="flex gap-3">
        <a href="tel:${service.phone}" class="flex-1 bg-slate-100 hover:bg-[#1e293b] text-slate-700 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-300">
            <i class="fas fa-phone-alt ml-1"></i> اتصال
        </a>
        <a href="https://wa.me/${service.whatsapp}" target="_blank" class="flex-1 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-300">
            <i class="fab fa-whatsapp ml-1"></i> واتساب
        </a>
    </div>
</div>
        `;

    return card;
}

// ========== دالة تحميل الخدمات ==========
function loadServices() {
    // حساب عدد الخدمات المتبقية
    const remainingServices = servicesData.length - currentIndex;

    if (remainingServices <= 0) {
        // لا توجد خدمات متبقية -> إخفاء الزر
        if (loadMoreContainer) {
            loadMoreContainer.style.display = 'none';
        }
        return;
    }

    // عدد الخدمات التي سنضيفها هذه المرة (الحد الأقصى servicesPerLoad)
    const servicesToLoad = Math.min(servicesPerLoad, remainingServices);

    // إضافة تأثير توهج للزر
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('btn-loading');
        setTimeout(() => {
            loadMoreBtn.classList.remove('btn-loading');
        }, 400);
    }

    // إضافة الخدمات واحدة تلو الأخرى مع تأثير
    for (let i = 0; i < servicesToLoad; i++) {
        const service = servicesData[currentIndex + i];
        const card = createServiceCard(service, currentIndex + i);
        card.classList.add('service-card-new');
        servicesGrid.appendChild(card);

        // إزالة تأثير الأنيميشن بعد انتهائه
        setTimeout(() => {
            card.classList.remove('service-card-new');
        }, 500);
    }

    // تحديث المؤشر
    currentIndex += servicesToLoad;

    // التحقق من نفاذ الخدمات
    if (currentIndex >= servicesData.length) {
        if (loadMoreContainer) {
            loadMoreContainer.style.display = 'none';
        }
    }

    // تمرير سلس إلى الخدمات الجديدة
    if (servicesToLoad > 0) {
        setTimeout(() => {
            const lastCard = servicesGrid.lastElementChild;
            if (lastCard) {
                lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }
}

// ========== تحميل الخدمات الأساسية عند بدء الصفحة ==========
function initServices() {
    // البطاقات الأساسية (أول 10 خدمات) موجودة بالفعل كـ HTML ثابت لمنع التكرار ودعم الـ SEO
    const staticCardsCount = 10;
    currentIndex = Math.min(staticCardsCount, servicesData.length);

    // إذا لم يتبق خدمات، إخفاء الزر
    if (currentIndex >= servicesData.length && loadMoreContainer) {
        loadMoreContainer.style.display = 'none';
    }
}

// ========== تشغيل AOS على العناصر الجديدة ==========
function observeNewCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const cards = document.querySelectorAll('[data-aos]');
    cards.forEach(card => observer.observe(card));
}

// ========== بدء التشغيل ==========
document.addEventListener('DOMContentLoaded', function () {
    initServices();

    // إضافة حدث النقر على زر "المزيد من الخدمات"
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadServices);
    }

    // تشغيل AOS
    setTimeout(observeNewCards, 100);

    // إعادة تشغيل AOS عند إضافة بطاقات جديدة
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                observeNewCards();
            }
        });
    });

    observer.observe(servicesGrid, { childList: true });
});
