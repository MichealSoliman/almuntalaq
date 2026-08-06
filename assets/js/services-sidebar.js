document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.lg\\:w-1\\/4 > div, aside > div');
  if (!sidebar) return;

  // List of services (uses central window.SITE_SERVICES if loaded)
  const services = (typeof window !== 'undefined' && window.SITE_SERVICES) ? window.SITE_SERVICES : [
    { name: 'نقل عفش بجدة', path: '/furniture-moving-in-jeddah/' },
    { name: 'شركة نقل عفش بجدة', path: '/furniture-moving-company-in-jeddah/' },
    { name: 'عمال نقل عفش بجدة', path: '/furniture-moving-workers-in-jeddah/' },
    { name: 'فك وتركيب الأثاث بجدة', path: '/furniture-dismantling-and-assembly-in-jeddah/' },
    { name: 'تغليف الأثاث بجدة', path: '/furniture-packaging-in-jaddah/' },
    { name: 'تخزين العفش بجدة', path: '/furniture-storage-in-jeddah/' },
    { name: 'نقل العفش مع التغليف', path: '/furniture-moving-with-packing/' },
    { name: 'نقل عفش فلل بجدة', path: '/moving-villa-furniture-in-jeddah/' },
    { name: 'نقل أثاث مكاتب بجدة', path: '/moving-office-furniture-in-jeddah/' },
    { name: 'نقل أجهزة كهربائية بجدة', path: '/moving-electrical-appliances-in-jeddah/' },
    { name: 'نقل وتثبيت مكيفات بجدة', path: '/ac-relocation-in-jeddah/' },
    { name: 'نقل غرف نوم بجدة', path: '/bedroom-moving-jeddah/' },
    { name: 'نقل المطابخ بجدة', path: '/kitchen-moving-in-jeddah/' },
    { name: 'نقل أثاث الفنادق بجدة', path: '/hotel-furniture-moving-in-jeddah/' },
    { name: 'نقل عفش سكني بجدة', path: '/residential-furniture-moving-in-jeddah/' }
  ];

  // Helper to check if a path matches the current page
  const isActive = (path) => {
    const folderName = path.split('/').filter(Boolean).pop();
    return window.location.pathname.includes(folderName);
  };

  // Generate HTML
  let html = `
    <div class="mt-6 pt-6 border-t border-gray-100">
      <h4 class="text-base font-bold mb-3 text-gray-800 flex items-center gap-2">
        <i class="fas fa-cogs text-blue-600 text-sm"></i>
        خدماتنا الأخرى بجدة
      </h4>
      <div class="flex flex-col gap-1.5 text-[13px]">
  `;

  services.forEach(item => {
    const activeClass = isActive(item.path)
      ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200 shadow-sm'
      : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent';

    html += `
        <a href="${item.path}" class="flex items-center justify-between p-2.5 rounded transition-all ${activeClass}">
          <span>${item.name}</span>
          <i class="fas fa-chevron-left text-[10px] opacity-70"></i>
        </a>
    `;
  });

  html += `
      </div>

      <h4 class="text-base font-bold mt-6 mb-3 text-gray-800 flex items-center gap-2">
        <i class="fas fa-link text-blue-600 text-sm"></i>
        دليل نقل عفش جدة
      </h4>
      <div class="flex flex-col gap-2 text-[13px]">
        <a href="https://almontalaqmoving.com/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          شركة نقل عفش جدة
        </a>
        <a href="https://almontalaqmoving.com/furniture-moving-in-jeddah/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          نقل عفش جدة
        </a>
        <a href="https://almontalaqmoving.com/furniture-moving-company-in-jeddah/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          افضل شركة نقل عفش بجدة
        </a>
      </div>
    </div>
  `;

  // Append to sidebar
  sidebar.insertAdjacentHTML('beforeend', html);
});
