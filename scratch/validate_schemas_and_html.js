const fs = require('fs');

const pages = [
    'moving-trucks-in-jeddah/index.html',
    'bridal-trousseau-moving-jeddah/index.html',
    'cheapest-furniture-moving-jeddah/index.html'
];

for (const p of pages) {
    console.log(`\n================================`);
    console.log(`VALIDATING: ${p}`);
    console.log(`================================`);
    const content = fs.readFileSync(p, 'utf8');
    
    // 1. JSON-LD Schema validation
    const jsonLdMatches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
    if (!jsonLdMatches) {
        console.error('FAIL: No JSON-LD schema found!');
    } else {
        console.log(`Found ${jsonLdMatches.length} JSON-LD block(s).`);
        jsonLdMatches.forEach((block, idx) => {
            const rawJson = block.replace(/<script type="application\/ld\+json">/i, '').replace(/<\/script>/i, '').trim();
            try {
                const parsed = JSON.parse(rawJson);
                console.log(`Block ${idx + 1}: Valid JSON.`);
                if (parsed['@graph']) {
                    const types = parsed['@graph'].map(item => item['@type']);
                    console.log(`  Schema types in @graph: ${types.join(', ')}`);
                } else if (parsed['@type']) {
                    console.log(`  Schema type: ${parsed['@type']}`);
                }
            } catch (err) {
                console.error(`FAIL: Invalid JSON in Block ${idx + 1}:`, err.message);
            }
        });
    }
    
    // 2. H1 count
    const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log(`H1 count: ${h1Matches.length}`);
    if (h1Matches.length !== 1) {
        console.warn(`WARNING: Expected 1 H1, found ${h1Matches.length}`);
    } else {
        console.log(`  H1 text: ${h1Matches[0].replace(/<[^>]+>/g, '').trim()}`);
    }
    
    // 3. Canonical
    const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    console.log(`Canonical: ${canonMatch ? canonMatch[1] : 'MISSING'}`);
    
    // 4. Phone & WhatsApp consistency
    const phoneMatches = content.match(/tel:([0-9+]+)/g) || [];
    const waMatches = content.match(/wa\.me\/([0-9+]+)/g) || [];
    console.log(`Phone instances: ${phoneMatches.length} (${[...new Set(phoneMatches)].join(', ')})`);
    console.log(`WhatsApp instances: ${waMatches.length} (${[...new Set(waMatches)].join(', ')})`);
    
    // 5. Images check
    const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
    console.log(`Images found: ${imgMatches.length}`);
    for (const img of imgMatches) {
        const srcMatch = img.match(/src=["']([^"']+)["']/i);
        const altMatch = img.match(/alt=["']([^"']+)["']/i);
        const src = srcMatch ? srcMatch[1] : 'NONE';
        const alt = altMatch ? altMatch[1] : 'NONE';
        
        // check local existence if relative or matches domain
        let localPath = null;
        if (src.startsWith('https://almontalaqmoving.com/')) {
            localPath = src.replace('https://almontalaqmoving.com/', '');
        } else if (src.startsWith('../')) {
            localPath = src.replace(/^\.\.\//, '');
        } else if (src.startsWith('/')) {
            localPath = src.substring(1);
        }
        
        let exists = true;
        if (localPath) {
            exists = fs.existsSync(localPath);
        }
        console.log(`  IMG: alt="${alt}" | exists: ${exists} (${src})`);
    }
}
