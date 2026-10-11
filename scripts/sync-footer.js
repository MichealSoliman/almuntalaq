const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const footerPath = path.join(root, 'footer.html');

if (!fs.existsSync(footerPath)) {
    console.error('footer.html does not exist in root directory!');
    process.exit(1);
}

const footerHtml = fs.readFileSync(footerPath, 'utf8').trim();

// العثور على جميع ملفات HTML في المشروع (باستثناء footer.html و components و scratch و node_modules)
function findHtmlFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (['node_modules', '.git', 'scratch', 'components'].includes(entry.name)) {
                continue;
            }
            results = results.concat(findHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'footer.html') {
            results.push(fullPath);
        }
    }
    return results;
}

const htmlFiles = findHtmlFiles(root);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

const footerSnippet = `<!-- Unified Footer Component -->
        <div id="global-footer"></div>
        <script src="/assets/js/footer-loader.js" defer></script>`;

let updatedCount = 0;

for (const filePath of htmlFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(root, filePath);

    // التحقق مما إذا كان الملف يحتوي على footer
    const footerRegex = /<footer[\s\S]*?<\/footer>/i;
    
    // تأكد من وجود ملف footer-loader.js في الصفحة
    let modified = false;

    if (relPath === 'index.html') {
        // في الصفحة الرئيسية: نحافظ على كود الفوتر الفعلي لسرعة التحميل الأولى والأرشفة مع إضافة السكربت للمزامنة
        if (!content.includes('footer-loader.js')) {
            content = content.replace('</body>', '    <script src="/assets/js/footer-loader.js" defer></script>\n</body>');
            modified = true;
        }
    } else {
        // في باقي الصفحات: استبدال وسم footer بالـ Component الموحد والمختصر
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, footerSnippet);
            modified = true;
        } else if (content.includes('id="global-footer"')) {
            // موجود مسبقاً
        } else {
            // إذا لم يكن هناك وسم footer، ندرجه قبل إغلاق main أو body
            if (content.includes('</main>')) {
                content = content.replace('</main>', `    ${footerSnippet}\n    </main>`);
                modified = true;
            } else if (content.includes('</body>')) {
                content = content.replace('</body>', `    ${footerSnippet}\n</body>`);
                modified = true;
            }
        }

        // التأكد من عدم تكرار السكربت إذا كان موجوداً
        if (content.includes('id="global-footer"') && !content.includes('footer-loader.js')) {
            content = content.replace('id="global-footer"></div>', 'id="global-footer"></div>\n        <script src="/assets/js/footer-loader.js" defer></script>');
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        // console.log(`Updated: ${relPath}`);
    }
}

console.log(`✅ Successfully synced footer component to ${updatedCount} HTML pages!`);
