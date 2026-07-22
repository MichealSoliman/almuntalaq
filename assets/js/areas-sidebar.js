document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.lg\\:w-1\\/4 > div, aside > div');
  if (!sidebar) return;

  // List of neighborhoods
  const neighborhoods = [
    { name: 'حي البساتين', path: '/areas/hayu-albasateen/' },
    { name: 'حي البوادي', path: '/areas/hayu-albawadi/' },
    { name: 'حي العزيزية', path: '/areas/hayu-aleazizia/' },
    { name: 'حي الفيصلية', path: '/areas/hayu-alfaysalia/' },
    { name: 'حي الحمدانية', path: '/areas/hayu-alhamdania/' },
    { name: 'حي المروة', path: '/areas/hayu-almarwa/' },
    { name: 'حي النسيم', path: '/areas/hayu-alnasim/' },
    { name: 'حي النزهة', path: '/areas/hayu-alnuzha/' },
    { name: 'حي الروضة', path: '/areas/hayu-alrawda/' },
    { name: 'حي الربوة', path: '/areas/hayu-alrubwa/' },
    { name: 'حي الصفا', path: '/areas/hayu-alsafa/' },
    { name: 'حي السلامة', path: '/areas/hayu-alsalama/' },
    { name: 'حي السامر', path: '/areas/hayu-alsamer/' },
    { name: 'حي الشاطئ', path: '/areas/hayu-alshaati/' },
    { name: 'حي الزهراء', path: '/areas/hayu-alzahra/' }
  ];

  // List of intercity routes
  const intercity = [
    { name: 'من جدة إلى الرياض', path: '/areas/jeddah-to-riyadh/' },
    { name: 'من جدة إلى مكة', path: '/areas/jeddah-to-makkah/' },
    { name: 'من جدة إلى المدينة', path: '/areas/jeddah-to-madinah/' },
    { name: 'من جدة إلى الدمام', path: '/areas/jeddah-to-dammam/' },
    { name: 'من جدة إلى الطائف', path: '/areas/jeddah-to-taif/' }
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
