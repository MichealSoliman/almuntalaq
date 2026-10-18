const fs = require('fs');

function analyzePage(path) {
    console.log(`=== Analyzing: ${path} ===`);
    const content = fs.readFileSync(path, 'utf8');
    
    // Title
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
    
    // Meta Description
    const metaDesc = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    console.log('Meta Description:', metaDesc ? metaDesc[1] : 'NONE');
    
    // H1
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE');
    
    // Canonical
    const canon = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    console.log('Canonical:', canon ? canon[1] : 'NONE');
    
    // Internal service links
    const serviceLinks = content.match(/href=["'](https:\/\/almontalaqmoving\.com\/[^"']+|\/[^"']+)["']/g) || [];
    const uniqueLinks = [...new Set(serviceLinks.map(l => l.replace(/href=["']/, '').replace(/["']$/, '')))];
    console.log('Service & Internal Links count:', uniqueLinks.length);
    console.log('Sample links:', uniqueLinks.filter(l => !l.startsWith('#') && !l.includes('css') && !l.includes('fonts')).slice(0, 15));
}

analyzePage('moving-trucks-in-jeddah/index.html');
analyzePage('bridal-trousseau-moving-jeddah/index.html');
analyzePage('cheapest-furniture-moving-jeddah/index.html');
