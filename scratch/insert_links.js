const fs = require('fs');
let html = fs.readFileSync('areas/index.html', 'utf8');

const strToFind = `link: "./jeddah-and-riyadh/"\r\n                    },\r\n                    {`;

const replacement = `link: "./jeddah-and-riyadh/"
                    },
                    {
                        img: "../assets/img/hayu-albasateen.webp",
                        alt: "نقل عفش حي السنابل جدة",
                        badge: "نقل عفش السنابل",
                        date: "05 أكتوبر 2026",
                        views: "1.2k",
                        title: "نقل عفش حي السنابل جدة | فك وتركيب وتغليف العفش",
                        desc: "شركة المنطلق لنقل العفش في حي السنابل جنوب جدة، خدمة احترافية لنقل الأثاث المنزلي والتجاري مع الفك والتركيب والتغليف الشامل، اطلب الخدمة الآن.",
                        link: "./hayu-alsanabel/"
                    },
                    {
                        img: "../assets/img/hayu-albasateen.webp",
                        alt: "نقل عفش حي الأجاويد جدة",
                        badge: "نقل عفش الأجاويد",
                        date: "05 أكتوبر 2026",
                        views: "1.5k",
                        title: "نقل عفش حي الأجاويد جدة | نقل وفك وتركيب وتغليف العفش",
                        desc: "شركة المنطلق تقدم خدمة نقل عفش حي الأجاويد بجدة، مع الفك والتركيب والتغليف الآمن للأثاث وسيارات نقل مجهزة بأفضل الأسعار.",
                        link: "./hayu-alajawid/"
                    },
                    {
                        img: "../assets/img/hayu-albasateen.webp",
                        alt: "نقل عفش حي المحمدية جدة",
                        badge: "نقل عفش المحمدية",
                        date: "05 أكتوبر 2026",
                        views: "2.1k",
                        title: "نقل عفش حي المحمدية جدة | فك وتركيب وتغليف العفش الفاخر",
                        desc: "متخصصون في نقل عفش حي المحمدية جدة، نتعامل مع الأثاث الفاخر للفلل والشقق الراقية بأعلى معايير الأمان والتغليف المضاعف لتجربة انتقال خالية من القلق.",
                        link: "./hayu-almuhammadiyah/"
                    },
                    {
                        img: "../assets/img/hayu-albasateen.webp",
                        alt: "نقل عفش حي الخالدية جدة",
                        badge: "نقل عفش الخالدية",
                        date: "05 أكتوبر 2026",
                        views: "1.8k",
                        title: "نقل عفش حي الخالدية جدة | احترافية النقل السكني والتجاري",
                        desc: "خدمات نقل عفش حي الخالدية جدة بأيدي خبراء متخصصين. نوفر نقل أثاث المكاتب والفلل والشقق مع ضمان الفك والتركيب والتغليف الاحترافي وبأسعار منافسة.",
                        link: "./hayu-alkhalidiya/"
                    },
                    {`.replace(/\n/g, '\r\n');

if (html.includes(strToFind)) {
    html = html.replace(strToFind, replacement);
    fs.writeFileSync('areas/index.html', html);
    console.log("Replaced successfully!");
} else {
    // try fallback with \n instead of \r\n
    const strToFindFallback = `link: "./jeddah-and-riyadh/"\n                    },\n                    {`;
    if (html.includes(strToFindFallback)) {
        html = html.replace(strToFindFallback, replacement.replace(/\r\n/g, '\n'));
        fs.writeFileSync('areas/index.html', html);
        console.log("Replaced successfully! (fallback)");
    } else {
        console.log("Could not find the target string.");
    }
}
