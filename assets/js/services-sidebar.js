document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.lg\\:w-1\\/4 > div, aside > div');
  if (!sidebar) return;

  // List of services (uses central window.SITE_SERVICES if loaded)
  const services = (typeof window !== 'undefined' && window.SITE_SERVICES) ? window.SITE_SERVICES : [
    { name: 'نقل عفش بالرياض', path: '/furniture-moving-in-riyadh/' },
    { name: 'شركة نقل عفش بالرياض', path: '/best-furniture-moving-company-riyadh/' },
    { name: 'ونش رفع عفش بالرياض', path: '/winch-furniture-moving-in-riyadh/' },
    { name: 'فك وتركيب الأثاث بالرياض', path: '/furniture-dismantling-and-assembly-in-riyadh/' },
    { name: 'تغليف الأثاث بالرياض', path: '/furniture-packaging-in-riyadh/' },
    { name: 'تخزين العفش بالرياض', path: '/furniture-storage-in-riyadh/' },
    { name: 'نقل العفش مع التغليف', path: '/furniture-moving-with-packing-riyadh/' },
    { name: 'نقل عفش فلل بالرياض', path: '/moving-villa-furniture-in-riyadh/' },
    { name: 'نقل أثاث مكاتب بالرياض', path: '/moving-office-furniture-in-riyadh/' },
    { name: 'نقل أجهزة كهربائية بالرياض', path: '/moving-electrical-appliances-in-riyadh/' },
    { name: 'نقل وتثبيت مكيفات بالرياض', path: '/ac-relocation-in-riyadh/' },
    { name: 'نقل غرف نوم بالرياض', path: '/bedroom-moving-riyadh/' },
    { name: 'نقل المطابخ بالرياض', path: '/kitchen-moving-in-riyadh/' },
    { name: 'نقل أثاث الفنادق بالرياض', path: '/hotel-furniture-moving-in-riyadh/' },
    { name: 'نقل عفش سكني بالرياض', path: '/residential-furniture-moving-in-riyadh/' }
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
        خدماتنا الأخرى بالرياض
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
        دليل نقل عفش الرياض
      </h4>
      <div class="flex flex-col gap-2 text-[13px]">
        <a href="https://almontalaqmoving.com/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          شركة نقل عفش الرياض
        </a>
        <a href="https://almontalaqmoving.com/furniture-moving-in-riyadh/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          نقل عفش الرياض
        </a>
        <a href="https://almontalaqmoving.com/best-furniture-moving-company-riyadh/" class="block p-2 rounded text-center transition-all bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent font-medium">
          افضل شركة نقل عفش بالرياض
        </a>
      </div>
    </div>
  `;

  // Append to sidebar
  sidebar.insertAdjacentHTML('beforeend', html);
});
