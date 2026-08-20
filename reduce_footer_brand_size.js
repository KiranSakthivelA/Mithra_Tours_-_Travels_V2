const fs = require('fs');
const path = require('path');

const brandColCompactCss = `
/* ── BRAND COLUMN COMPACT STYLING ── */
.footer-col.brand-col .footer-logo img {
    max-width: 120px;
    height: auto;
    display: block;
    margin-bottom: 0.65rem;
}

.footer-col.brand-col p {
    font-size: 0.79rem !important;
    line-height: 1.55 !important;
    color: var(--text-body, #64748B) !important;
    margin: 0.65rem 0 1.1rem !important;
    max-width: 260px !important;
}

.footer-col.brand-col .social-icons-row {
    display: flex;
    gap: 0.5rem;
}

.footer-col.brand-col .social-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 0.80rem;
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ── BRAND COLUMN COMPACT STYLING ──[\s\S]*?(?=\/\*|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, brandColCompactCss.trim() + '\n\n');
    } else {
        css += '\n\n' + brandColCompactCss.trim() + '\n';
    }

    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated brand column compact size in:', file);
});
