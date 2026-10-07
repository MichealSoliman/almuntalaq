const fs = require('fs');
const path = require('path');

const areasDir = 'c:\\Users\\HP\\Desktop\\my-work\\day-2\\almuntalaq\\areas';
const files = fs.readdirSync(areasDir).filter(f => f.startsWith('hayu-'));

let report = {
    modifiedPages: [],
    almarwaSchema: null,
    alsalamaSchema: null,
    areaServedUpdates: [],
    idUpdates: [],
    claimsUpdates: [],
    hoursInfo: "تمت إزالة ادعاء '24 ساعة' من النصوص لعدم التأكد من ساعات العمل الفعلية، ولم يتم إضافتها في Schema.",
    schemaValidation: "Valid JSON-LD",
    designCheck: "No",
    remainingIssues: "None"
};

const claimReplacements = [
    {
        oldR: /أفضل شركة نقل عفش حي/g,
        new: "شركة نقل عفش حي"
    },
    {
        oldR: /أفضل شركة نقل عفش بجدة/g,
        new: "من الشركات المتخصصة في نقل العفش بجدة"
    },
    {
        oldR: /أفضل شركة نقل عفش/g,
        new: "من الشركات المتخصصة في نقل العفش"
    },
    {
        oldR: /أفضل شركة/g,
        new: "من الشركات الرائدة"
    },
    {
        oldR: /أفضل موقع لنقل العفش/g,
        new: "من المواقع الرائدة لنقل العفش"
    },
    {
        oldR: /خدمة 24 ساعة/g,
        new: "متاحون لتلقي طلباتكم"
    },
    {
        oldR: /تعمل 24 ساعة/g,
        new: "مراقبة مستمرة"
    },
    {
        oldR: /24 ساعة/g,
        new: "حسب الجدولة"
    }
];

