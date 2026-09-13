import re
import json

file_path = r'c:\Users\HP\Desktop\my-work\almuntalaq\furniture-moving-company-in-jeddah\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Title
content = re.sub(
    r'<title>.*?</title>',
    '<title>شركة نقل عفش بجدة | نقل أثاث وفك وتركيب وتغليف</title>',
    content
)

# 2. Meta description
content = re.sub(
    r'<meta name="description"\s+content="[^"]*">',
    '<meta name="description"\n        content="شركة نقل عفش بجدة لخدمات نقل الأثاث للمنازل والفلل والمكاتب، مع الفك والتركيب والتغليف والنقل بسيارات مجهزة داخل جدة وخارجها.">',
    content
)

# 3. OG Tags
content = re.sub(
    r'<meta property="og:title" content="[^"]*">',
    '<meta property="og:title" content="شركة نقل عفش بجدة | نقل أثاث وفك وتركيب وتغليف">',
    content
)
content = re.sub(
    r'<meta property="og:description"\s+content="[^"]*">',
    '<meta property="og:description"\n        content="شركة نقل عفش بجدة لخدمات نقل الأثاث للمنازل والفلل والمكاتب، مع الفك والتركيب والتغليف والنقل بسيارات مجهزة داخل جدة وخارجها.">',
    content
)

# 4. Twitter Tags
content = re.sub(
    r'<meta name="twitter:title" content="[^"]*">',
    '<meta name="twitter:title" content="شركة نقل عفش بجدة | نقل أثاث وفك وتركيب وتغليف">',
    content
)
content = re.sub(
    r'<meta name="twitter:description"\s+content="[^"]*">',
    '<meta name="twitter:description"\n        content="شركة نقل عفش بجدة لخدمات نقل الأثاث للمنازل والفلل والمكاتب، مع الفك والتركيب والتغليف والنقل بسيارات مجهزة داخل جدة وخارجها.">',
    content
)

# 5. Schema Update
schema_match = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', content)
if schema_match:
    schema_json_str = schema_match.group(1)
    try:
        schema = json.loads(schema_json_str)
        graph = schema.get('@graph', [])
        
        for item in graph:
            if item.get('@type') == 'MovingCompany':
                # Remove aggregate rating
                if 'aggregateRating' in item:
                    del item['aggregateRating']
                item['name'] = "شركة المنطلق لنقل العفش بجدة"
                item['description'] = "شركة نقل عفش بجدة تقدم خدمات نقل الأثاث والفك والتركيب والتغليف للمنازل والفلل والمكاتب بسيارات مجهزة."
                if 'url' in item:
                    item['url'] = "https://almontalaqmoving.com/"
            elif item.get('@type') == 'Service':
                item['name'] = "خدمة نقل العفش بجدة"
            elif item.get('@type') == 'BreadcrumbList':
                # Ensure it points to correct names
                pass
            elif item.get('@type') == 'FAQPage':
                mainEntity = item.get('mainEntity', [])
                for q in mainEntity:
                    q['name'] = q['name'].replace('ما هي أفضل شركة نقل عفش بجدة؟', 'كيف أحجز شركة نقل عفش بجدة؟')
                    q['acceptedAnswer']['text'] = q['acceptedAnswer']['text'].replace('أفضل شركة نقل عفش بجدة', 'شركة متخصصة في نقل العفش بجدة')
                    q['acceptedAnswer']['text'] = q['acceptedAnswer']['text'].replace('أفضل شركة نقل اثاث بجدة', 'شركة متخصصة في نقل العفش بجدة')
                    q['acceptedAnswer']['text'] = q['acceptedAnswer']['text'].replace('خصومات فورية تصل إلى 25%', 'عروض أسعار مناسبة')
                    q['acceptedAnswer']['text'] = q['acceptedAnswer']['text'].replace('وضمان عدم تلف أي قطعة', 'مع الحرص التام على سلامة المنقولات')
        
        new_schema_str = json.dumps(schema, ensure_ascii=False, indent=6)
        content = content.replace(schema_match.group(0), f'<script type="application/ld+json">\n{new_schema_str}\n    </script>')
    except Exception as e:
        print("Error parsing schema: ", e)

