const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Since docx is a zip file, let's extract word/document.xml
const AdmZip = (() => {
    try { return require('adm-zip'); } catch(e) { return null; }
})();

if (AdmZip) {
    const zip = new AdmZip('Holidays Content for website.docx');
    const content = zip.readAsText('word/document.xml');
    // Strip XML tags
    const text = content.replace(/<w:p[^>]*>/g, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    console.log("=== EXTRACTED DOCX CONTENT ===");
    console.log(text);
} else {
    // If adm-zip is not installed, use python
    console.log("AdmZip not installed, fallback to python");
}