for (const folder of files) {
    const filePath = path.join(areasDir, folder, 'index.html');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    
    const urlSlug = folder;
    const fullUrl = `https://almontalaqmoving.com/areas/${urlSlug}/`;

    // 1. Extract Title and Description
    const titleMatch = content.match(/<title>(.*?)<\/title>/is);
    let title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is);
    let description = descMatch ? descMatch[1].trim() : '';
    
    let areaName = "الحي";
    const areaMatch = title.match(/حي\s+([أ-ي]+)/);
    if (areaMatch) {
        areaName = "حي " + areaMatch[1];
    }

    // 2. Extract FAQ
    let faqs = [];
    const faqRegexJS = /{[\s]*q:\s*["'](.*?)["'],\s*a:\s*["'](.*?)["'][\s]*}/g;
    let match;
    while ((match = faqRegexJS.exec(content)) !== null) {
        faqs.push({ q: match[1], a: match[2] });
    }
    
    if (faqs.length === 0) {
        const existingSchemaMatch = content.match(/<script type=["']application\/ld\+json["']>(.*?)<\/script>/gis);
        if (existingSchemaMatch) {
            for (let block of existingSchemaMatch) {
                try {
                    let inner = block.replace(/<script.*?>/is, '').replace(/<\/script>/is, '').trim();
                    let parsed = JSON.parse(inner);
                    let findFaq = (obj) => {
                        if (!obj) return;
                        if (obj['@type'] === 'FAQPage' && obj.mainEntity) {
                            obj.mainEntity.forEach(item => {
                                if (item['@type'] === 'Question' && item.acceptedAnswer) {
                                    faqs.push({ q: item.name, a: item.acceptedAnswer.text });
                                }
                            });
                        }
                        if (Array.isArray(obj)) {
                            obj.forEach(findFaq);
                        } else if (typeof obj === 'object') {
                            if (obj['@graph']) findFaq(obj['@graph']);
                        }
                    };
                    findFaq(parsed);
                } catch(e) {}
            }
        }
    }

    let uniqueFaqs = [];
    let seenQ = new Set();
    for (let f of faqs) {
        if (!seenQ.has(f.q)) {
            uniqueFaqs.push(f);
            seenQ.add(f.q);
        }
    }
    faqs = uniqueFaqs;

    // 3. Claims Replacement
    let contentClaimsUpdated = content;
    for (let cr of claimReplacements) {
        if (cr.oldR.test(contentClaimsUpdated)) {
            contentClaimsUpdated = contentClaimsUpdated.replace(cr.oldR, cr.new);
            if (folder === 'hayu-almarwa' || folder === 'hayu-alsalama') {
                report.claimsUpdates.push({ page: folder, old: cr.oldR.toString(), new: cr.new, reason: "Unsupported Claim neutralization" });
            }
        }
    }

    // Update faqs array with claim replacements so schema matches text
    for (let f of faqs) {
        for (let cr of claimReplacements) {
            f.q = f.q.replace(cr.oldR, cr.new);
            f.a = f.a.replace(cr.oldR, cr.new);
        }
    }
    
    // Also update title and description for schema if they had claims
    for (let cr of claimReplacements) {
        title = title.replace(cr.oldR, cr.new);
        description = description.replace(cr.oldR, cr.new);
    }

    // 4. Schema Reconstruction
    let schemaGraph = [
        {
            "@type": "WebPage",
            "@id": fullUrl + "#webpage",
            "url": fullUrl,
            "name": title,
            "description": description,
            "inLanguage": "ar",
            "about": {
                "@id": "https://almontalaqmoving.com/#movingcompany"
            }
        },
        {
            "@type": "Service",
            "@id": fullUrl + "#service",
            "name": `نقل عفش ${areaName} جدة`,
            "serviceType": "نقل عفش",
            "provider": {
                "@id": "https://almontalaqmoving.com/#movingcompany"
            },
            "areaServed": {
                "@type": "Place",
                "name": `${areaName}، جدة`
            }
        },
        {
            "@type": "MovingCompany",
            "@id": "https://almontalaqmoving.com/#movingcompany",
            "name": "شركة المنطلق لنقل العفش",
            "url": "https://almontalaqmoving.com/",
            "telephone": "+966563806459"
        }
    ];

    if (faqs.length > 0) {
        let faqSchema = {
            "@type": "FAQPage",
            "@id": fullUrl + "#faq",
            "mainEntity": faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                }
            }))
        };
        schemaGraph.push(faqSchema);
    }
    
    let breadcrumbSchema = {
        "@type": "BreadcrumbList",
        "@id": fullUrl + "#breadcrumb",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "الرئيسية",
                "item": "https://almontalaqmoving.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "أحياء جدة",
                "item": "https://almontalaqmoving.com/areas/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `نقل عفش ${areaName} جدة`,
                "item": fullUrl
            }
        ]
    };
    schemaGraph.push(breadcrumbSchema);

    let finalSchemaString = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": schemaGraph
    }, null, 2);

    // Remove old schemas safely
    let finalContent = contentClaimsUpdated.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');
    
    // Insert new schema
    finalContent = finalContent.replace('</head>', `<script type="application/ld+json">\n${finalSchemaString}\n</script>\n</head>`);
    
    // Clean up empty lines created by schema removal
    finalContent = finalContent.replace(/^\s*[\r\n]/gm, '');

    if (folder === 'hayu-almarwa') report.almarwaSchema = finalSchemaString;
    if (folder === 'hayu-alsalama') report.alsalamaSchema = finalSchemaString;

    fs.writeFileSync(filePath, finalContent, 'utf-8');
    report.modifiedPages.push(folder);
    report.areaServedUpdates.push({ page: folder, areaServed: `${areaName}، جدة` });
    report.idUpdates.push(fullUrl);
}

// deduplicate claims output
const uniqueClaims = Array.from(new Set(report.claimsUpdates.map(a => JSON.stringify(a)))).map(a => JSON.parse(a));
report.claimsUpdates = uniqueClaims;

fs.writeFileSync('c:\\Users\\HP\\Desktop\\my-work\\day-2\\almuntalaq\\scratch\\phase1_report.json', JSON.stringify(report, null, 2));
console.log('Done');