# 6. Replace specific strings in content
# Hero paragraph
content = content.replace(
    'أهلاً بك في <a href="https://almontalaqmoving.com/"\n                        class="text-yellow-400 font-bold underline hover:text-yellow-300">شركة نقل عفش بجدة</a> (شركة\n                    المنطلق)، الخيار الأول والموثوق لكافة سكان مدينة جدة. نوفر أحدث دينا وسياريارات نقل الأثاث المجهزة،\n                    مع طاقم عمل متخصص من العمالة المدربة والنجارين المحترفين لضمان نقل عفش منزلك أو مكتبك بسلامة 100%\n                    وبدون أي خدش بأفضل الأسعار التنافسية.',
    'أهلاً بك في <a href="https://almontalaqmoving.com/"\n                        class="text-yellow-400 font-bold underline hover:text-yellow-300">شركة نقل عفش بجدة</a> (شركة المنطلق). نوفر خدمات نقل الأثاث للمنازل والفلل والمكاتب، مع الفك والتركيب والتغليف والتحميل والنقل والتسليم. نعتمد على سيارات نقل مجهزة وطاقم عمل مدرب لتقديم خدمة متكاملة داخل جدة وخارجها.'
)

content = content.replace('أفضل شركة نقل عفش بجدة', 'شركة نقل عفش بجدة')
content = content.replace('أرخص شركة نقل عفش بجدة', 'شركة نقل عفش بجدة')
content = content.replace('أفضل شركة نقل أثاث وفك وتغليف بجدة', 'نقل أثاث وفك وتركيب وتغليف')
content = content.replace('✨ أفضل شركة نقل عفش بجدة بالضمان والفك والتغليف', '✨ شركة نقل عفش بجدة بالفك والتركيب والتغليف')

# Remove claims
content = content.replace('ضمان 100%', 'عناية فائقة')
content = content.replace('حماية كاملة للعفش', 'نحرص على سلامة العفش')
content = content.replace('بسلامة 100%', 'بأمان')
content = content.replace('وبدون أي خدش', 'وبحرص شديد')
content = content.replace('عقد ضمان رسمي يغطي أي تلف أو كسر 100%', 'التعامل بحرص مع العفش والمنقولات')

# 7. Price Section
price_section_new = """<section id="prices" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 card-hover">
                    <h2 class="text-2xl md:text-3xl font-black mb-6 section-title text-gray-900">
                        العوامل التي تحدد تكلفة نقل العفش بجدة
                    </h2>

                    <p class="mb-6 leading-relaxed text-gray-700">
                        في <a href="https://almontalaqmoving.com/" class="text-blue-600 font-bold hover:underline">شركة نقل عفش بجدة</a> (المنطلق)، نقدم خدماتنا بأسعار مدروسة وتعتمد التكلفة النهائية على عدة عوامل رئيسية لضمان العدالة والشفافية:
                    </p>

                    <div class="overflow-x-auto mb-6">
                        <table class="min-w-full bg-white border border-gray-200 rounded-xl text-center">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th class="p-3 font-bold text-sm">العامل المؤثر</th>
                                    <th class="p-3 font-bold text-sm">التأثير على التكلفة</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 text-sm">
                                <tr class="hover:bg-blue-50/40 transition">
                                    <td class="p-3 font-bold text-gray-900">كمية وحجم الأثاث</td>
                                    <td class="p-3 text-gray-600">تحدد عدد السيارات المطلوبة وحجمها (دينا متوسطة أو شاحنة كبيرة).</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition bg-gray-50/50">
                                    <td class="p-3 font-bold text-gray-900">عدد الغرف</td>
                                    <td class="p-3 text-gray-600">كلما زاد عدد الغرف (غرف نوم، مجالس، مطابخ) زادت التكلفة.</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition">
                                    <td class="p-3 font-bold text-gray-900">المسافة</td>
                                    <td class="p-3 text-gray-600">المسافة بين المنزل القديم والجديد (داخل جدة أو خارجها).</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition bg-gray-50/50">
                                    <td class="p-3 font-bold text-gray-900">الأدوار والمصعد</td>
                                    <td class="p-3 text-gray-600">الطوابق العليا بدون مصعد أو ذات السلالم الضيقة تتطلب جهداً إضافياً.</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition">
                                    <td class="p-3 font-bold text-gray-900">خدمات الفك والتركيب</td>
                                    <td class="p-3 text-gray-600">تحتاج بعض القطع مثل المطابخ وأثاث إيكيا إلى فنيين ونجارين متخصصين.</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition bg-gray-50/50">
                                    <td class="p-3 font-bold text-gray-900">مستوى التغليف</td>
                                    <td class="p-3 text-gray-600">استخدام مواد التغليف المختلفة (كرتون، نيلون فقاعي، فوم) يزيد من الحماية.</td>
                                </tr>
                                <tr class="hover:bg-blue-50/40 transition">
                                    <td class="p-3 font-bold text-gray-900">استخدام الونش</td>
                                    <td class="p-3 text-gray-600">الحاجة إلى رافعة هيدروليكية لرفع أو تنزيل الأثاث الضخم.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex flex-wrap gap-4 mt-6">
                        <a href="tel:0563806459"
                            class="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition hover:bg-blue-700 shadow">
                            <i class="fas fa-calculator ml-1"></i> اطلب تسعيرة دقيقة
                        </a>
                        <a href="https://wa.me/966563806459" target="_blank" rel="noopener noreferrer"
                            class="bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition hover:bg-green-700 shadow">
                            <i class="fab fa-whatsapp ml-1"></i> تواصل عبر الواتساب لمعرفة التكلفة
                        </a>
                    </div>
                </section>"""
