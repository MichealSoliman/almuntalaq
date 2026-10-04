import os
import re

filepath = r"c:\Users\HP\Desktop\my-work\day-2\almuntalaq\furniture-moving-companies-in-jeddah\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title
html = re.sub(r'<title>.*?</title>', '<title>شركات نقل عفش جدة | خدمات نقل العفش واختيار الشركة المناسبة</title>', html, flags=re.DOTALL)

# 2. Update Meta Description
new_desc = '<meta name="description"\n        content="شركات نقل عفش جدة تقدم لك خدمات نقل وتغليف وفك وتركيب الأثاث باحترافية. تعرف على كيفية اختيار الشركة المناسبة وما يحدد الأسعار مع دليلنا الشامل.">'
html = re.sub(r'<meta name="description".*?>', new_desc, html, flags=re.DOTALL)

# 4. Update H1 in Hero Section
hero_h1 = '''<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">
                    شركات نقل عفش جدة
                </h1>'''
html = re.sub(r'<h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">.*?</h1>', hero_h1, html, flags=re.DOTALL)

# 5. Build New Main Content
new_main = '''<main class="lg:w-3/4 space-y-12">

                <!-- Introduction -->
                <section id="section1" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <p class="mb-4 text-justify text-lg leading-relaxed text-gray-700">
                        يشهد سوق <strong>شركات نقل عفش جدة</strong> تنوعاً كبيراً في الخدمات المقدمة، مما يجعل اختيار الشركة المناسبة خطوة هامة لضمان نقل أثاث منزلك أو مكتبك بأمان وبدون أي خدوش أو تلفيات. عندما تبحث عن شركة موثوقة، يجب أن تضع في اعتبارك العديد من العوامل مثل خبرة العمالة، جودة مواد التغليف، وتوفر سيارات مجهزة لنقل العفش. في هذا الدليل، سنرشدك إلى كل ما تحتاج لمعرفته حول خدمات النقل بجدة وكيف تختار الأفضل لك.
                    </p>
                </section>

                <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img src="../../assets/img/furniture-moving-companies-jeddah.webp" alt="شركات نقل عفش جدة" class="w-full h-auto object-cover max-h-[500px]" loading="lazy" decoding="async">
                </div>

                <!-- H2 -->
                <section id="section2" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        شركات نقل عفش جدة والخدمات التي تقدمها
                    </h2>
                    <p class="mb-4 text-justify text-gray-700 leading-relaxed">
                        تقدم الشركات المتخصصة مجموعة متكاملة من الخدمات التي تغطي جميع مراحل الانتقال. لا يقتصر الأمر على مجرد توفير سيارة نقل، بل يشمل الفك، التغليف، التنزيل، التحميل، وصولاً إلى إعادة التركيب في الموقع الجديد.
                    </p>
                </section>

                <!-- H2 -->
                <section id="section3" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        كيف تختار شركة نقل عفش مناسبة في جدة؟
                    </h2>
                    
                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">خبرة فريق العمل</h3>
                    <p class="mb-4 text-gray-700">تعد خبرة الفريق الفني من نجارين وعمال تحميل من أهم مقومات نجاح عملية النقل، حيث تضمن تفكيك الأثاث المعقد بحرفية تامة دون الإضرار به.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">سيارات نقل العفش</h3>
                    <p class="mb-4 text-gray-700">السيارات المغلقة والمبطنة من الداخل تعتبر ضرورة لحماية المنقولات من عوامل الجو والصدمات أثناء السير في الطرقات.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700"><a href="https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/" class="text-blue-600 underline">خدمة فك وتركيب العفش بجدة</a></h3>
                    <p class="mb-4 text-gray-700">يجب أن توفر الشركة نجارين محترفين لفك غرف النوم والمطابخ والستائر وإعادة تركيبها في المنزل الجديد بشكل سليم.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700"><a href="https://almontalaqmoving.com/furniture-packaging-in-jeddah/" class="text-blue-600 underline">تغليف العفش بجدة</a></h3>
                    <p class="mb-4 text-gray-700">استخدام الكرتون المقوى، البلاستيك الفقاعي، والسترتش يضمن وصول القطع الحساسة والزجاجيات بأمان تام.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">التعامل مع القطع الكبيرة</h3>
                    <p class="mb-4 text-gray-700">الأجهزة الكهربائية الضخمة والمجالس الكبيرة تتطلب عناية فائقة وتقنيات خاصة للتحميل والتنزيل عبر الممرات الضيقة.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700"><a href="https://almontalaqmoving.com/furniture-moving-in-jeddah/" class="text-blue-600 underline">النقل داخل أحياء جدة</a></h3>
                    <p class="mb-4 text-gray-700">سواء كنت تنتقل من شمال جدة إلى جنوبها أو العكس، يجب أن تكون الشركة قادرة على تنفيذ العمل بسرعة وفعالية في كافة أحياء عروس البحر الأحمر.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700">النقل بين المدن</h3>
                    <p class="mb-4 text-gray-700">إذا كنت تخطط للانتقال خارج جدة، تأكد من توفر شاحنات مجهزة للسفر الطويل مع تأمين شامل على المنقولات.</p>

                    <h3 class="text-xl font-bold mt-6 mb-3 text-blue-700"><a href="https://almontalaqmoving.com/furniture-storage-in-jeddah/" class="text-blue-600 underline">تخزين العفش بجدة</a> عند الحاجة</h3>
                    <p class="mb-4 text-gray-700">توفر بعض الشركات مستودعات آمنة ونظيفة لتخزين الأثاث لفترات مؤقتة لحين جاهزية المسكن الجديد.</p>
                </section>

                <!-- H2 -->
                <section id="section4" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        خدمات شركات نقل العفش بجدة
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2">نقل عفش المنازل</h3>
                            <p class="text-gray-600 text-sm">خدمة مخصصة للشقق والبيوت السكنية لتسهيل انتقال العائلات.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="https://almontalaqmoving.com/moving-villa-furniture-in-jeddah/" class="text-blue-600 underline">نقل عفش الفلل بجدة</a></h3>
                            <p class="text-gray-600 text-sm">فرق عمل كبيرة للتعامل مع الفلل والقصور التي تحتوي على كميات ضخمة من الأثاث الفاخر.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="https://almontalaqmoving.com/moving-office-furniture-in-jeddah/" class="text-blue-600 underline">نقل عفش المكاتب بجدة</a></h3>
                            <p class="text-gray-600 text-sm">نقل وتغليف الملفات وأجهزة الكمبيوتر والأثاث المكتبي باحترافية وسرعة.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2">فك وتركيب العفش</h3>
                            <p class="text-gray-600 text-sm">تفكيك احترافي للمطابخ وغرف النوم الحديثة والكلاسيكية لضمان نقلها بأمان.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2">تغليف العفش</h3>
                            <p class="text-gray-600 text-sm">استخدام خامات تغليف قوية لمنع الاحتكاك وتراكم الغبار.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2">تخزين العفش</h3>
                            <p class="text-gray-600 text-sm">مساحات تخزينية آمنة تتوفر بها معايير التهوية الجيدة.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 class="font-bold text-lg text-blue-800 mb-2"><a href="https://almontalaqmoving.com/hydraulic-winch-moving-jeddah/" class="text-blue-600 underline">ونش رفع العفش بجدة</a></h3>
                            <p class="text-gray-600 text-sm">استخدام الأوناش الهيدروليكية لرفع وإنزال الأثاث للأدوار العليا لتجنب السلالم الضيقة.</p>
                        </div>
                    </div>
                </section>

                <!-- H2 -->
                <section id="section5" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        ما الذي يحدد أسعار نقل العفش بجدة؟
                    </h2>
                    <p class="mb-4 text-gray-700">تتفاوت الأسعار بين الشركات بناءً على عدة عوامل أساسية:</p>
                    
                    <ul class="space-y-3 mt-4 text-gray-700">
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>حجم العفش:</strong> كمية الأثاث تحدد حجم السيارة المطلوبة وعدد العمالة.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>عدد الغرف:</strong> كلما زاد عدد الغرف، زادت مدة وتكلفة الفك والتغليف.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>المسافة:</strong> النقل بين أحياء متباعدة يؤثر على تكلفة الوقود والوقت.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>عدد الطوابق:</strong> الأدوار العليا تتطلب مجهوداً أكبر أو استخدام الونش.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>المصعد:</strong> توفر مصعد واسع يقلل من الجهد والوقت وبالتالي يؤثر على السعر.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>التغليف:</strong> نوع وكمية مواد التغليف المطلوبة.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الفك والتركيب:</strong> الأثاث الذي يحتاج نجارين متخصصين (مثل ايكيا أو المطابخ) له تكلفة مضافة.</li>
                        <li><i class="fas fa-check-circle text-blue-600 ml-2"></i> <strong>الونش:</strong> استخدام الونش الهيدروليكي يضيف لتكلفة النقل ولكنه يوفر الأمان للقطع الكبيرة.</li>
                    </ul>
                </section>

                <!-- H2 -->
                <section id="section6" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        الفرق بين شركات نقل العفش وكيف تختار الأنسب؟
                    </h2>
                    <p class="mb-4 text-gray-700">
                        يتمثل الفارق الحقيقي بين <a href="https://almontalaqmoving.com/furniture-moving-company-in-jeddah/" class="text-blue-600 underline">شركة نقل عفش في جدة</a> وأخرى في مدى الالتزام والاحترافية والشفافية في تقديم عروض الأسعار بدون رسوم خفية. الشركة الأنسب هي التي توفر عقداً واضحاً، وتستجيب لاستفساراتك بصدر رحب، وتقدم ضمانات حقيقية لتعويضك في حالة حدوث أي أضرار عرضية. 
                    </p>
                </section>

                <!-- H2 -->
                <section id="section7" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        خطوات نقل العفش مع شركة متخصصة
                    </h2>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">1</div>
                            <div><h3 class="font-bold text-lg">المعاينة</h3><p class="text-gray-600 text-sm">تقييم حجم العفش وتحديد المستلزمات والسيارات.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">2</div>
                            <div><h3 class="font-bold text-lg">تجهيز العفش</h3><p class="text-gray-600 text-sm">إفراغ المحتويات وتجهيز القطع للفك.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">3</div>
                            <div><h3 class="font-bold text-lg">الفك</h3><p class="text-gray-600 text-sm">تفكيك الأثاث والمطابخ والستائر بعناية.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">4</div>
                            <div><h3 class="font-bold text-lg">التغليف</h3><p class="text-gray-600 text-sm">تغليف كل قطعة بالمواد المناسبة لحمايتها.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">5</div>
                            <div><h3 class="font-bold text-lg">التحميل</h3><p class="text-gray-600 text-sm">نقل العفش وترتيبه داخل السيارة بشكل آمن.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">6</div>
                            <div><h3 class="font-bold text-lg">النقل</h3><p class="text-gray-600 text-sm">التوجه للموقع الجديد بسيارات مغلقة ومؤمنة.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">7</div>
                            <div><h3 class="font-bold text-lg">التفريغ</h3><p class="text-gray-600 text-sm">إنزال العفش ووضعه في الغرف المخصصة.</p></div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">8</div>
                            <div><h3 class="font-bold text-lg">إعادة التركيب</h3><p class="text-gray-600 text-sm">تركيب الأثاث وإعادته لشكله الأصلي.</p></div>
                        </div>
                    </div>
                </section>

                <!-- H2 -->
                <section id="section8" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 section-title text-slate-900">
                        أفضل طريقة للتأكد من شركة نقل العفش قبل الحجز
                    </h2>
                    <p class="mb-4 text-gray-700">قبل دفع أي عربون أو توقيع اتفاق، احرص على طلب معاينة مجانية من الشركة. ناقش مع المندوب التفاصيل كاملة، وتأكد من أن السعر المقدم نهائي ولا يشمل أي مصاريف إضافية مفاجئة لفك أو تركيب مكيفات أو استخدام الونش، مالم يتم الاتفاق عليها صراحة.</p>
                </section>

                <!-- FAQ Section -->
                <section id="faq" class="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-extrabold mb-8 section-title text-slate-900">
                        أسئلة شائعة عن شركات نقل عفش جدة
                    </h2>
                    
                    <div class="space-y-6">
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">ما الذي تقدمه شركات نقل عفش جدة؟</h3>
                            <p class="text-gray-700">تقدم خدمات متكاملة تشمل توفير العمالة، سيارات النقل، الفك، التغليف، النقل، وإعادة التركيب في المنزل الجديد.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">كيف أختار شركة نقل عفش مناسبة؟</h3>
                            <p class="text-gray-700">من خلال التحقق من التراخيص، تقييمات العملاء السابقين، وضوح عرض السعر، وتوفير عقد ضمان يغطي التلفيات.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل تشمل الخدمة فك وتركيب العفش؟</h3>
                            <p class="text-gray-700">نعم، معظم الشركات توفر نجارين مختصين لفك وتركيب كافة أنواع الأثاث بشكل آمن.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل توفر شركات نقل العفش خدمة التغليف؟</h3>
                            <p class="text-gray-700">نعم، تتوفر خدمات تغليف الأثاث باستخدام خامات مثل البلاستيك الفقاعي والكرتون لحماية المنقولات.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل يمكن تخزين العفش بعد النقل؟</h3>
                            <p class="text-gray-700">بالتأكيد، العديد من الشركات تمتلك مستودعات مجهزة ومؤمنة لتقديم خدمة التخزين المؤقت والدائم.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">ما العوامل التي تحدد سعر نقل العفش؟</h3>
                            <p class="text-gray-700">يتحدد السعر بناءً على كمية العفش، المسافة، الطابق السكني، مدى الحاجة للونش، ومواد التغليف المستخدمة.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل يتم نقل عفش الفلل والمكاتب؟</h3>
                            <p class="text-gray-700">نعم، تتوفر فرق متخصصة وسيارات مجهزة لنقل الأحجام الكبيرة من أثاث الفلل والمكاتب بسرعة وكفاءة.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل يمكن نقل العفش داخل جميع أحياء جدة؟</h3>
                            <p class="text-gray-700">نعم، تغطي الخدمات كافة أحياء جدة سواء في الشمال أو الجنوب أو الشرق أو الغرب.</p>
                        </div>
                        <div class="border-b pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">هل توفر الشركة ونش رفع العفش؟</h3>
                            <p class="text-gray-700">توفر الشركات الكبرى أوناش هيدروليكية لرفع الأثاث الثقيل والضخم للأدوار العليا لتلافي أضرار السلالم الضيقة.</p>
                        </div>
                        <div class="pb-4">
                            <h3 class="font-bold text-lg text-slate-900 mb-2">كيف يتم حجز خدمة نقل العفش؟</h3>
                            <p class="text-gray-700">يمكن الحجز عبر الاتصال الهاتفي المباشر بالشركة أو من خلال التواصل عبر خدمة الواتساب لتحديد موعد للمعاينة وتأكيد الحجز.</p>
                        </div>
                    </div>
                </section>

                <!-- CTA -->
                <section class="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-xl p-10 text-center text-white mt-12 mb-12">
                    <h2 class="text-3xl font-black mb-4">احجز خدمة نقل العفش في جدة</h2>
                    <p class="text-lg mb-8 opacity-90">تواصل معنا الآن للحصول على معاينة مجانية وعرض سعر تنافسي لنقل أثاثك بأمان تام واحترافية.</p>
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="tel:0563806459" class="bg-white text-blue-800 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                            <i class="fas fa-phone-alt"></i> اتصل الآن 0563806459
                        </a>
                        <a href="https://wa.me/966563806459" target="_blank" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center gap-2">
                            <i class="fab fa-whatsapp"></i> راسلنا عبر واتساب
                        </a>
                    </div>
                </section>

            </main>'''

