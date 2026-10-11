const fs = require('fs');
let content = fs.readFileSync('blogs/how-to-pack-furniture/index.html', 'utf8');

const target1 = 'وخالية من المشاكل.</p>';
const rep1 = 'وخالية من المشاكل. وإذا كنت ترغب في الاستعانة بفريق محترف يتولى تجهيز وتغليف كافة المقتنيات بأحدث المواد، يمكنك الاستفادة من <a href="https://almontalaqmoving.com/furniture-packaging-in-jeddah/" class="text-blue-600 font-bold hover:underline">خدمة تغليف العفش بجدة</a> المتاحة لدينا.</p>';

content = content.replace(target1, rep1);
content = content.replace('مدونة دينا نقل العفش في جدة', 'خدمة دينا نقل العفش بجدة');

fs.writeFileSync('blogs/how-to-pack-furniture/index.html', content, 'utf8');
console.log('Successfully updated blogs/how-to-pack-furniture/index.html');