content = re.sub(
    r'<section id="prices".*?</section>',
    price_section_new,
    content,
    flags=re.DOTALL
)

# 8. Delete Reviews Section
content = re.sub(
    r'<!-- Section 15: آراء وتقييمات العملاء -->.*?<section id="reviews".*?</section>',
    '',
    content,
    flags=re.DOTALL
)

# Fix Sidebar links
content = re.sub(
    r'<a href="#reviews"[^>]*>.*?آراء وتقييمات العملاء.*?</a>',
    '',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<a href="#prices"[^>]*>.*?أسعار نقل العفش بجدة.*?</a>',
    '<a href="#prices"\n                            class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">عوامل تكلفة نقل العفش</a>',
    content,
    flags=re.DOTALL
)

# 9. Internal Linking to `furniture-moving-in-jeddah`
# Making sure any anchor pointing to that URL says "أفضل شركة نقل اثاث بجدة"
content = re.sub(
    r'<a href="https://almontalaqmoving.com/furniture-moving-in-jeddah/"[^>]*>.*?</a>',
    '<a href="https://almontalaqmoving.com/furniture-moving-in-jeddah/" class="text-blue-600 font-bold hover:underline">أفضل شركة نقل اثاث بجدة</a>',
    content
)

# 10. Update HTML FAQ Questions text
content = content.replace(
    'ما هي أفضل شركة نقل عفش بجدة؟',
    'كيف أحجز شركة نقل عفش بجدة؟'
)
content = content.replace(
    'تُعد <a href="https://almontalaqmoving.com/"\n                                    class="text-blue-600 font-bold hover:underline">شركة المنطلق لنقل العفش</a> أفضل\n                                شركة نقل عفش بجدة بفضل خبرتها الطويلة، واستخدامها أحدث دينا وسيارت النقل المغلقة، وتوفير\n                                طاقم نجارين وعمالة مدربة مع عقد ضمان كتابي شامل لسلامة كافة المحتويات.',
    'تُعد <a href="https://almontalaqmoving.com/"\n                                    class="text-blue-600 font-bold hover:underline">شركة المنطلق لنقل العفش</a> من الشركات المتخصصة في تقديم خدمات نقل الأثاث بجدة، حيث نستخدم سيارات نقل مجهزة ونوفر طاقم عمل مدرب لنقل محتوياتك بأمان.'
)

content = content.replace('أفضل النجارين والفنيين', 'فنيين ونجارين')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SEO update completed successfully!")
