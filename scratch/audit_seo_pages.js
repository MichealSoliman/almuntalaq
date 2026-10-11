const fs = require('fs');

const pages = [
    'furniture-packaging-in-jeddah/index.html',
    'furniture-moving-with-packing/index.html',
    'furniture-dismantling-and-assembly-in-jeddah/index.html',
    'moving-electrical-appliances-in-jeddah/index.html',
    'blogs/how-to-pack-furniture/index.html',
    'moving-trucks-in-jeddah/index.html',
    'bridal-trousseau-moving-jeddah/index.html',
    'cheapest-furniture-moving-jeddah/index.html',
    'furniture-moving-workers-in-jeddah/index.html'
];

pages.forEach(page => {
    if (!fs.existsSync(page)) {
        console.log(`[ERROR] File missing: ${page}`);
        return;
    }
    const html = fs.readFileSync(page, 'utf8');
    
    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'NONE';
    
    // H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'NONE';
    
    // Meta Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const desc = descMatch ? descMatch[1].trim() : 'NONE';
    
    // Canonical
    const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
    const canonical = canonMatch ? canonMatch[1].trim() : 'NONE';
    
    // Schema
    const schemaMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    let schemaValid = false;
    let schemaTypes = [];
    if (schemaMatch) {
        try {
            const parsed = JSON.parse(schemaMatch[1]);
            schemaValid = true;
            if (parsed['@graph']) {
                schemaTypes = parsed['@graph'].map(item => item['@type']);
            } else if (parsed['@type']) {
                schemaTypes = [parsed['@type']];
            }
        } catch (e) {
            schemaValid = false;
        }
    }
    
    console.log(`\n========================================`);
    console.log(`File: ${page}`);
    console.log(`Title: ${title}`);
    console.log(`H1: ${h1}`);
    console.log(`Canonical: ${canonical}`);
    console.log(`Meta Desc: ${desc.slice(0, 80)}...`);
    console.log(`Schema Valid: ${schemaValid} (${schemaTypes.join(', ')})`);
});
