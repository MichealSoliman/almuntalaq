import os
import re
import shutil
import glob

base_dir = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq"

def update_page(rel_path, new_title, new_meta, new_h1, new_main, faq_schema, new_sidebar):
    filepath = os.path.join(base_dir, rel_path, "index.html")
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Update Title
    html = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', html, flags=re.DOTALL)
    
    # Update Meta Description
    html = re.sub(r'<meta name="description".*?>', f'<meta name="description"\n        content="{new_meta}">', html, flags=re.DOTALL)
    
    # Update H1
    h1_tag = f'''<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">
                    {new_h1}
                </h1>'''
    html = re.sub(r'<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">.*?</h1>', h1_tag, html, flags=re.DOTALL)
    
    # Update Main
    html = re.sub(r'<main class="lg:w-3/4 space-y-12">.*?</main>', new_main, html, flags=re.DOTALL)
    
    # Update Sidebar
    html = re.sub(r'<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-\[70vh\] overflow-y-auto pr-1">.*?</ul>', new_sidebar, html, flags=re.DOTALL)
    
    # Update FAQ Schema (assuming there's an existing FAQPage schema)
    if faq_schema:
        html = re.sub(r'{\s*"@type":\s*"FAQPage",.*?\]\s*}', faq_schema, html, flags=re.DOTALL)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {rel_path} successfully")

# ==========================================
# PAGE 1: Packaging
# ==========================================
p1_path = "furniture-packaging-in-jeddah"
p1_title = "تغليف العفش بجدة | خدمة تغليف وحماية العفش قبل النقل"
p1_meta = "تغليف العفش بجدة باستخدام أفضل مواد التغليف لحماية الأثاث من الخدوش والكسور. تغليف الزجاج، غرف النوم، والأجهزة باحترافية."
p1_h1 = "تغليف العفش بجدة"
p1_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            تعتبر خدمة <strong>تغليف العفش بجدة</strong> من أهم الخطوات التي تسبق عملية الانتقال. فبدون التغليف الصحيح، تكون المنقولات عرضة للخدوش، الكسور، وتراكم الغبار. نحن نقدم حلولاً متكاملة لتغليف كافة أنواع الأثاث باستخدام أفضل المواد لضمان وصول مقتنياتك بسلام.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            لماذا يحتاج العميل إلى تغليف العفش؟
        </h2>
        <ul class="space-y-3 mt-4 text-gray-700">
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الحماية من الصدمات:</strong> أثناء عملية التحميل والنقل في السيارات.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الوقاية من الأوساخ:</strong> منع وصول الغبار والأتربة للأقمشة والكنب.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>تسهيل التحميل:</strong> القطع المغلفة يسهل الإمساك بها وترتيبها داخل الدينا.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الاستعداد للتخزين:</strong> إذا كنت تنوي تخزين الأثاث لفترة، فالتغليف ضروري لمنع الرطوبة والحشرات.</li>
        </ul>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            أنواع مواد التغليف المستخدمة بجدة
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">البلاستيك الفقاعي (Bubble Wrap)</h3>
                <p class="text-gray-600 text-sm">يستخدم لحماية القطع القابلة للكسر كالزجاجيات، التحف، والشاشات من الصدمات المباشرة.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">الرول البلاستيكي (Stretch Film)</h3>
                <p class="text-gray-600 text-sm">لإحكام غلق الأدراج وتغليف الكنب والمجالس لمنع تسرب الغبار والرطوبة.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">الكرتون المقوى</h3>
                <p class="text-gray-600 text-sm">صناديق بمقاسات مختلفة لتعبئة أدوات المطبخ، الكتب، والملابس، مع استخدام فواصل كرتونية للأطباق.</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 class="font-bold text-lg text-blue-800 mb-2">الفوم والإسفنج</h3>
                <p class="text-gray-600 text-sm">يوضع على حواف وزوايا الأثاث الخشبي والأجهزة لمنع احتكاكها أثناء النقل.</p>
            </div>
        </div>
    </section>

    <!-- H2 -->
    <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            تغليف مختلف أنواع العفش
        </h2>
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">تغليف غرف النوم والدواليب</h3>
        <p class="mb-4 text-gray-700">بعد الفك، يتم تغليف ألواح الخشب بالسترتش، بينما تغلف المرايا والزجاج بالبلاستيك الفقاعي والكرتون المضلع لتأمينها.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">تغليف المجالس والكنب</h3>
        <p class="mb-4 text-gray-700">نستخدم الرول البلاستيكي الشفاف بلفات متعددة حول الكنب لمنع تمزق القماش أو تعرضه للبقع العرضية.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">تغليف الأجهزة الحساسة</h3>
        <p class="mb-4 text-gray-700">الأجهزة مثل الشاشات الذكية يتم تغطية شاشتها بالفوم الرقيق ثم الفقاعي، وتوضع في كراتين مناسبة لحجمها إن أمكن.</p>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة عن تغليف العفش بجدة
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">ما هي خدمة تغليف العفش بجدة؟</h3>
                <p class="text-gray-700">هي خدمة متخصصة لتجهيز وتغطية الأثاث بمواد حماية مخصصة (فقاعي، كرتون، سترتش) لمنع الأضرار قبل النقل.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يمكن طلب التغليف فقط بدون نقل؟</h3>
                <p class="text-gray-700">نعم، يمكنك طلب خدمة تغليف العفش فقط إذا كنت تخطط لنقله بنفسك أو لتخزينه في نفس الموقع.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">ما المواد المستخدمة في تغليف الزجاج؟</h3>
                <p class="text-gray-700">يتم استخدام البلاستيك الفقاعي الكثيف، طبقات من الفوم العازل، وصناديق كرتونية مبطنة.</p>
            </div>
        </div>
    </section>

    <!-- Link to Comprehensive Package -->
    <section class="bg-blue-50 rounded-2xl shadow-sm p-8 border border-blue-100 mt-8 text-center">
        <h3 class="text-xl font-bold text-blue-800 mb-4">هل تبحث عن خدمة النقل المتكاملة؟</h3>
        <p class="text-gray-700 mb-6">إذا كنت تحتاج إلى النقل والفك والتركيب بالإضافة للتغليف، ننصحك بتصفح باقتنا الشاملة التي توفر عليك الجهد والوقت.</p>
        <a href="/furniture-moving-with-packing/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition">
            تعرف على باقة نقل عفش شامل التغليف
        </a>
    </section>

