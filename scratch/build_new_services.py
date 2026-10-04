import os
import re
import shutil
import glob

base_dir = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq"

def copy_and_update_page(source_rel_path, target_rel_path, new_title, new_meta, new_h1, new_main, faq_schema, new_sidebar, canonical_url, img_alt):
    source_path = os.path.join(base_dir, source_rel_path, "index.html")
    target_dir = os.path.join(base_dir, target_rel_path)
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        
    target_path = os.path.join(target_dir, "index.html")
    
    shutil.copy2(source_path, target_path)
    
    with open(target_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Update Title
    html = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', html, flags=re.DOTALL)
    
    # Update Meta Description
    html = re.sub(r'<meta name="description"\s+content=".*?">', f'<meta name="description"\n        content="{new_meta}">', html, flags=re.DOTALL)
    
    # Update Canonical
    html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{canonical_url}">', html, flags=re.DOTALL)
    html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{canonical_url}">', html, flags=re.DOTALL)
    
    # Update Schema IDs (WebPage, Service, Breadcrumb)
    html = re.sub(r'"@id": "https://almontalaqmoving.com/.*?#webpage"', f'"@id": "{canonical_url}#webpage"', html)
    html = re.sub(r'"url": "https://almontalaqmoving.com/.*?"', f'"url": "{canonical_url}"', html, count=1) # only first url which is in WebPage
    
    # Update Breadcrumb Schema item 3
    html = re.sub(r'{"@type": "ListItem",\s*"position": 3,\s*"name": ".*?",\s*"item": ".*?"}', 
                  f'{{"@type": "ListItem",\n              "position": 3,\n              "name": "{new_h1}",\n              "item": "{canonical_url}"}}', html, flags=re.DOTALL)
                  
    # Replace Hero Image Alt if there is one
    # Note: image remains the same since the prompt says "استخدم نفس التصميم الحالي للصفحات الخدمية" 
    # and if the images are present just use them. I will change the alt text for SEO.
    html = re.sub(r'alt=".*?" class="w-full h-auto object-cover max-h-\[500px\]"', f'alt="{img_alt}" class="w-full h-auto object-cover max-h-[500px]"', html)

    # Update H1
    h1_tag = f'''<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">
                    {new_h1}
                </h1>'''
    html = re.sub(r'<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">.*?</h1>', h1_tag, html, flags=re.DOTALL)
    
    # Update Main
    html = re.sub(r'<main class="lg:w-3/4 space-y-12">.*?</main>', new_main, html, flags=re.DOTALL)
    
    # Update Sidebar
    html = re.sub(r'<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-\[70vh\] overflow-y-auto pr-1">.*?</ul>', new_sidebar, html, flags=re.DOTALL)
    
    # Update FAQ Schema
    if faq_schema:
        html = re.sub(r'{\s*"@type":\s*"FAQPage",.*?\]\s*}', faq_schema, html, flags=re.DOTALL)
    else:
        # Remove FAQ schema if no FAQ
        html = re.sub(r',?\s*{\s*"@type":\s*"FAQPage",.*?\]\s*}', '', html, flags=re.DOTALL)
        
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Created {target_rel_path} successfully")

source_page = "furniture-packaging-in-jeddah"

# ==========================================
# PAGE 1: Trucks (Dina)
# ==========================================
p1_path = "moving-trucks-in-jeddah"
p1_title = "دينا نقل عفش بجدة | دينا ودباب لنقل الأثاث"
p1_meta = "خدمة دينا نقل عفش بجدة لنقل الأثاث والمنازل والمكاتب، مع إمكانية إضافة العمال والفك والتغليف حسب احتياج العميل."
p1_h1 = "دينا نقل عفش بجدة"
p1_can = "https://almontalaqmoving.com/moving-trucks-in-jeddah/"
p1_alt = "دينا نقل عفش بجدة"

p1_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            تعتبر خدمة <strong>دينا نقل عفش بجدة</strong> العمود الفقري لأي عملية انتقال ناجحة، سواء كنت تنتقل إلى منزل جديد أو تنقل مكتبك. نحن نوفر أسطولاً من سيارات النقل والدبابات المجهزة بأحجام مختلفة لتناسب كافة احتياجاتكم في النقل داخل وخارج أحياء جدة.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            متى تحتاج إلى دينا نقل عفش؟
        </h2>
        <ul class="space-y-3 mt-4 text-gray-700">
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> عندما يكون لديك أثاث ضخم يصعب نقله بسيارتك الخاصة.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> عند شرائك لأثاث جديد أو أجهزة كهربائية من المعارض وتحتاج لتوصيلها للمنزل.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> في حالات الانتقال الجزئي بين الشقق والمنازل.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> للشركات التي تبحث عن شاحنات نقل بضائع وأثاث مكتبي.</li>
        </ul>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            أنواع سيارات نقل العفش المتاحة
        </h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">دينا نقل عفش</h3>
        <p class="mb-4 text-gray-700">تتوفر دينا نقل العفش بأحجام متعددة (3 طن للشقق، 5 طن للمتوسط، و7 طن للفلل)، وهي سيارات مغلقة ومبطنة من الداخل للحماية من الطقس والأتربة.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">دباب نقل عفش</h3>
        <p class="mb-4 text-gray-700">دباب النقل مثالي للمشاوير السريعة ونقل القطع الصغيرة أو الأجهزة الكهربائية القليلة داخل أحياء جدة.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">سيارات نقل الأثاث</h3>
        <p class="mb-4 text-gray-700">شاحنات مخصصة للنقل بين المدن مع أنظمة تثبيت داخلية تضمن عدم تحرك القطع أثناء السفر.</p>
    </section>

    <!-- H2 -->
    <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            ما الذي يمكن نقله باستخدام الدينا؟
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">نقل عفش المنازل</h3>
                <p class="text-gray-600 text-sm">نقل كامل محتويات المنزل من غرف وأجهزة ومجالس.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">نقل عفش الشقق</h3>
                <p class="text-gray-600 text-sm">مناسب للشقق باستخدام دينا حجم 3 أو 5 طن.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">نقل عفش الفلل</h3>
                <p class="text-gray-600 text-sm">استخدام أسطول من سيارات الدينا الكبيرة 7 طن.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">نقل عفش المكاتب</h3>
                <p class="text-gray-600 text-sm">نقل آمن للمكاتب والملفات والأجهزة.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <h3 class="font-bold text-lg text-blue-800 mb-2">نقل القطع الكبيرة</h3>
                <p class="text-gray-600 text-sm">الثلاجات الكبيرة، شاشات العرض، وخزائن الملابس الضخمة.</p>
            </div>
        </div>
    </section>

    <!-- H2 -->
    <section id="section5" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            هل تشمل خدمة الدينا تحميل وتفريغ العفش؟
        </h2>
        <p class="mb-4 text-gray-700">بشكل أساسي يمكنك طلب السيارة (دينا أو دباب) فقط إذا كان لديك عمالك الخاصون. ومع ذلك، نوفر عمالة مدربة للتحميل والتفريغ بحرص يمكن إضافتهم للخدمة حسب رغبتك لضمان سلاسة العملية.</p>
    </section>

    <!-- H2 -->
    <section id="section6" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            هل يمكن إضافة الفك والتركيب والتغليف؟
        </h2>
        <p class="mb-4 text-gray-700">بالطبع، خدماتنا مرنة. يمكنك الاستعانة بخدمات <a href="/furniture-dismantling-and-assembly-in-jeddah/" class="text-blue-600 underline">فك وتركيب العفش بجدة</a> أو <a href="/furniture-packaging-in-jeddah/" class="text-blue-600 underline">تغليف العفش بجدة</a> إلى جانب الدينا للحصول على باقة متكاملة تناسب احتياجك الفعلي.</p>
    </section>

    <!-- H2 -->
    <section id="section7" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            أسعار دينا نقل العفش بجدة والعوامل المؤثرة
        </h2>
        <p class="mb-4 text-gray-700">يختلف سعر إيجار الدينا بناءً على:</p>
        <ul class="space-y-3 mt-4 text-gray-700">
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>حجم السيارة:</strong> الدباب أقل تكلفة من الدينا الكبيرة.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>المسافة:</strong> النقل داخل نفس الحي يختلف عن النقل بين أحياء بعيدة أو لمدينة أخرى.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>العمالة:</strong> إضافة عدد عمال للتحميل والتنزيل.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الونش:</strong> استخدام <a href="/hydraulic-winch-moving-jeddah/" class="text-blue-600 underline">ونش رفع العفش بجدة</a> إذا كان السكن في طابق علوي.</li>
        </ul>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            الأسئلة الشائعة
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يمكن طلب دينا فقط بدون عمال؟</h3>
                <p class="text-gray-700">نعم، يمكنك استئجار الدينا مع السائق فقط إذا كنت ترغب في الاعتماد على نفسك في التحميل.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">ما الفرق بين الدينا والدباب؟</h3>
                <p class="text-gray-700">الدباب أصغر حجماً ويستخدم للمشاوير السريعة للأغراض القليلة، بينما الدينا شاحنة مغلقة تستوعب غرف وشقق كاملة.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يتم نقل العفش داخل جميع أحياء جدة؟</h3>
                <p class="text-gray-700">نعم، نخدم كافة الأحياء في جدة من الشمال إلى الجنوب.</p>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-xl p-10 text-center text-white mt-12 mb-12">
        <h2 class="text-3xl font-black mb-4">اطلب دينا نقل عفش بجدة</h2>
        <p class="text-lg mb-8 opacity-90">نحن مستعدون لتلبية طلبك فوراً وتوفير الدينا المناسبة لحجم أثاثك بأفضل الأسعار.</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="tel:0563806459" class="bg-white text-blue-800 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fas fa-phone-alt"></i> اتصل الآن
            </a>
            <a href="https://wa.me/966563806459" target="_blank" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
            </a>
        </div>
    </section>

</main>'''
p1_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">خدمة دينا نقل عفش بجدة</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">متى تحتاج لـ دينا؟</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أنواع السيارات</a></li>
    <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">ما الذي يمكن نقله؟</a></li>
    <li><a href="#section5" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">تحميل وتفريغ العفش</a></li>
    <li><a href="#section7" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">العوامل المؤثرة على السعر</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الأسئلة الشائعة</a></li>
</ul>'''
p1_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/moving-trucks-in-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل يمكن طلب دينا فقط بدون عمال؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، يمكنك استئجار الدينا مع السائق فقط إذا كنت ترغب في الاعتماد على نفسك في التحميل."
      }
    },
    {
      "@type": "Question",
      "name": "ما الفرق بين الدينا والدباب؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الدباب أصغر حجماً ويستخدم للمشاوير السريعة للأغراض القليلة، بينما الدينا شاحنة مغلقة تستوعب غرف وشقق كاملة."
      }
    },
    {
      "@type": "Question",
      "name": "هل يتم نقل العفش داخل جميع أحياء جدة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، نخدم كافة الأحياء في جدة من الشمال إلى الجنوب."
      }
    }
  ]
}'''

copy_and_update_page(source_page, p1_path, p1_title, p1_meta, p1_h1, p1_main, p1_schema, p1_sidebar, p1_can, p1_alt)

# ==========================================
# PAGE 2: Bride Luggage
# ==========================================
p2_path = "bride-luggage-moving-jeddah"
p2_title = "نقل دبش العروسة بجدة | نقل وتغليف دبش العروس"
p2_meta = "خدمة نقل دبش العروسة بجدة. نوفر سيارات مجهزة وعمالة متخصصة لفرز، ترتيب، تغليف، وتحميل الدبش بأعلى مستويات الحماية والسرية."
p2_h1 = "نقل وتغليف دبش العروسة بجدة"
p2_can = "https://almontalaqmoving.com/bride-luggage-moving-jeddah/"
p2_alt = "نقل دبش العروسة بجدة"

p2_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            تعتبر مرحلة تجهيز ونقل أغراض الزفاف من اللحظات المميزة لأي عروس، ولهذا نوفر خدمة <strong>نقل دبش العروسة بجدة</strong> لتكون رحلتك إلى منزلك الجديد خالية من القلق. نحن نهتم بكل التفاصيل من فرز وترتيب، وتغليف آمن للملابس، الأجهزة، والأغراض الشخصية، ليتم نقلها بكل عناية وحرص.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            ما الذي تشملـه خدمة نقل دبش العروسة؟
        </h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">فرز وترتيب الأغراض</h3>
        <p class="mb-4 text-gray-700">مساعدة في فرز الملابس والمقتنيات الشخصية وتوزيعها في الحقائب أو الصناديق المناسبة لتسهيل إدارتها.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">تغليف القطع</h3>
        <p class="mb-4 text-gray-700">استخدام <a href="/furniture-packaging-in-jeddah/" class="text-blue-600 underline">مواد تغليف عالية الجودة</a> لمنع وصول الأتربة إلى الملابس والمفروشات الجديدة.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">تحميل الدبش</h3>
        <p class="mb-4 text-gray-700">يقوم فريقنا بنقل الحقائب والصناديق بهدوء ونظام من داخل المنزل إلى السيارات المجهزة.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">نقل الدبش وتفريغه</h3>
        <p class="mb-4 text-gray-700">التوصيل بسيارات نظيفة ومغلقة، وتفريغ الحقائب بعناية في منزل الزوجية ليتم ترتيبها بسهولة.</p>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            تغليف دبش العروسة قبل النقل
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">تغليف القطع الحساسة والمرايا</h3>
                <p class="text-gray-600 text-sm">يتم حماية الزجاج والعطور والمرايا بصناديق مبطنة وطبقات من الفوم الرغوي.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">تغليف الملابس والمفروشات</h3>
                <p class="text-gray-600 text-sm">استخدام رول بلاستيكي وكراتين للحفاظ على نظافة المفارش والفساتين.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <h3 class="font-bold text-lg text-blue-800 mb-2">تغليف الأجهزة</h3>
                <p class="text-gray-600 text-sm">استخدام التغليف المناسب لأجهزة العناية الشخصية وأجهزة المطبخ الصغيرة المرفقة بالدبش.</p>
            </div>
        </div>
    </section>

    <!-- H2 -->
    <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            النقل بين منازل جدة وخارجها
        </h2>
        <p class="mb-4 text-gray-700">نغطي كافة طلبات النقل داخل أحياء جدة، كما نوفر خدمة نقل دبش العروسة بين المدن بمركبات آمنة ومخصصة للسفر الطويل.</p>
    </section>

    <!-- H2 -->
    <section id="section5" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            هل تشمل الخدمة الفك والتركيب؟
        </h2>
        <p class="mb-4 text-gray-700">إذا كان الدبش يشمل أثاثاً أو غرفاً تتطلب فكاً وتجميعاً، فنحن نمتلك خدمة <a href="/furniture-dismantling-and-assembly-in-jeddah/" class="text-blue-600 underline">فك وتركيب العفش بجدة</a> لتقديم المساعدة الشاملة.</p>
    </section>

    <!-- H2 -->
    <section id="section6" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            العوامل التي تحدد التكلفة
        </h2>
        <ul class="space-y-3 mt-4 text-gray-700">
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الكمية:</strong> عدد الحقائب والكراتين.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>مواد التغليف:</strong> كمية الفوم والصناديق التي تم استهلاكها.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>حجم السيارة:</strong> سواء تم نقلها بواسطة <a href="/moving-trucks-in-jeddah/" class="text-blue-600 underline">دينا أو دباب</a>.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>المسافة والعمالة المطلوبة.</strong></li>
        </ul>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل تشمل الخدمة تغليف دبش العروسة؟</h3>
                <p class="text-gray-700">نعم، يمكنك طلب خدمة التغليف المخصصة لحماية جميع الأغراض بأفضل الخامات.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يتم نقل الأجهزة ضمن الدبش؟</h3>
                <p class="text-gray-700">نعم، الأجهزة الصغيرة والكبيرة يمكن نقلها بأمان مع تغليفها لمنع الخدوش.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">كيف يتم حساب السعر؟</h3>
                <p class="text-gray-700">يتم تحديد السعر بناءً على كمية الأغراض وحجم سيارة النقل المطلوبة ومدى الحاجة لمواد تغليف وعمال تحميل.</p>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-xl p-10 text-center text-white mt-12 mb-12">
        <h2 class="text-3xl font-black mb-4">اطلب خدمة نقل دبش العروسة بجدة</h2>
        <p class="text-lg mb-8 opacity-90">دعي القلق لنا وتواصلي معنا الآن لنرتب لكِ عملية انتقال مريحة وآمنة لأغراضك.</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="tel:0563806459" class="bg-white text-blue-800 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fas fa-phone-alt"></i> اطلب عرض سعر
            </a>
            <a href="https://wa.me/966563806459" target="_blank" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
            </a>
        </div>
    </section>

</main>'''
p2_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">خدمة نقل الدبش</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">ماذا تشمل الخدمة؟</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">تغليف الدبش</a></li>
    <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">النقل داخل جدة</a></li>
    <li><a href="#section6" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">عوامل التكلفة</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الأسئلة الشائعة</a></li>
