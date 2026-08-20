const fs = require('fs');
const path = require('path');

const formCss = `
/* ═══════════════════════════════════════════════════════════
   GLOBAL FORM CONTROLS & SPACING SYSTEM
   ═══════════════════════════════════════════════════════════ */
.form-group {
    margin-bottom: 1.35rem;
    display: flex;
    flex-direction: column;
}

.form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1.35rem;
}

.form-label {
    display: block;
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: #64748B;
    margin-bottom: 0.45rem;
}

.form-control {
    width: 100%;
    padding: 0.85rem 1.15rem;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.94rem;
    font-weight: 600;
    color: #0F172A;
    outline: none;
    transition: all 0.25s ease;
    box-sizing: border-box;
}

.form-control:focus {
    background: #FFFFFF;
    border-color: #D97706;
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.12);
}

select.form-control {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.4rem;
}

textarea.form-control {
    resize: vertical;
    min-height: 95px;
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*GLOBAL FORM CONTROLS[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, formCss.trim() + '\n\n');
    } else {
        css += '\n\n' + formCss.trim() + '\n';
    }

    fs.writeFileSync(file, css, 'utf8');
    console.log('Applied global form controls CSS to:', file);
});