</main>'''
p1_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقدمة التغليف</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">لماذا التغليف ضروري؟</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أنواع مواد التغليف</a></li>
    <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">تغليف مختلف القطع</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أسئلة شائعة</a></li>
</ul>'''
p1_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/furniture-packaging-in-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما هي خدمة تغليف العفش بجدة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "هي خدمة متخصصة لتجهيز وتغطية الأثاث بمواد حماية مخصصة (فقاعي، كرتون، سترتش) لمنع الأضرار قبل النقل."
      }
    },
    {
      "@type": "Question",
      "name": "هل يمكن طلب التغليف فقط بدون نقل؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، يمكنك طلب خدمة تغليف العفش فقط إذا كنت تخطط لنقله بنفسك أو لتخزينه في نفس الموقع."
      }
    },
    {
      "@type": "Question",
      "name": "ما المواد المستخدمة في تغليف الزجاج؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يتم استخدام البلاستيك الفقاعي الكثيف، طبقات من الفوم العازل، وصناديق كرتونية مبطنة."
      }
    }
  ]
}'''

update_page(p1_path, p1_title, p1_meta, p1_h1, p1_main, p1_schema, p1_sidebar)


# ==========================================
# PAGE 2: Comprehensive Package
# ==========================================
p2_path = "furniture-moving-with-packing"
p2_title = "نقل عفش شامل التغليف بجدة | باقة نقل متكاملة"
p2_meta = "باقة نقل عفش شامل التغليف بجدة. نقدم خدمة متكاملة تشمل الفك، التغليف، التحميل، النقل، وإعادة التركيب لضمان راحتك التامة."
p2_h1 = "نقل عفش شامل التغليف بجدة"
p2_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            هل تبحث عن راحة البال التامة عند انتقالك لمنزل جديد؟ باقة <strong>نقل عفش شامل التغليف بجدة</strong> هي الخيار الأمثل لك. نحن نوفر حلاً متكاملاً من الباب إلى الباب، حيث يتولى فريقنا كل التفاصيل بدءاً من الفك، مروراً بالتغليف الاحترافي والنقل، وصولاً إلى إعادة التركيب في الموقع الجديد.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            ما الخدمات التي تشملها باقة نقل العفش الشاملة؟
        </h2>
        <div class="space-y-4 text-gray-700">
            <h3 class="text-xl font-bold mt-4 text-blue-700"><a href="/furniture-dismantling-and-assembly-in-jeddah/" class="underline text-blue-600">فك العفش</a></h3>
            <p>يقوم نجارون متخصصون بتفكيك غرف النوم، المطابخ، والستائر بعناية تامة لتسهيل نقلها.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700"><a href="/furniture-packaging-in-jeddah/" class="underline text-blue-600">تغليف العفش بجدة</a></h3>
            <p>تغليف جميع القطع بمواد ذات جودة عالية (فقاعي، سترتش، كرتون) لحمايتها الكاملة.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700">تحميل العفش</h3>
            <p>عمالة مدربة على حمل القطع الثقيلة وتنزيلها عبر السلالم أو المصاعد أو باستخدام الأوناش بحذر.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700"><a href="/furniture-moving-in-jeddah/" class="underline text-blue-600">نقل العفش</a></h3>
            <p>نقل المقتنيات داخل دينا أو شاحنة مبطنة ومجهزة خصيصاً لامتصاص الصدمات أثناء السير.</p>
            
            <h3 class="text-xl font-bold mt-4 text-blue-700">تفريغ وإعادة تركيب العفش</h3>
            <p>توزيع الكراتين في الغرف المخصصة لها، ومن ثم إعادة تركيب غرف النوم والأثاث ليعود كما كان.</p>
        </div>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            متى تحتاج إلى نقل عفش شامل التغليف؟
        </h2>
        <p class="mb-4 text-gray-700">تحتاج لهذه الباقة إذا كنت لا تملك الوقت أو الجهد للقيام بعملية الفرز والتغليف بنفسك، أو إذا كان منزلك يحتوي على قطع ثمينة وأجهزة حساسة تتطلب عناية فائقة واحترافية لا تتوفر إلا لدى الفرق المتخصصة.</p>
    </section>

    <!-- H2 -->
    <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            الفرق بين خدمة التغليف فقط والنقل الشامل
        </h2>
        <table class="w-full text-right border-collapse border border-gray-200 mt-4 text-sm md:text-base">
            <thead>
                <tr class="bg-blue-50 text-blue-900">
                    <th class="border border-gray-200 p-3">وجه المقارنة</th>
                    <th class="border border-gray-200 p-3">خدمة التغليف فقط</th>
                    <th class="border border-gray-200 p-3">باقة النقل الشاملة</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-gray-200 p-3 font-bold">نطاق العمل</td>
                    <td class="border border-gray-200 p-3">توفير المواد وتغليف الأثاث بالمكان الحالي.</td>
                    <td class="border border-gray-200 p-3">الفك، التغليف، التحميل، النقل، والتركيب.</td>
                </tr>
                <tr class="bg-gray-50">
                    <td class="border border-gray-200 p-3 font-bold">الراحة وتوفير الجهد</td>
                    <td class="border border-gray-200 p-3">تحتاج لتدبير النقل والعمالة بنفسك لاحقاً.</td>
                    <td class="border border-gray-200 p-3">راحة تامة بنسبة 100%، استلم منزلك الجديد جاهزاً.</td>
                </tr>
            </tbody>
        </table>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة عن النقل الشامل
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">ما المقصود بنقل عفش شامل التغليف؟</h3>
                <p class="text-gray-700">هي باقة متكاملة تغطي كافة مراحل نقل الأثاث من نقطة البداية إلى نقطة النهاية بما يشمل توفير العمالة والمواد والسيارات.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل تشمل الباقة الفك والتركيب؟</h3>
                <p class="text-gray-700">نعم، تشمل توفير نجارين لفك وتركيب كافة أنواع الأثاث.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">كيف يتم تحديد السعر؟</h3>
                <p class="text-gray-700">يحدد السعر بناءً على حجم العفش، كمية مواد التغليف المستهلكة، ومسافة النقل بين الوجهتين.</p>
            </div>
        </div>
    </section>
</main>'''
p2_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقدمة</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">ما الخدمات التي تشملها الباقة؟</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">متى تحتاج لهذه الباقة؟</a></li>
    <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الفرق بين التغليف والنقل الشامل</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أسئلة شائعة</a></li>
