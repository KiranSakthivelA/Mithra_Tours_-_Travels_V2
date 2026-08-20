const fs = require('fs');
const path = require('path');

const seamlessNavbarCss = `
/* ── NAVBAR (Seamless with Hero at top, Sticky Frosted White on Scroll) ── */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.85);
    box-shadow: 0 4px 25px -4px rgba(0, 0, 0, 0.07);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: height 0.3s ease;
}

.navbar.scrolled .nav-container {
    height: 68px;
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    // Replace Navbar block
    css = css.replace(
        /\/\* ── NAVBAR[\s\S]*?\.nav-container\s*\{[\s\S]*?justify-content:\s*space-between;\s*\}/,
        seamlessNavbarCss.trim()
    );

    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated seamless navbar CSS in:', file);
});
