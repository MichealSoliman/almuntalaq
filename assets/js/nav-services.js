/**
 * nav-services.js
 * القائمة المنسدلة للخدمات في النافبار (Dropdown Menu)
 * يحتوي هذا الملف على جميع لينكات خدمات شركة المنطلق لنقل العفش.
 * تعديل أو إضافة أي خدمة هنا ينعكس تلقائياً في نافبار جميع صفحات الموقع.
 */

(function () {
  // قائمة الخدمات المركزية لشركة المنطلق
  const SITE_SERVICES = [
    {
      name: 'نقل عفش بجدة',
      path: '/furniture-moving-in-jeddah/',
      icon: 'fa-truck-moving',
      desc: 'خدمة نقل عفش وأثاث متكاملة داخل وخارج جدة'
    },
    {
      name: 'شركة نقل عفش بجدة',
      path: '/furniture-moving-company-in-jeddah/',
      icon: 'fa-building',
      desc: 'أفضل شركة متخصصة وموثوقة لنقل العفش'
    },
    {
      name: 'شركات نقل العفش بجدة',
      path: '/furniture-moving-companies-in-jeddah/',
      icon: 'fa-award',
      desc: 'دليل ورائد شركات نقل الأثاث المعتمدة'
    },
    {
      name: 'فك وتركيب الأثاث بجدة',
      path: '/furniture-dismantling-and-assembly-in-jeddah/',
      icon: 'fa-tools',
      desc: 'نجارون متخصصون لفك وتركيب الأثاث بدقة'
    },
    {
      name: 'تغليف الأثاث بجدة',
      path: '/furniture-packaging-in-jaddah/',
      icon: 'fa-box-open',
      desc: 'تغليف بحماية فائقة بمواد عالية الجودة'
    },
    {
      name: 'تخزين العفش بجدة',
      path: '/furniture-storage-in-jeddah/',
      icon: 'fa-warehouse',
      desc: 'مستودعات مؤمنة ومجهزة لتخزين العفش'
    },
    {
      name: 'نقل العفش مع التغليف',
      path: '/furniture-moving-with-packing/',
      icon: 'fa-boxes-packing',
      desc: 'خدمة دمج النقل والتغليف الشامل للأثاث'
    },
    {
      name: 'نقل عفش فلل بجدة',
      path: '/moving-villa-furniture-in-jeddah/',
      icon: 'fa-house-chimney',
      desc: 'نقل أثاث الفلل والقصور بأعلى معايير الأمان'
    },
    {
      name: 'نقل أثاث مكاتب بجدة',
      path: '/moving-office-furniture-in-jeddah/',
      icon: 'fa-briefcase',
      desc: 'نقل المكاتب والشركات بدون تعطيل للعمل'
    },
    {
      name: 'نقل أجهزة كهربائية بجدة',
      path: '/moving-electrical-appliances-in-jeddah/',
      icon: 'fa-plug',
      desc: 'عناية خاصة ونقل آمن للأجهزة الكهربائية'
    },
    {
      name: 'نقل وتثبيت مكيفات بجدة',
      path: '/ac-relocation-in-jeddah/',
      icon: 'fa-snowflake',
      desc: 'فك ونقل وتنظيف وتركيب المكيفات'
    },
    {
      name: 'نقل غرف نوم بجدة',
      path: '/bedroom-moving-jeddah/',
      icon: 'fa-bed',
      desc: 'فك ونقل وتغليف غرف النوم باحترافية'
    },
    {
      name: 'نقل المطابخ بجدة',
      path: '/kitchen-moving-in-jeddah/',
      icon: 'fa-kitchen-set',
      desc: 'فك ونقل وتعديل ورص المطابخ'
    },
    {
      name: 'نقل أثاث الفنادق بجدة',
      path: '/hotel-furniture-moving-in-jeddah/',
      icon: 'fa-hotel',
      desc: 'خدمات نقل وتجهيز أثاث الفنادق والوحدات'
    },
    {
      name: 'نقل عفش سكني بجدة',
      path: '/residential-furniture-moving-in-jeddah/',
      icon: 'fa-home',
      desc: 'نقل أثاث المنازل والشقق السكنية'
    }
  ];

  window.SITE_SERVICES = SITE_SERVICES;

  function initServicesDropdown() {
    setupDesktopDropdown();
    setupMobileDropdown();
  }

  function setupDesktopDropdown() {
    const desktopNav = document.querySelector('header#navbar .hidden.lg\\:flex');
    if (!desktopNav) return;

    const servicesLink = Array.from(desktopNav.querySelectorAll('a')).find(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('services') || a.textContent.trim() === 'خدماتنا';
    });

    if (!servicesLink) return;

    const currentPath = window.location.pathname;

    const wrapper = document.createElement('div');
    wrapper.className = 'relative group cursor-pointer inline-block';

    const newServicesLink = document.createElement('a');
    newServicesLink.href = '/services/';
    newServicesLink.className = 'nav-link relative px-4 py-2 font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center gap-1.5 group-hover:text-blue-600';
    newServicesLink.innerHTML = `
      <span>خدماتنا</span>
      <i class="fas fa-chevron-down text-[11px] opacity-75 group-hover:rotate-180 transition-transform duration-300"></i>
      <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-blue-500 to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
    `;

    let dropHtml = `
      <div class="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none group-hover:pointer-events-auto min-w-[640px]">
        <div class="bg-[#1e3a8a] backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl p-4 ring-1 ring-black/5">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 px-2">
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-cubes text-blue-600 text-sm"></i>
              خدمات المنطلق لنقل العفش بجدة
            </span>
            <a href="/services/" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100">
              عرض كل الخدمات <i class="fas fa-arrow-left text-[10px]"></i>
            </a>
          </div>

          <div class="grid grid-cols-2 gap-2 max-h-[460px] overflow-y-auto custom-scroll p-1">
    `;

    SITE_SERVICES.forEach(service => {
      const folderName = service.path.replace(/^\/|\/$/g, '');
      const isActive = folderName && currentPath.includes(folderName);
      const activeStyle = isActive
        ? 'bg-blue-50/90 text-blue-700 font-bold border-blue-200 shadow-sm'
        : 'hover:bg-blue-50/60 text-gray-700 hover:text-blue-600 border-transparent';

      dropHtml += `
        <a href="${service.path}" class="flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 group/item ${activeStyle}">
          <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200 border border-blue-100">
            <i class="fas ${service.icon} text-sm"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold leading-snug group-hover/item:text-blue-600 transition-colors flex items-center justify-between">
              <span class="truncate">${service.name}</span>
              <i class="fas fa-chevron-left text-[9px] opacity-0 group-hover/item:opacity-100 transform translate-x-1 group-hover/item:translate-x-0 transition-all text-blue-500"></i>
            </div>
            <p class="text-[11px] text-gray-400 truncate mt-0.5 font-normal">${service.desc}</p>
          </div>
        </a>
      `;
    });

    dropHtml += `
          </div>
        </div>
      </div>
    `;

    wrapper.appendChild(newServicesLink);
    wrapper.insertAdjacentHTML('beforeend', dropHtml);

    servicesLink.replaceWith(wrapper);
  }

  function setupMobileDropdown() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    const mobileServicesLink = Array.from(mobileMenu.querySelectorAll('a')).find(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('services') || a.textContent.trim() === 'خدماتنا';
    });

    if (!mobileServicesLink) return;

    const currentPath = window.location.pathname;

    const container = document.createElement('div');
    container.className = 'w-full';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'w-full nav-link-mobile font-semibold text-gray-700 hover:text-[#1e293b] hover:bg-blue-50 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between text-right';
    btn.innerHTML = `
      <span class="flex items-center gap-3">
        <i class="fas fa-cogs text-blue-400 w-5"></i>
        خدماتنا
      </span>
      <i class="fas fa-chevron-down text-xs transition-transform duration-300" id="mobileServicesArrow"></i>
    `;

    let subHtml = `
      <div id="mobileServicesSub" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out pr-4 pl-1 space-y-1 my-1">
    `;

    SITE_SERVICES.forEach(service => {
      const folderName = service.path.replace(/^\/|\/$/g, '');
      const isActive = folderName && currentPath.includes(folderName);
      const activeStyle = isActive
        ? 'bg-blue-50 text-blue-600 font-bold'
        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600';

      subHtml += `
        <a href="${service.path}" class="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${activeStyle}">
          <i class="fas ${service.icon} text-blue-500 text-xs w-4 text-center"></i>
          <span>${service.name}</span>
        </a>
      `;
    });

    subHtml += `
        <a href="/services/" class="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold text-blue-600 bg-blue-50/80 mt-1">
          <span>عرض جميع الخدمات</span>
          <i class="fas fa-arrow-left text-[10px]"></i>
        </a>
      </div>
    `;

    container.appendChild(btn);
    container.insertAdjacentHTML('beforeend', subHtml);

    mobileServicesLink.replaceWith(container);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = document.getElementById('mobileServicesSub');
      const arrow = document.getElementById('mobileServicesArrow');
      if (!sub || !arrow) return;

      if (sub.classList.contains('max-h-0')) {
        sub.classList.remove('max-h-0');
        sub.classList.add('max-h-[800px]');
        arrow.classList.add('rotate-180');
      } else {
        sub.classList.add('max-h-0');
        sub.classList.remove('max-h-[800px]');
        arrow.classList.remove('rotate-180');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesDropdown);
  } else {
    initServicesDropdown();
  }
})();