</ul>'''
p2_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/furniture-moving-with-packing/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما المقصود بنقل عفش شامل التغليف؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "هي باقة متكاملة تغطي كافة مراحل نقل الأثاث من نقطة البداية إلى نقطة النهاية بما يشمل توفير العمالة والمواد والسيارات."
      }
    },
    {
      "@type": "Question",
      "name": "هل تشمل الباقة الفك والتركيب؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، تشمل توفير نجارين لفك وتركيب كافة أنواع الأثاث."
      }
    },
    {
      "@type": "Question",
      "name": "كيف يتم تحديد السعر؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يحدد السعر بناءً على حجم العفش، كمية مواد التغليف المستهلكة، ومسافة النقل بين الوجهتين."
      }
    }
  ]
}'''

update_page(p2_path, p2_title, p2_meta, p2_h1, p2_main, p2_schema, p2_sidebar)


# ==========================================
# PAGE 3: Dismantling & Assembly
# ==========================================
p3_path = "furniture-dismantling-and-assembly-in-jeddah"
p3_title = "فك وتركيب العفش بجدة | نجارين محترفين لغرف النوم والمطابخ"
p3_meta = "خدمة فك وتركيب العفش بجدة بأيدي نجارين محترفين. فك وتركيب غرف النوم، المطابخ، دواليب ايكيا، والأثاث المكتبي بأمان وسرعة."
p3_h1 = "فك وتركيب العفش بجدة"
p3_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            تُعد خدمة <strong>فك وتركيب العفش بجدة</strong> من المهام الحساسة التي تتطلب مهارة وخبرة عالية. فعملية تفكيك غرف النوم الكبيرة والمطابخ المعقدة بدون إلحاق ضرر بالخشب والمفاصل تحتاج إلى نجارين محترفين يملكون الأدوات الحديثة المناسبة. نحن نقدم لك الحل الشامل والمضمون لفك وإعادة تركيب كافة أثاثك.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            خدمات فك وتركيب الأثاث التي نقدمها
        </h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">فك وتركيب غرف النوم</h3>
        <p class="mb-4 text-gray-700">التعامل مع غرف النوم الكلاسيكية والحديثة والمحلية والمستوردة. يتم فك الأسرة، الدواليب، والتسريحات بعناية وترقيم القطع لضمان إعادة التركيب الدقيق.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">فك وتركيب دواليب وأثاث ايكيا</h3>
        <p class="mb-4 text-gray-700">أثاث ايكيا يتطلب طريقة فك خاصة بسبب تركيبته المعقدة واعتماده على المسامير المخفية. يمتلك فنيونا الكتالوجات والخبرة للتعامل معه.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">فك وتركيب المطابخ</h3>
        <p class="mb-4 text-gray-700">فك المطابخ الخشبية والألمنيوم، التعامل مع رخام المطبخ، وتجهيزه للنقل ليتم إعادة تصميمه وتركيبه في مساحات المنزل الجديد.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">الأثاث المكتبي</h3>
        <p class="mb-4 text-gray-700">فك القواطع، مكاتب الموظفين، وطاولات الاجتماعات الكبيرة للشركات والمؤسسات.</p>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            أهمية الاستعانة بنجارين محترفين
        </h2>
        <p class="mb-4 text-gray-700">محاولة فك الأثاث بطريقة غير احترافية قد تؤدي إلى كسر المفاصل، ضياع المسامير والصواميل، أو خدش قشرة الخشب الخارجية. النجار المحترف يوفر الوقت، يستخدم أدوات دريل كهربائية حديثة، ويضمن أن يعود الأثاث بعد تركيبه متيناً وثابتاً كما كان.</p>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة عن فك وتركيب العفش
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل تتعاملون مع أثاث ايكيا؟</h3>
                <p class="text-gray-700">نعم، لدينا فنيون متخصصون في فك وتركيب منتجات ايكيا باحترافية.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل تشمل الخدمة تعديل المطابخ؟</h3>
                <p class="text-gray-700">نقوم بفك وإعادة التركيب، وفي حال تطلب المطبخ تعديلاً جذرياً لمقاسات الرخام أو الخزائن نوفر نجارين للقص والتعديل عند الطلب.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يمكن طلب فني لتركيب أثاث جديد قمت بشرائه؟</h3>
                <p class="text-gray-700">بالتأكيد، يمكنك الاستعانة بخدماتنا لتركيب أي غرف نوم أو مكاتب جديدة قمت بشرائها بالكرتون.</p>
            </div>
        </div>
    </section>
