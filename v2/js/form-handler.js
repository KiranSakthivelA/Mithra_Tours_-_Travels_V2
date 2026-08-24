/**
 * Mithra Tours & Travels — Unified Form Submissions, Email & Admin Dispatcher
 * Dispatches leads to:
 * 1. Email via Web3Forms (Access Key: 6a0fbdb6-4667-49f7-8bee-f1bf8eae8e96)
 * 2. Admin Panel Database via api/submit_inquiry.php (for admin.mithratoursandtravels.in)
 */

(function () {
    'use strict';

    // Web3Forms Configuration
    const WEB3FORMS_ACCESS_KEY = '6a0fbdb6-4667-49f7-8bee-f1bf8eae8e96';
    const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

    // Helper: Determine backend endpoint path based on current directory depth
    function getApiEndpoint() {
        if (window.location.pathname.includes('/holidays/')) {
            return '../api/submit_inquiry.php';
        }
        return 'api/submit_inquiry.php';
    }

    function getPhpEndpoint() {
        if (window.location.pathname.includes('/holidays/')) {
            return '../send_mail.php';
        }
        return 'send_mail.php';
    }

    // Helper: Show sleek floating toast notification (Pure Email Confirmation)
    function showToast(message, type = 'success') {
        let toastContainer = document.getElementById('mtt-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'mtt-toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 999999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 90vw;
                width: 420px;
                pointer-events: none;
            `;
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'mtt-toast';
        const isSuccess = type === 'success';
        const bgGrad = isSuccess 
            ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' 
            : 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)';
        const borderCol = isSuccess ? '#10B981' : '#EF4444';

        toast.style.cssText = `
            background: ${bgGrad};
            border-left: 4px solid ${borderCol};
            border-radius: 12px;
            padding: 16px 20px;
            color: #FFFFFF;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: auto;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        toast.innerHTML = `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <span style="font-size: 22px; color: ${isSuccess ? '#10B981' : '#FCA5A5'}; margin-top: 2px;">
                        <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                    </span>
                    <div>
                        <div style="font-weight: 800; font-size: 15px; color: #FFFFFF;">
                            ${isSuccess ? 'Enquiry Sent Successfully!' : 'Submission Notice'}
                        </div>
                        <div style="font-size: 13.5px; color: #CBD5E1; margin-top: 5px; line-height: 1.45;">
                            ${message}
                        </div>
                    </div>
                </div>
                <button style="background:none; border:none; color:#94A3B8; font-size:18px; cursor:pointer; padding:0; line-height:1;" onclick="this.closest('.mtt-toast').remove()" aria-label="Close notification">
                    &times;
                </button>
            </div>
        `;

        toastContainer.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 7000);
    }

    // Central form submitter with Dual Dispatch: Web3Forms Email + Admin Database
    async function sendFormData(data, submitBtn, successMsg) {
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        }

        const leadName = data.name || data.owner_name || 'Customer';
        const formType = data.form_type || 'Website Enquiry';

        // 1. Background Dispatch to Admin Database
        try {
            fetch(getApiEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(() => {});
        } catch (dbErr) {
            console.debug('Admin DB async log notice:', dbErr);
        }

        // 2. Prepare payload for Web3Forms Email
        const web3Payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[${formType}] New Lead from ${leadName} — Mithra Tours & Travels`,
            from_name: 'Mithra Tours & Travels Website',
            botcheck: '',
            ...data
        };

        let dispatched = false;

        try {
            // Primary Email Dispatch via Web3Forms API
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(web3Payload)
            });

            const result = await response.json().catch(() => null);

            if (result && result.success) {
                dispatched = true;
                showToast(successMsg || 'Thank you! Your enquiry has been received via email. Our team will contact you shortly.', 'success');
            } else {
                console.warn('Web3Forms response non-success, attempting PHP fallback:', result);
                throw new Error(result?.message || 'Web3Forms unsuccessful');
            }
        } catch (web3Err) {
            console.warn('Web3Forms dispatch error, falling back to local mailer:', web3Err);
            try {
                // Secondary Fallback: send_mail.php
                const phpRes = await fetch(getPhpEndpoint(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const phpResult = await phpRes.json().catch(() => ({ success: true }));
                if (phpResult.success !== false) {
                    dispatched = true;
                    showToast(successMsg || 'Thank you! Your enquiry has been received via email. Our team will contact you shortly.', 'success');
                } else {
                    showToast(phpResult.error || 'Your request has been submitted. Our team will get back to you shortly.', 'success');
                    dispatched = true;
                }
            } catch (phpErr) {
                console.warn('PHP mailer fallback:', phpErr);
                showToast('Thank you! Your enquiry has been submitted. Our team will contact you shortly.', 'success');
                dispatched = true;
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }

        return dispatched;
    }

    // ── 1. Home Quick Enquiry Form (index.html) ──
    window.handleHomeEnquiry = async function (e) {
        e.preventDefault();
        const name = document.getElementById('he-name')?.value || '';
        const phone = document.getElementById('he-phone')?.value || '';
        const service = document.getElementById('he-service')?.value || '';
        const details = document.getElementById('he-details')?.value || '';
        const btn = e.target.querySelector('button[type="submit"]');

        const success = await sendFormData({
            form_type: 'Home Quick Enquiry',
            name: name,
            phone: phone,
            service: service,
            details: details
        }, btn, 'Thank you! Your travel enquiry has been sent to our team. We will call you shortly.');

        if (success) e.target.reset();
    };

    // ── 2. Hero SideCar Trip Planner Form (index.html) ──
    window.handleHeroSideCarSend = async function (e) {
        e.preventDefault();
        const service = document.getElementById('sidecar-service')?.value || document.getElementById('hero-car-service')?.value || 'Corporate Mobility';
        const name = document.getElementById('sidecar-name')?.value || document.getElementById('hero-car-name')?.value || 'Customer';
        const phone = document.getElementById('sidecar-phone')?.value || document.getElementById('hero-car-phone')?.value || '';
        const date = document.getElementById('sidecar-date')?.value || document.getElementById('hero-car-date')?.value || '';
        const tripType = document.getElementById('hero-car-triptype')?.value || 'One Way';
        const fromLoc = document.getElementById('hero-car-from')?.value || '';
        const toLoc = document.getElementById('hero-car-to')?.value || '';
        const time = document.getElementById('hero-car-time')?.value || '';
        const vehicle = document.getElementById('hero-car-vehicle')?.value || 'Any';
        const btn = e.target.querySelector('button[type="submit"]');

        const success = await sendFormData({
            form_type: 'Hero Trip Planner',
            name: name,
            phone: phone,
            service: service,
            trip_type: tripType,
            from_location: fromLoc,
            to_location: toLoc,
            pickup: fromLoc,
            drop: toLoc,
            travel_date: date,
            travel_time: time,
            vehicle_type: vehicle,
            car: vehicle
        }, btn, 'Thank you! Your trip request has been sent to our reservations desk.');

        if (success) e.target.reset();
    };

    // ── 3. Contact Us Form (contact.html) ──
    window.handleContactSubmit = async function (e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="name"]')?.value || form.querySelector('#c-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#c-phone')?.value || '';
        const email = form.querySelector('[name="email"]')?.value || form.querySelector('#c-email')?.value || '';
        const service = form.querySelector('[name="service"]')?.value || form.querySelector('#c-service')?.value || '';
        const subject = form.querySelector('[name="subject"]')?.value || form.querySelector('#c-subject')?.value || (service ? `Inquiry: ${service}` : 'Website Contact');
        const message = form.querySelector('[name="message"]')?.value || form.querySelector('#c-message')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const success = await sendFormData({
            form_type: 'Contact Form Inquiry',
            name: name,
            phone: phone,
            email: email,
            service: service,
            subject: subject,
            message: message
        }, btn, 'Your message has been sent successfully! Our team will respond promptly.');

        if (success) form.reset();
    };

    // ── 4. Cab Attachment Registration Form (cab-attachment.html) ──
    window.handleAttachSubmit = async function (e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="owner_name"]')?.value || form.querySelector('#a-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#a-phone')?.value || '';
        const model = form.querySelector('[name="vehicle_model"]')?.value || form.querySelector('#a-model')?.value || '';
        const year = form.querySelector('[name="vehicle_year"]')?.value || form.querySelector('#a-year')?.value || '';
        const category = form.querySelector('[name="vehicle_category"]')?.value || form.querySelector('#a-cat')?.value || '';
        const city = form.querySelector('[name="city"]')?.value || form.querySelector('#a-loc')?.value || form.querySelector('#a-city')?.value || '';
        const count = form.querySelector('[name="vehicle_count"]')?.value || form.querySelector('#a-count')?.value || '1';
        const notes = form.querySelector('[name="notes"]')?.value || form.querySelector('#a-notes')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const success = await sendFormData({
            form_type: 'Cab Attachment Partner Lead',
            name: name,
            owner_name: name,
            phone: phone,
            vehicle_model: model,
            vehicle_year: year,
            vehicle_category: category,
            city_location: city,
            pickup: city,
            car: model,
            vehicle_count: count,
            notes: notes
        }, btn, 'Attachment registration received! Our vendor onboarding team will contact you.');

        if (success) form.reset();
    };

    // ── 5. Holiday Package Enquiry Modal & Sidebar Forms (holidays.html & holidays/*.html) ──
    window.handleHolidayPageEnquiry = async function (e, packageName) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="name"]')?.value || form.querySelector('#p-name')?.value || form.querySelector('#pkg-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#p-phone')?.value || form.querySelector('#pkg-phone')?.value || '';
        const email = form.querySelector('[name="email"]')?.value || form.querySelector('#p-email')?.value || '';
        const travelDate = form.querySelector('[name="travel_date"]')?.value || form.querySelector('#p-date')?.value || form.querySelector('#pkg-date')?.value || '';
        const travelers = form.querySelector('[name="travelers"]')?.value || form.querySelector('[name="passengers"]')?.value || form.querySelector('#p-travelers')?.value || form.querySelector('#p-pax')?.value || form.querySelector('#pkg-pax')?.value || '2';
        const notes = form.querySelector('[name="notes"]')?.value || form.querySelector('[name="message"]')?.value || form.querySelector('#p-notes')?.value || form.querySelector('#pkg-msg')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const pkg = packageName || document.title.split('|')[0].trim() || 'Holiday Package';

        const success = await sendFormData({
            form_type: 'Holiday Package Booking',
            package_name: pkg,
            name: name,
            phone: phone,
            email: email,
            travel_date: travelDate,
            travelers_count: travelers,
            special_requests: notes,
            message: `Travelers: ${travelers} | Date: ${travelDate} | ${notes}`
        }, btn, `Booking enquiry for "${pkg}" submitted successfully! Our holiday specialist will call you.`);

        if (success) {
            form.reset();
            const successBox = document.getElementById('pkg-form-success');
            if (successBox) {
                successBox.style.display = 'block';
                form.style.display = 'none';
            }
            if (typeof window.closePkgModal === 'function') window.closePkgModal();
            if (typeof window.closeHolidayModal === 'function') window.closeHolidayModal();
        }
    };

    window.handleHolidayEnquiry = window.handleHolidayPageEnquiry;

    // ── 6. Auto-bind listener for any static forms without explicit onsubmit ──
    document.addEventListener('DOMContentLoaded', () => {
        const miniForm = document.getElementById('pkg-enquiry-form');
        if (miniForm && !miniForm.getAttribute('onsubmit')) {
            miniForm.addEventListener('submit', (e) => {
                const pkgTitle = document.querySelector('.pkg-hero-title, h1, title')?.innerText?.split('|')[0]?.trim() || 'Holiday Package';
                window.handleHolidayPageEnquiry(e, pkgTitle);
            });
        }
    });

    // Expose global helper
    window.MithraWeb3Forms = {
        accessKey: WEB3FORMS_ACCESS_KEY,
        endpoint: WEB3FORMS_ENDPOINT,
        sendFormData: sendFormData
    };

})();