html = re.sub(r'<main class="lg:w-3/4 space-y-12">.*?</main>', new_main, html, flags=re.DOTALL)

# 6. Update Sidebar TOC
new_sidebar = '''<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-[70vh] overflow-y-auto pr-1">
                        <li><a href="#section1" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">مقدمة</a></li>
                        <li><a href="#section2" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">شركات نقل عفش جدة والخدمات التي تقدمها</a></li>
                        <li><a href="#section3" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">كيف تختار شركة نقل عفش مناسبة في جدة؟</a></li>
                        <li><a href="#section4" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">خدمات شركات نقل العفش بجدة</a></li>
                        <li><a href="#section5" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">ما الذي يحدد أسعار نقل العفش بجدة؟</a></li>
                        <li><a href="#section6" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">الفرق بين شركات نقل العفش وكيف تختار الأنسب؟</a></li>
                        <li><a href="#section7" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">خطوات نقل العفش مع شركة متخصصة</a></li>
                        <li><a href="#section8" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أفضل طريقة للتأكد من شركة نقل العفش قبل الحجز</a></li>
                        <li><a href="#faq" class="block py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">أسئلة شائعة</a></li>
                    </ul>'''
html = re.sub(r'<ul class="space-y-2 text-sm font-semibold text-gray-700 max-h-\[70vh\] overflow-y-auto pr-1">.*?</ul>', new_sidebar, html, flags=re.DOTALL)

