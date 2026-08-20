const fs = require('fs');
const path = require('path');

const universalFooter = `<footer class="footer-white">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col brand-col">
                <a href="index.html" class="footer-logo">
                    <img src="Assets/Site_Logo.png" alt="Mithra Tours & Travels Logo" width="140" height="42">
                </a>
                <p>
                    Mithra Tours & Travels — Journeys That Connect. Premier corporate mobility, outstation cabs, and holiday packages from Kilpauk Garden, Chennai.
                </p>
                <div class="social-icons-row">
                    <a href="#" class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://wa.me/919629245533" class="social-btn" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="#" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>

            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="corporate.html">Corporate Cabs</a></li>
                    <li><a href="our-fleet.html">Our Fleet</a></li>
                    <li><a href="holidays.html">Holiday Packages</a></li>
                    <li><a href="cab-attachment.html">Cab Attachment</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Services</h4>
                <ul>
                    <li><a href="corporate.html">Employee Shuttles</a></li>
                    <li><a href="corporate.html">Airport Transfers</a></li>
                    <li><a href="our-fleet.html">Innova Crysta</a></li>
                    <li><a href="our-fleet.html">Tempo Traveller</a></li>
                    <li><a href="holidays.html#additional">Visa & Flights</a></li>
                </ul>
            </div>

            <div class="footer-col">
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
            </div>

            <div class="footer-col footer-map-col">
                <h4>Office Location</h4>
                <div class="footer-map-wrap">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.294697926888!2d80.23386627584102!3d13.08053671249767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e10ba8f89b%3A0x8eaf73f558d386f4!2sno.46%2C%20Mithra%20tours%20and%20travels%2C%202a%2C%202nd%20floor%2C%20Old%2C%20New%2C%20Canal%20Rd%2C%20Kilpauk%20Garden%2C%20Chennai%2C%20Tamil%20Nadu%20600010!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mithra Tours Kilpauk Office Location"></iframe>
                    <a href="https://maps.app.goo.gl/4frzLNoAzemMx8vy8?g_st=aw" target="_blank" rel="noopener" class="footer-map-link">
                        <i class="fa-solid fa-location-arrow"></i> Open in Google Maps
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom-row">
            <div>
                © 2026 Mithra Tours & Travels. All rights reserved.
            </div>
            <div class="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="contact.html">Support</a>
            </div>
        </div>
    </div>
</footer>`;

const allDirs = ['v2', '.', 'deploy_ready'];
const htmlFiles = [
    'index.html',
    'about.html',
    'corporate.html',
    'our-fleet.html',
    'holidays.html',
    'cab-attachment.html',
    'contact.html'
];

allDirs.forEach(dir => {
    htmlFiles.forEach(name => {
        const file = path.resolve(__dirname, dir, name);
        if (!fs.existsSync(file)) return;
        let html = fs.readFileSync(file, 'utf8');

        const footerRegex = /<footer[\s\S]*?<\/footer>/;
        if (footerRegex.test(html)) {
            html = html.replace(footerRegex, universalFooter);
            fs.writeFileSync(file, html, 'utf8');
            console.log(`Updated universal footer (Site_Logo.png + 2026) in: ${dir}/${name}`);
        }
    });
});