</main>'''
p3_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقدمة</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الخدمات التي نقدمها</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أهمية الاستعانة بمحترفين</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أسئلة شائعة</a></li>
</ul>'''
p3_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل تتعاملون مع أثاث ايكيا؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، لدينا فنيون متخصصون في فك وتركيب منتجات ايكيا باحترافية."
      }
    },
    {
      "@type": "Question",
      "name": "هل تشمل الخدمة تعديل المطابخ؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نقوم بفك وإعادة التركيب، وفي حال تطلب المطبخ تعديلاً جذرياً لمقاسات الرخام أو الخزائن نوفر نجارين للقص والتعديل عند الطلب."
      }
    },
    {
      "@type": "Question",
      "name": "هل يمكن طلب فني لتركيب أثاث جديد قمت بشرائه؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "بالتأكيد، يمكنك الاستعانة بخدماتنا لتركيب أي غرف نوم أو مكاتب جديدة قمت بشرائها بالكرتون."
      }
    }
  ]
}'''

update_page(p3_path, p3_title, p3_meta, p3_h1, p3_main, p3_schema, p3_sidebar)


# ==========================================
# PAGE 4: Electrical Appliances
# ==========================================
p4_path = "moving-electrical-appliances-in-jeddah"
p4_title = "نقل الأجهزة الكهربائية بجدة | فك وتغليف ونقل آمن"
p4_meta = "نقل الأجهزة الكهربائية بجدة باحترافية تامة. نوفر سيارات مجهزة وتغليف خاص لنقل الثلاجات، الغسالات، الشاشات، والمكيفات بأمان."
p4_h1 = "نقل الأجهزة الكهربائية بجدة"
p4_main = '''<main class="lg:w-3/4 space-y-12">
    <!-- Introduction -->
    <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
            تُعد عملية <strong>نقل الأجهزة الكهربائية بجدة</strong> من أكثر العمليات حساسية. الأجهزة المنزلية مثل الثلاجات والشاشات عرضة للتلف الداخلي والخارجي إذا لم يتم التعامل معها بشكل صحيح أثناء الرفع والتحميل. فريقنا يوفر التقنيات والمواد لضمان وصول أجهزتك لتعمل بكفاءتها المعتادة دون أي خلل.
        </p>
    </section>

    <!-- H2 -->
    <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            أنواع الأجهزة التي نقوم بنقلها
        </h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">نقل الثلاجات والمجمدات</h3>
        <p class="mb-4 text-gray-700">نقل الثلاجات يتطلب بقائها في وضع عمودي لتجنب تسرب غاز الفريون أو زيت الضاغط. نحن نوفر تروليات مخصصة لنقلها بأمان بعد فصل التيار عنها وتفريغها وتغليفها.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">نقل الغسالات والنشافات</h3>
        <p class="mb-4 text-gray-700">يجب تأمين حوض الغسالة بمسامير التثبيت الأصلية (إن وجدت) لمنع اهتزازه الداخلي أثناء النقل مما يحمي المحرك والمساعدين من التلف.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">نقل الشاشات والإلكترونيات</h3>
        <p class="mb-4 text-gray-700">الشاشات الحديثة هشة جداً. نقوم بتغليفها بالفوم الرغوي والبلاستيك الفقاعي ووضعها في كراتين مخصصة ونقلها بحذر تام لمنع كسر أو شرخ الشاشة.</p>

        <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">نقل المكيفات (شباك وسبليت)</h3>
        <p class="mb-4 text-gray-700">يقوم فني التكييف بتفريغ الغاز وحفظه (Pump Down) ثم فك الوحدتين الداخلية والخارجية للمكيف السبليت بشكل سليم وتغليفهما تمهيداً للنقل.</p>
    </section>

    <!-- H2 -->
    <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
            نصائح قبل نقل الأجهزة الكهربائية
        </h2>
        <ul class="space-y-3 mt-4 text-gray-700">
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> افصل الثلاجة عن الكهرباء قبل النقل بـ 12 إلى 24 ساعة وأذب الثلج تماماً.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> تأكد من تفريغ الغسالة من المياه بالكامل وتنشيف الحوض الداخلي لمنع العفونة.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> احتفظ بمسامير تثبيت الأجهزة والكابلات في أكياس بلاستيكية ملصقة بظهر الجهاز لتلافي ضياعها.</li>
            <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> لا تقم بتشغيل الثلاجة في المكان الجديد فور وصولها، انتظر من 4 إلى 6 ساعات لتستقر سوائل التبريد.</li>
        </ul>
    </section>

    <!-- FAQ -->
    <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
            أسئلة شائعة عن نقل الأجهزة
        </h2>
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل توفرون خدمة فك وتركيب المكيفات؟</h3>
                <p class="text-gray-700">نعم، نوفر فنيين متخصصين لفك ونقل وتركيب جميع أنواع المكيفات (الشباك والاسبليت).</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">كيف تحمون الشاشات المسطحة من الكسر؟</h3>
                <p class="text-gray-700">نستخدم الفوم الواقي، التغليف الفقاعي المزدوج، وصناديق كرتونية مخصصة للشاشات.</p>
            </div>
            <div class="border-b pb-4">
                <h3 class="font-bold text-lg text-slate-900 mb-2">هل يتم نقل الأجهزة في وضع أفقي أم عمودي؟</h3>
                <p class="text-gray-700">يجب نقل الثلاجات والغسالات دائماً في وضع عمودي لتجنب تلف المكونات الداخلية والموتور.</p>
            </div>
        </div>
    </section>
</main>'''
p4_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
    <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقدمة</a></li>
    <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أنواع الأجهزة</a></li>
    <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">نصائح هامة</a></li>
    <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أسئلة شائعة</a></li>
</ul>'''
p4_schema = '''{
  "@type": "FAQPage",
  "@id": "https://almontalaqmoving.com/moving-electrical-appliances-in-jeddah/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل توفرون خدمة فك وتركيب المكيفات؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، نوفر فنيين متخصصين لفك ونقل وتركيب جميع أنواع المكيفات (الشباك والاسبليت)."
      }
    },
    {
      "@type": "Question",
      "name": "كيف تحمون الشاشات المسطحة من الكسر؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نستخدم الفوم الواقي، التغليف الفقاعي المزدوج، وصناديق كرتونية مخصصة للشاشات."
      }
    },
    {
      "@type": "Question",
      "name": "هل يتم نقل الأجهزة في وضع أفقي أم عمودي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يجب نقل الثلاجات والغسالات دائماً في وضع عمودي لتجنب تلف المكونات الداخلية والموتور."
      }
    }
  ]
}'''

update_page(p4_path, p4_title, p4_meta, p4_h1, p4_main, p4_schema, p4_sidebar)

print("All page updates completed.")