# 7. Update FAQ Schema
faq_schema = '''{
          "@type": "FAQPage",
          "@id": "https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "ما الذي تقدمه شركات نقل عفش جدة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "تقدم خدمات متكاملة تشمل توفير العمالة، سيارات النقل، الفك، التغليف، النقل، وإعادة التركيب في المنزل الجديد."
              }
            },
            {
              "@type": "Question",
              "name": "كيف أختار شركة نقل عفش مناسبة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "من خلال التحقق من التراخيص، تقييمات العملاء السابقين، وضوح عرض السعر، وتوفير عقد ضمان يغطي التلفيات."
              }
            },
            {
              "@type": "Question",
              "name": "هل تشمل الخدمة فك وتركيب العفش؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، معظم الشركات توفر نجارين مختصين لفك وتركيب كافة أنواع الأثاث بشكل آمن."
              }
            },
            {
              "@type": "Question",
              "name": "هل توفر شركات نقل العفش خدمة التغليف؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، تتوفر خدمات تغليف الأثاث باستخدام خامات مثل البلاستيك الفقاعي والكرتون لحماية المنقولات."
              }
            },
            {
              "@type": "Question",
              "name": "هل يمكن تخزين العفش بعد النقل؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "بالتأكيد، العديد من الشركات تمتلك مستودعات مجهزة ومؤمنة لتقديم خدمة التخزين المؤقت والدائم."
              }
            },
            {
              "@type": "Question",
              "name": "ما العوامل التي تحدد سعر نقل العفش؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "يتحدد السعر بناءً على كمية العفش، المسافة، الطابق السكني، مدى الحاجة للونش، ومواد التغليف المستخدمة."
              }
            },
            {
              "@type": "Question",
              "name": "هل يتم نقل عفش الفلل والمكاتب؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، تتوفر فرق متخصصة وسيارات مجهزة لنقل الأحجام الكبيرة من أثاث الفلل والمكاتب بسرعة وكفاءة."
              }
            },
            {
              "@type": "Question",
              "name": "هل يمكن نقل العفش داخل جميع أحياء جدة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، تغطي الخدمات كافة أحياء جدة سواء في الشمال أو الجنوب أو الشرق أو الغرب."
              }
            },
            {
              "@type": "Question",
              "name": "هل توفر الشركة ونش رفع العفش؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "توفر الشركات الكبرى أوناش هيدروليكية لرفع الأثاث الثقيل والضخم للأدوار العليا لتلافي أضرار السلالم الضيقة."
              }
            },
            {
              "@type": "Question",
              "name": "كيف يتم حجز خدمة نقل العفش؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "يمكن الحجز عبر الاتصال الهاتفي المباشر بالشركة أو من خلال التواصل عبر خدمة الواتساب لتحديد موعد للمعاينة وتأكيد الحجز."
              }
            }
          ]
        }'''
html = re.sub(r'{\s*"@type":\s*"FAQPage",.*?\]\s*}', faq_schema, html, flags=re.DOTALL)

# Let's fix the broken characters previously created by powershell encoding.
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated A successfully with UTF-8")
