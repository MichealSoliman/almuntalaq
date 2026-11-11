/**
 * gtm-loader.js - Centralized Google Tag Manager & Event Tracking Loader
 * Company: Almontalaq Moving (https://almontalaqmoving.com/)
 * 
 * Replace 'GTM-XXXXXXX' below with your actual GTM Container ID when ready.
 * Setting it to empty string or leaving as 'GTM-XXXXXXX' prevents sending broken requests.
 */
(function () {
    'use strict';

    // =========================================================================
    // 1. CONFIGURATION PLACEHOLDER
    // =========================================================================
    var GTM_ID = 'GTM-XXXXXXX'; // <--- ضع معرّف GTM الخاص بك هنا

    // =========================================================================
    // 2. INITIALIZE DATALAYER & INJECT GTM (Only if a valid ID is provided)
    // =========================================================================
    window.dataLayer = window.dataLayer || [];

    if (GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && GTM_ID.indexOf('GTM-') === 0) {
        // Push initial gtm.start event
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        // Inject GTM script into <head>
        var f = document.getElementsByTagName('script')[0];
        var j = document.createElement('script');
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
        if (f && f.parentNode) {
            f.parentNode.insertBefore(j, f);
        } else {
            document.head.appendChild(j);
        }

        // Inject GTM noscript iframe into <body>
        var noscript = document.createElement('noscript');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + GTM_ID;
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noscript.appendChild(iframe);
        if (document.body) {
            document.body.insertBefore(noscript, document.body.firstChild);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.insertBefore(noscript, document.body.firstChild);
            });
        }
    }

    // =========================================================================
    // 3. EVENT TRACKING LOGIC (click_call, click_whatsapp, form_submit)
    // =========================================================================
    function determinePlacement(el) {
        if (!el) return 'unknown';
        if (el.closest('#floating-actions') || el.closest('.fixed') || el.closest('.floating-actions') || el.classList.contains('floating-btn')) {
            return 'floating';
        }
        if (el.closest('header') || el.closest('nav') || el.closest('.nav-menu')) {
            return 'header';
        }
        if (el.closest('#global-footer') || el.closest('footer')) {
            return 'footer';
        }
        if (el.closest('.hero') || el.closest('#hero') || el.closest('section:first-of-type')) {
            return 'hero';
        }
        return 'content';
    }

    function getElementText(el) {
        if (!el) return '';
        var text = el.innerText || el.textContent || '';
        text = text.replace(/\s+/g, ' ').trim();
        if (!text && el.getAttribute('aria-label')) text = el.getAttribute('aria-label').trim();
        if (!text && el.getAttribute('title')) text = el.getAttribute('title').trim();
        return text || 'Icon/Button';
    }

    // Click tracking for tel: and whatsapp
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;

        var href = link.getAttribute('href') || '';
        var currentPath = window.location.pathname;
        var pageTitle = document.title;
        var placement = determinePlacement(link);
        var buttonText = getElementText(link);

        if (href.startsWith('tel:')) {
            var phoneNumber = href.replace('tel:', '').trim();
            window.dataLayer.push({
                event: 'click_call',
                page_path: currentPath,
                page_title: pageTitle,
                button_text: buttonText,
                button_placement: placement,
                phone_number: phoneNumber
            });
        } else if (href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp.com')) {
            window.dataLayer.push({
                event: 'click_whatsapp',
                page_path: currentPath,
                page_title: pageTitle,
                button_text: buttonText,
                button_placement: placement,
                target_url: href
            });
        }
    }, { passive: true });

    // Submit tracking for forms
    document.addEventListener('submit', function (e) {
        var form = e.target.closest('form');
        if (!form) return;

        var currentPath = window.location.pathname;
        var pageTitle = document.title;
        var placement = determinePlacement(form);
        var submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        var buttonText = submitBtn ? getElementText(submitBtn) : 'Submit';

        window.dataLayer.push({
            event: 'generate_lead',
            page_path: currentPath,
            page_title: pageTitle,
            form_placement: placement,
            button_text: buttonText
        });
    }, { passive: true });
})();

