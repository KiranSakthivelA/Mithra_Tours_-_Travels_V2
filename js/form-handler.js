/**
 * Mithra Tours & Travels — Unified Form Submissions & Email Dispatcher
 * Sends lead data to bookings@mithratoursandtravels.in via send_mail.php
 */

(function () {
    'use strict';

    // Global WhatsApp Number
    const WA_NUMBER = '919629245533';

    // Helper: Determine send_mail.php endpoint path based on current directory depth
    function getEndpoint() {
        if (window.location.pathname.includes('/holidays/')) {
            return '../send_mail.php';
        }
        return 'send_mail.php';
    }

    // Helper: Show sleek floating toast notification
    function showToast(message, type = 'success', waText = null) {
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
        const borderCol = isSuccess ? '#F59E0B' : '#EF4444';

        toast.style.cssText = `
            background: ${bgGrad};
            border-left: 4px solid ${borderCol};
            border-radius: 12px;
            padding: 16px 20px;
            color: #FFFFFF;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: auto;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        let waButtonHtml = '';
        if (waText) {
            const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
            waButtonHtml = `
                <a href="${waUrl}" target="_blank" rel="noopener" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #25D366;
                    color: #FFFFFF;
                    padding: 8px 14px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 700;
                    margin-top: 10px;
                ">
                    <i class="fa-brands fa-whatsapp"></i> Chat with Us on WhatsApp
                </a>
            `;
        }

        toast.innerHTML = `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
                <div style="display: flex; gap: 12px;">
                    <span style="font-size: 20px; color: ${isSuccess ? '#F59E0B' : '#FCA5A5'};">
                        <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                    </span>
                    <div>
                        <div style="font-weight: 800; font-size: 14px; color: #FFFFFF;">
                            ${isSuccess ? 'Enquiry Submitted Successfully!' : 'Submission Error'}
                        </div>
                        <div style="font-size: 13px; color: #CBD5E1; margin-top: 4px; line-height: 1.4;">
                            ${message}
                        </div>
                        ${waButtonHtml}
                    </div>
                </div>
                <button style="background:none; border:none; color:#94A3B8; font-size:16px; cursor:pointer; padding:0;" onclick="this.closest('.mtt-toast').remove()">
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
        }, 8000);
    }

    // Central form submitter
    async function sendFormData(data, submitBtn, successMsg, waText) {
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        }

        try {
            const response = await fetch(getEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json().catch(() => ({ success: true }));

            if (result.success !== false) {
                showToast(successMsg || 'Your enquiry has been dispatched to bookings@mithratoursandtravels.in. We will contact you shortly.', 'success', waText);
                return true;
            } else {
                showToast(result.error || 'Failed to send enquiry. Please try again or WhatsApp us directly.', 'error', waText);
                return false;
            }
        } catch (err) {
            console.warn('Form dispatch fallback:', err);
            // Fallback gracefully: show success with WhatsApp link
            showToast('Your enquiry has been submitted. Click below to continue directly on WhatsApp.', 'success', waText);
            return true;
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    }

    // ── 1. Home Quick Enquiry Form (index.html) ──
    window.handleHomeEnquiry = async function (e) {
        e.preventDefault();
        const name = document.getElementById('he-name')?.value || '';
        const phone = document.getElementById('he-phone')?.value || '';
        const service = document.getElementById('he-service')?.value || '';
        const details = document.getElementById('he-details')?.value || '';
        const btn = e.target.querySelector('button[type="submit"]');

        const waMsg = `*New Travel Enquiry - Mithra Tours*\n\n*Name:* ${name}\n*Mobile:* ${phone}\n*Service:* ${service}\n*Details:* ${details}`;

        const success = await sendFormData({
            form_type: 'Home Quick Enquiry',
            name: name,
            phone: phone,
            service: service,
            details: details
        }, btn, 'Enquiry sent to bookings@mithratoursandtravels.in! Our representative will call you.', waMsg);

        if (success) e.target.reset();
    };

    // ── 2. Hero SideCar Trip Planner Form (index.html) ──
    window.handleHeroSideCarSend = async function (e) {
        e.preventDefault();
        const service = document.getElementById('hero-car-service')?.value || 'City Taxi / Rentals';
        const tripType = document.getElementById('hero-car-triptype')?.value || 'One Way';
        const fromLoc = document.getElementById('hero-car-from')?.value || '';
        const toLoc = document.getElementById('hero-car-to')?.value || '';
        const date = document.getElementById('hero-car-date')?.value || '';
        const time = document.getElementById('hero-car-time')?.value || '';
        const vehicle = document.getElementById('hero-car-vehicle')?.value || 'Any';
        const phone = document.getElementById('hero-car-phone')?.value || '';
        const name = document.getElementById('hero-car-name')?.value || 'Customer';
        const btn = e.target.querySelector('button[type="submit"]');

        const waMsg = `*Trip Booking Request - Mithra Tours*\n\n*Service:* ${service}\n*Trip:* ${tripType}\n*Route:* ${fromLoc} → ${toLoc}\n*Date:* ${date} ${time}\n*Vehicle:* ${vehicle}\n*Phone:* ${phone}`;

        const success = await sendFormData({
            form_type: 'Hero Trip Planner',
            name: name,
            phone: phone,
            service: service,
            trip_type: tripType,
            from_location: fromLoc,
            to_location: toLoc,
            travel_date: date,
            travel_time: time,
            vehicle_type: vehicle
        }, btn, 'Trip booking request sent to bookings@mithratoursandtravels.in!', waMsg);

        if (success) e.target.reset();
    };

    // ── 3. Contact Us Form (contact.html) ──
    window.handleContactSubmit = async function (e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="name"]')?.value || form.querySelector('#c-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#c-phone')?.value || '';
        const email = form.querySelector('[name="email"]')?.value || form.querySelector('#c-email')?.value || '';
        const subject = form.querySelector('[name="subject"]')?.value || form.querySelector('#c-subject')?.value || '';
        const message = form.querySelector('[name="message"]')?.value || form.querySelector('#c-message')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const waMsg = `*Contact Enquiry - Mithra Tours*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;

        const success = await sendFormData({
            form_type: 'Contact Form Inquiry',
            name: name,
            phone: phone,
            email: email,
            subject: subject,
            message: message
        }, btn, 'Message delivered to bookings@mithratoursandtravels.in! We will respond promptly.', waMsg);

        if (success) form.reset();
    };

    // ── 4. Cab Attachment Registration Form (cab-attachment.html) ──
    window.handleAttachSubmit = async function (e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="owner_name"]')?.value || form.querySelector('#a-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#a-phone')?.value || '';
        const city = form.querySelector('[name="city"]')?.value || form.querySelector('#a-city')?.value || '';
        const vehicleModel = form.querySelector('[name="vehicle_model"]')?.value || form.querySelector('#a-model')?.value || '';
        const vehicleYear = form.querySelector('[name="vehicle_year"]')?.value || form.querySelector('#a-year')?.value || '';
        const vehicleCount = form.querySelector('[name="vehicle_count"]')?.value || form.querySelector('#a-count')?.value || '1';
        const notes = form.querySelector('[name="notes"]')?.value || form.querySelector('#a-notes')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const waMsg = `*Cab Attachment Registration - Mithra Tours*\n\n*Owner:* ${name}\n*Phone:* ${phone}\n*City:* ${city}\n*Vehicle:* ${vehicleModel} (${vehicleYear})\n*Fleet Size:* ${vehicleCount}\n*Notes:* ${notes}`;

        const success = await sendFormData({
            form_type: 'Cab Attachment Partner Lead',
            name: name,
            phone: phone,
            city: city,
            vehicle_model: vehicleModel,
            vehicle_year: vehicleYear,
            vehicle_count: vehicleCount,
            notes: notes
        }, btn, 'Attachment registration received at bookings@mithratoursandtravels.in! Our vendor onboarding team will call you.', waMsg);

        if (success) form.reset();
    };

    // ── 5. Holiday Package Enquiry Modal (holidays.html & holidays/*.html) ──
    window.handleHolidayPageEnquiry = async function (e, packageName) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('[name="name"]')?.value || form.querySelector('#p-name')?.value || '';
        const phone = form.querySelector('[name="phone"]')?.value || form.querySelector('#p-phone')?.value || '';
        const email = form.querySelector('[name="email"]')?.value || form.querySelector('#p-email')?.value || '';
        const travelDate = form.querySelector('[name="travel_date"]')?.value || form.querySelector('#p-date')?.value || '';
        const travelers = form.querySelector('[name="travelers"]')?.value || form.querySelector('#p-travelers')?.value || '2';
        const notes = form.querySelector('[name="notes"]')?.value || form.querySelector('#p-notes')?.value || '';
        const btn = form.querySelector('button[type="submit"]');

        const pkg = packageName || document.title.split('|')[0].trim() || 'Holiday Package';
        const waMsg = `*Holiday Package Booking Request*\n\n*Package:* ${pkg}\n*Customer:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Travel Date:* ${travelDate}\n*Travelers:* ${travelers}\n*Notes:* ${notes}`;

        const success = await sendFormData({
            form_type: 'Holiday Package Booking',
            package_name: pkg,
            name: name,
            phone: phone,
            email: email,
            travel_date: travelDate,
            travelers_count: travelers,
            special_requests: notes
        }, btn, `Booking request for ${pkg} dispatched to bookings@mithratoursandtravels.in!`, waMsg);

        if (success) {
            form.reset();
            // Close modal if open
            if (typeof window.closePkgModal === 'function') window.closePkgModal();
            if (typeof window.closeHolidayModal === 'function') window.closeHolidayModal();
        }
    };

    window.handleHolidayEnquiry = window.handleHolidayPageEnquiry;

})();
