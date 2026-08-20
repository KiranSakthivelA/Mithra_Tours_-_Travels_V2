const fs = require('fs');
const path = require('path');

const cleanWhiteVisionCss = `
/* Vision Card (Clean Pure White) */
.premium-vm-card.vision-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);
}

.premium-vm-card.vision-card:hover {
    border-color: #FDE68A;
    box-shadow: 0 25px 50px -10px rgba(217, 119, 6, 0.14);
}
`;

const cleanPillsCss = `
/* Vision Commitments Pills */
.vision-commitments {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid #F1F5F9;
}

.vision-pill {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    padding: 0.55rem 1.1rem;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #1E293B;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s ease;
}

.vision-pill:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    color: #D97706;
}

.vision-pill i {
    color: #D97706;
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    // Replace Vision Card background
    css = css.replace(
        /\/\* Vision Card \(Warm Gold Gradient\) \*\/[\s\S]*?\.premium-vm-card\.vision-card:hover\s*\{\s*box-shadow:[^}]*\}\s*/,
        cleanWhiteVisionCss.trim() + '\n\n'
    );

    // Replace Vision Commitments Pills
    css = css.replace(
        /\/\* Vision Commitments Pills \*\/[\s\S]*?\.vision-pill\s*\{\s*background:[^}]*\}\s*/,
        cleanPillsCss.trim() + '\n\n'
    );

    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated clean white vision card in:', file);
});