</ul>'''
p2_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/bride-luggage-moving-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل تشمل الخدمة تغليف دبش العروسة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، يمكنك طلب خدمة التغليف المخصصة لحماية جميع الأغراض بأفضل الخامات."
      }
    },
    {
      "@type": "Question",
      "name": "هل يتم نقل الأجهزة ضمن الدبش؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، الأجهزة الصغيرة والكبيرة يمكن نقلها بأمان مع تغليفها لمنع الخدوش."
      }
    },
    {
      "@type": "Question",
      "name": "كيف يتم حساب السعر؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يتم تحديد السعر بناءً على كمية الأغراض وحجم سيارة النقل المطلوبة ومدى الحاجة لمواد تغليف وعمال تحميل."
      }
    }
  ]
}'''

copy_and_update_page(source_page, p2_path, p2_title, p2_meta, p2_h1, p2_main, p2_schema, p2_sidebar, p2_can, p2_alt)


# ==========================================
# PAGE 3: Cheapest Company
# ==========================================
p3_path = "cheapest-furniture-moving-jeddah"
p3_title = "أرخص شركة نقل عفش بجدة | أسعار نقل العفش وعوامل التكلفة"
p3_meta = "ابحث عن أرخص شركة نقل عفش بجدة بجودة عالية. تعرف على عوامل التسعير مثل الحجم، المسافة، والتغليف لتحصل على العرض الأنسب لاحتياجاتك."
p3_h1 = "أرخص شركة نقل عفش بجدة"
p3_can = "https://almontalaqmoving.com/cheapest-furniture-moving-jeddah/"
p3_alt = "أرخص شركة نقل عفش بجدة"

