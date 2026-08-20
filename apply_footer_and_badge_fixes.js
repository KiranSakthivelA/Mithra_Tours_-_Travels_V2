const fs = require('fs');
const path = require('path');

// 1. Footer contact CSS for brand.css
const footerContactCss = `
/* ═══════════════════════════════════════════════════════════
   FOOTER CONTACT INFO ALIGNMENT
   ═══════════════════════════════════════════════════════════ */
.footer-contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.footer-contact-list li {
    margin: 0 !important;
}

.footer-contact-list li a,
.footer-contact-list li div.footer-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    color: var(--text-body, #64748B);
    font-size: 0.88rem;
    line-height: 1.5;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-contact-list li a:hover {
    color: var(--gold-4, #D97706);
}

.footer-contact-list .footer-icon {
    color: var(--gold-4, #D97706);
    font-size: 0.95rem;
    margin-top: 3px;
    flex-shrink: 0;
    width: 16px;
    text-align: center;
}
`;

// Append/update in brand.css
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*FOOTER CONTACT INFO ALIGNMENT[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, footerContactCss.trim());
    } else {
        css += '\n\n' + footerContactCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated footer contact CSS in:', file);
});

// 2. Uniform Footer Contact HTML
const cleanFooterContactBlock = `            <div class="footer-col">
                <h4>Contact Info</h4>
                <ul class="footer-contact-list">
                    <li>
                        <a href="tel:+919629245533">
                            <i class="fa-solid fa-phone footer-icon"></i>
                            <span>+91 96292 45533</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:bookings@mithratoursandtravels.in">
                            <i class="fa-solid fa-calendar-check footer-icon"></i>
                            <span>bookings@mithratoursandtravels.in</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:contact@mithratoursandtravels.in">
                            <i class="fa-solid fa-envelope footer-icon"></i>
                            <span>contact@mithratoursandtravels.in</span>
                        </a>
                    </li>
                    <li>
                        <a href="contact.html">
                            <i class="fa-solid fa-location-dot footer-icon"></i>
                            <span>No.46, 2A, 2nd Floor, Canal Rd, Kilpauk Garden, Chennai 600010</span>
                        </a>
                    </li>
                </ul>
            </div>`;

const allHtmlDirs = ['v2', '.', 'deploy_ready'];
const htmlFileNames = [
    'index.html',
    'about.html',
    'corporate.html',
    'our-fleet.html',
    'holidays.html',
    'cab-attachment.html',
    'contact.html'
];

allHtmlDirs.forEach(dir => {
    htmlFileNames.forEach(name => {
        const file = path.resolve(__dirname, dir, name);
        if (!fs.existsSync(file)) return;
        let html = fs.readFileSync(file, 'utf8');

        // Replace footer contact col
        const footerContactRegex = /<div class="footer-col">\s*<h4>Contact Info<\/h4>[\s\S]*?<\/div>\s*(?=<div class="footer-col footer-map-col">)/;
        if (footerContactRegex.test(html)) {
            html = html.replace(footerContactRegex, cleanFooterContactBlock + '\n\n');
        }

        // If index.html, remove floating badge from About Us section
        if (name === 'index.html') {
            const badgeRegex = /<div class="story-badge-float">[\s\S]*?<\/div>\s*<\/div>/;
            if (badgeRegex.test(html)) {
                html = html.replace(badgeRegex, '</div>');
                console.log('Removed story-badge-float from:', file);
            }
        }

        // If contact.html, add bookings@mithratoursandtravels.in to contact cards
        if (name === 'contact.html') {
            const mailCardRegex = /<!-- Mail -->[\s\S]*?<\/div>\s*<\/div>/;
            const updatedMailCards = `<!-- Bookings Mail -->
                    <div class="contact-item-row">
                        <div class="contact-item-icon" style="background:#FEF3C7; border-color:rgba(245,158,11,0.25); color:#D97706;"><i class="fa-solid fa-calendar-check"></i></div>
                        <div>
                            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Bookings & Reservations</span>
                            <a href="mailto:bookings@mithratoursandtravels.in" style="display:block; font-size:0.95rem; font-weight:700; color:var(--text-heading);">bookings@mithratoursandtravels.in</a>
                        </div>
                    </div>

                    <!-- General Enquiry Mail -->
                    <div class="contact-item-row">
                        <div class="contact-item-icon" style="background:#EEF2FF; border-color:rgba(99,102,241,0.25); color:#4F46E5;"><i class="fa-solid fa-envelope"></i></div>
                        <div>
                            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">General Enquiries</span>
                            <a href="mailto:contact@mithratoursandtravels.in" style="display:block; font-size:0.95rem; font-weight:700; color:var(--text-heading);">contact@mithratoursandtravels.in</a>
                        </div>
                    </div>`;
            if (mailCardRegex.test(html)) {
                html = html.replace(mailCardRegex, updatedMailCards);
                console.log('Updated contact.html with bookings email card in:', file);
            }
        }

        fs.writeFileSync(file, html, 'utf8');
        console.log(`Updated footer contact info in: ${dir}/${name}`);
    });
});
