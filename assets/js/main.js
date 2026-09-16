// تفعيل تأثيرات الهيدر المتقدمة
(function () {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    // تغيير شكل الهيدر عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // تفعيل قائمة الموبايل
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('max-h-0')) {
                mobileMenu.classList.remove('max-h-0');
                mobileMenu.classList.add('max-h-[600px]', 'py-2');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                mobileMenu.classList.add('max-h-0');
                mobileMenu.classList.remove('max-h-[600px]', 'py-2');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // إغلاق القائمة عند النقر على أي رابط
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('max-h-0');
                mobileMenu.classList.remove('max-h-[600px]', 'py-2');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // إضافة تأثير نشط للرابط الحالي
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-[#1e293b]');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('text-[#1e293b]');
            } else {
                link.classList.remove('text-[#1e293b]');
            }
        });
    });
})();

// Scripts from footer
(function () {
    // Sticky navbar + Back to Top
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar?.classList.add('navbar-sticky');
        } else {
            navbar?.classList.remove('navbar-sticky');
        }
        const backBtn = document.getElementById('backToTop');
        if (window.scrollY > 400) {
            backBtn?.classList.add('show');
        } else {
            backBtn?.classList.remove('show');
        }
    });

    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    menuBtn?.addEventListener('click', () => {
        if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px') {
            mobileMenu.style.maxHeight = '0';
            menuIcon?.classList.remove('fa-times');
            menuIcon?.classList.add('fa-bars');
        } else {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            menuIcon?.classList.remove('fa-bars');
            menuIcon?.classList.add('fa-times');
        }
    });

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            const isOpen = content.classList.contains('open');
            document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('open'));
            document.querySelectorAll('.faq-question i').forEach(ic => ic.style.transform = 'rotate(0deg)');
            if (!isOpen) {
                content.classList.add('open');
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Consolidated single IntersectionObserver for all animations & lazy elements
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('[data-aos], .fade-up');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate', 'visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        animatedElements.forEach(el => observer.observe(el));
    });
})();
