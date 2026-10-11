/**
 * footer-loader.js
 * مُحمّل الفوتر الموحد لشركة المنطلق لنقل العفش بجدة.
 * يقوم بجلب ملف footer.html تلقائياً وإدراجه في الصفحة بحيث يتم تعديل الفوتر في ملف واحد (footer.html) ويسمع في كل الصفحات.
 */

(function () {
    'use strict';

    // تحديد المسار المناسب لملف footer.html بحسب موقع الصفحة الحالية
    function getFooterPath() {
        if (window.location.protocol === 'file:') {
            // في حال الفتح المحلي عبر بروتوكول file://
            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const fileName = pathSegments.pop() || '';
            const depth = pathSegments.length;
            // إيجاد المسار النسبي لملف footer.html
            const relativeDots = depth > 0 ? '../'.repeat(depth) : './';
            return relativeDots + 'footer.html';
        }
        return '/footer.html';
    }

    // إدراج الفوتر في المكان المناسب بالصفحة
    function injectFooter(html) {
        if (!html) return;

        // البحث عن الحاويات المخصصة أولاً
        const target = document.getElementById('global-footer') ||
                       document.getElementById('site-footer') ||
                       document.getElementById('footer-placeholder') ||
                       document.querySelector('site-footer') ||
                       document.querySelector('footer#contact');

        if (target) {
            target.outerHTML = html;
        } else {
            // في حال عدم وجود حاوية، يتم إدراجه في نهاية main أو body
            const main = document.querySelector('main');
            if (main) {
                main.insertAdjacentHTML('beforeend', html);
            } else {
                document.body.insertAdjacentHTML('beforeend', html);
            }
        }
    }

    // جلب ملف footer.html
    async function loadFooter() {
        const footerUrl = getFooterPath();

        // فحص الذاكرة المؤقتة للجلسة لتسريع التصفح
        try {
            const cachedFooter = sessionStorage.getItem('almontalaq_footer_cache');
            if (cachedFooter) {
                injectFooter(cachedFooter);
                // تحديث الكاش في الخلفية
                fetch(footerUrl)
                    .then(res => res.ok ? res.text() : null)
                    .then(freshHtml => {
                        if (freshHtml && freshHtml !== cachedFooter) {
                            sessionStorage.setItem('almontalaq_footer_cache', freshHtml);
                        }
                    })
                    .catch(() => {});
                return;
            }
        } catch (e) {
            // تجاهل أخطاء sessionStorage
        }

        try {
            const response = await fetch(footerUrl);
            if (!response.ok) throw new Error('Failed to load footer: ' + response.status);
            const html = await response.text();
            
            injectFooter(html);

            try {
                sessionStorage.setItem('almontalaq_footer_cache', html);
            } catch (e) {}
        } catch (err) {
            console.warn('Footer dynamic fetch note (falling back to relative fetch):', err.message);
            // محاولة جلب نسبي احتياطية
            fetch('./footer.html')
                .then(r => r.text())
                .then(html => injectFooter(html))
                .catch(() => {
                    // محاولة أخيرة مع components/footer.html
                    fetch('/components/footer.html')
                        .then(r => r.text())
                        .then(html => injectFooter(html))
                        .catch(() => {});
                });
        }
    }

    // التشغيل عند جاهزية الـ DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