p3_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            عندما يفكر الكثيرون في الانتقال، يكون سؤالهم الأول هو العثور على <strong>أرخص شركة نقل عفش بجدة</strong> لتوفير المال. لكن الحصول على سعر منخفض لا يعني بالضرورة التنازل عن جودة الخدمة والأمان. في هذا الدليل، نوضح لك ما الذي يحدد أسعار النقل وكيف تختار العرض المالي الأنسب لك.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            ما الذي يحدد سعر نقل العفش بجدة؟
        </h2>
        <div class="space-y-4 text-gray-700">
            <h3 class="text-xl font-bold mt-4 text-blue-700">حجم العفش وعدد الغرف</h3>
            <p>كمية الأثاث المنقول تحدد حجم الشاحنة وعدد العمال المطلوبين، وبالتالي شقة مكونة من 3 غرف ستكلف أكثر من نقل غرفة واحدة.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700">المسافة</h3>
            <p>نقل الأثاث بين أحياء جدة المتقاربة يختلف تسعيره عن النقل إلى أحياء الأطراف البعيدة أو النقل بين المدن.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700">عدد الطوابق ووجود المصعد</h3>
            <p>الإنزال والرفع اليدوي عبر السلالم يتطلب وقتاً وجهداً مضاعفاً من العمال، لذلك توفر المصعد يسهم في خفض التكلفة الإجمالية.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700">نوع السيارة</h3>
            <p>سعر استئجار الدينا يختلف عن استئجار دباب صغير مخصص لنقل القطع المحدودة.</p>
        </div>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            خدمات إضافية تؤثر على السعر
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="/furniture-dismantling-and-assembly-in-jeddah/" class="text-blue-600 underline">الفك والتركيب</a></h3>
                <p class="text-gray-600 text-sm">استقدام نجار لفك الدواليب والمطابخ يضيف إلى التكلفة الكلية.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="/furniture-packaging-in-jeddah/" class="text-blue-600 underline">التغليف</a></h3>
                <p class="text-gray-600 text-sm">توفير كراتين ومواد تغليف الفقاعي والفوم لحماية الأثاث.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="/hydraulic-winch-moving-jeddah/" class="text-blue-600 underline">الونش</a></h3>
                <p class="text-gray-600 text-sm">الاستعانة بونش رفع الأثاث للقطع الثقيلة عبر الشرفات.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">الدينا</h3>
                <p class="text-gray-600 text-sm">استخدام <a href="/moving-trucks-in-jeddah/" class="text-blue-600 underline">دينا نقل عفش بجدة</a> بأحجام مختلفة.</p>
            </div>
        </div>
    </section>

    <!-- H2 -->
    <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            كيف تقارن بين عروض شركات نقل العفش؟
        </h2>
        <p class="mb-4 text-gray-700">لا تعتمد على الرقم النهائي فقط. تأكد من أن العرض يشمل جميع الخدمات التي اتفق عليها، كالتغليف، الفك، التحميل، والنقل. اطلب معاينة قبل إعطاء السعر النهائي لضمان عدم وجود تكاليف خفية يوم التنفيذ.</p>
    </section>

    <!-- H2 -->
    <section id="section5" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            هل السعر الأرخص دائماً هو الأفضل؟
        </h2>
        <p class="mb-4 text-gray-700">قد يعرض البعض أسعاراً منخفضة جداً، ولكن دون ضمان حماية أو وجود عمالة محترفة، مما قد يؤدي لكسر أو تلف الأثاث وتكبد خسائر فادحة. التوازن بين السعر المعقول والخدمة الاحترافية هو الخيار الأذكى.</p>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">ما الذي يحدد سعر نقل العفش؟</h3>
                <p class="text-gray-700">الكمية، المسافة، مدى الحاجة للتغليف، وحجم السيارة والعمالة المطلوبة.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل السعر الأرخص دائماً الأفضل؟</h3>
                <p class="text-gray-700">لا، يجب التأكد من شمولية السعر لخدمات مهمة مثل الفك والتغليف واحترافية العمال لضمان عدم تلف المنقولات.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل الفك والتركيب يحسب بشكل منفصل؟</h3>
                <p class="text-gray-700">نعم، يعتبر خدمة إضافية تُحسب بناءً على عدد وحجم القطع مثل الدواليب والمطابخ، ويمكن دمجها في السعر النهائي.</p>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-xl p-10 text-center text-white mt-12 mb-12">
        <h2 class="text-3xl font-black mb-4">اطلب عرض سعر لنقل العفش بجدة</h2>
        <p class="text-lg mb-8 opacity-90">تواصل معنا لمعرفة السعر الفعلي لنقل عفشك. يمكننا تقديم عرض سعر مخصص يتناسب تماماً مع متطلباتك وميزانيتك.</p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="tel:0563806459" class="bg-white text-blue-800 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fas fa-phone-alt"></i> اطلب عرض سعر
            </a>
            <a href="https://wa.me/966563806459" target="_blank" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
            </a>
        </div>
    </section>

