const fs = require('fs');
const path = require('path');

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    css = css.replace(/\.hero-sidecar-badge\s*\{[\s\S]*?\}/, `.hero-sidecar-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.24rem 0.80rem;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    color: #B45309;
    letter-spacing: 0.2px;
    margin-bottom: 1.1rem;
    box-shadow: 0 1px 4px rgba(217, 119, 6, 0.06);
}`);

    css = css.replace(/\.hero-sidecar-badge i\s*\{[\s\S]*?\}/, `.hero-sidecar-badge i {
    color: #D97706;
    font-size: 0.72rem;
}`);

    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated compact badge CSS in:', file);
});
