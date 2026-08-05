document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.lg\\:w-1\\/4 > div, aside > div');
  if (!sidebar) return;

  // List of Riyadh neighborhoods
  const neighborhoods = [
    { name: 'حي الملقا', path: '/areas/hayu-almalqa/' },
    { name: 'حي الياسمين', path: '/areas/hayu-alyasmin/' },
    { name: 'حي النرجس', path: '/areas/hayu-alnargis/' },
    { name: 'حي حطين', path: '/areas/hayu-hittin/' },
    { name: 'حي العقيق', path: '/areas/hayu-alaqeeq/' },
    { name: 'حي الصحافة', path: '/areas/hayu-alsahafa/' },
    { name: 'حي النخيل', path: '/areas/hayu-alnakhil/' },
    { name: 'حي الروضة', path: '/areas/hayu-alrawdah-riyadh/' },
    { name: 'حي اليرموك', path: '/areas/hayu-alyarmouk/' },
    { name: 'حي المونسية', path: '/areas/hayu-almunsiyah/' },
    { name: 'حي الحمراء', path: '/areas/hayu-alhamra-riyadh/' },
    { name: 'حي الملز', path: '/areas/hayu-almalaz/' },
    { name: 'حي الشفا', path: '/areas/hayu-alshifa/' },
    { name: 'حي السويدي', path: '/areas/hayu-alsuwaidi/' },
    { name: 'حي ظهرة لبن', path: '/areas/hayu-dhahrat-laban/' }
  ];

  // List of intercity routes from Riyadh
  const intercity = [
    { name: 'من الرياض إلى جدة', path: '/areas/riyadh-to-jeddah/' },
    { name: 'من الرياض إلى الدمام', path: '/areas/riyadh-to-dammam/' },
    { name: 'من الرياض إلى المدينة', path: '/areas/riyadh-to-madinah/' },
    { name: 'من الرياض إلى مكة', path: '/areas/riyadh-to-makkah/' },
    { name: 'من الرياض إلى القصيم', path: '/areas/riyadh-to-qassim/' }
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
        <i class="fas fa-map-marker-alt text-blue-600 text-sm"></i>
        خدماتنا في الأحياء الأخرى
      </h4>
      <div class="grid grid-cols-2 gap-2 text-[13px]">
  `;

  neighborhoods.forEach(item => {
    const activeClass = isActive(item.path) 
      ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200 shadow-sm' 
      : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 border border-transparent';
    
    html += `
        <a href="${item.path}" class="block p-2 rounded text-center transition-all ${activeClass}">
          ${item.name}
        </a>
    `;
  });

  html += `
      </div>

      <h4 class="text-base font-bold mt-6 mb-3 text-gray-800 flex items-center gap-2">
        <i class="fas fa-truck text-blue-600 text-sm"></i>
        نقل عفش بين المدن
      </h4>
      <div class="flex flex-col gap-2 text-[13px]">
  `;

  intercity.forEach(item => {
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
    </div>
  `;

  // Append to sidebar
  sidebar.insertAdjacentHTML('beforeend', html);
});