</main>'''
p3_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">البحث عن السعر</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">ما يحدد التكلفة؟</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">خدمات تؤثر على السعر</a></li>
    <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقارنة العروض</a></li>
    <li><a href="#section5" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">السعر الأرخص والأفضل</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الأسئلة الشائعة</a></li>
</ul>'''
p3_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/cheapest-furniture-moving-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما الذي يحدد سعر نقل العفش؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الكمية، المسافة، مدى الحاجة للتغليف، وحجم السيارة والعمالة المطلوبة."
      }
    },
    {
      "@type": "Question",
      "name": "هل السعر الأرخص دائماً الأفضل؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "لا، يجب التأكد من شمولية السعر لخدمات مهمة مثل الفك والتغليف واحترافية العمال لضمان عدم تلف المنقولات."
      }
    },
    {
      "@type": "Question",
      "name": "هل الفك والتركيب يحسب بشكل منفصل؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، يعتبر خدمة إضافية تُحسب بناءً على عدد وحجم القطع مثل الدواليب والمطابخ، ويمكن دمجها في السعر النهائي."
      }
    }
  ]
}'''

copy_and_update_page(source_page, p3_path, p3_title, p3_meta, p3_h1, p3_main, p3_schema, p3_sidebar, p3_can, p3_alt)
