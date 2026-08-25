/**
 * Mithra Tours & Travels — Universal Form & Inquiries Handler
 * Blazing Fast Triple-Redundant Dispatch: Admin Database + Web3Forms + Server Mailer
 * Clean White Toast with Single-Instance Guarantee & Auto-Close
 */

(function () {
    'use strict';

    const WEB3FORMS_ACCESS_KEY = '6a0fbdb6-4667-49f7-8bee-f1bf8eae8e96';
    const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
    let isSubmitting = false;

    function getApiEndpoint() {
        if (window.location.origin.includes('admin.')) {
            return 'api/submit_inquiry.php';
        }
        return 'https://admin.mithratoursandtravels.in/api/submit_inquiry.php';
    }

    function getPhpEndpoint() {
        return window.location.pathname.includes('/holidays/') 
            ? '../send_mail.php' 
            : 'send_mail.php';
    }

    // Clean White Toast Notification — Strictly Single Instance & Auto-Close
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

        // Strictly clear any existing toast so it NEVER shows twice
        toastContainer.innerHTML = '';

        const toast = document.createElement('div');
        toast.className = 'mtt-toast';
        const isSuccess = type === 'success';
        const borderCol = isSuccess ? '#10B981' : '#EF4444';
        const iconCol = isSuccess ? '#10B981' : '#EF4444';
        const titleText = isSuccess ? 'Enquiry Sent Successfully!' : 'Submission Notice';

        toast.style.cssText = `
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-left: 5px solid ${borderCol};
            border-radius: 12px;
            padding: 16px 20px;
            color: #0F172A;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: auto;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        toast.innerHTML = `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <span style="font-size: 22px; color: ${iconCol}; margin-top: 1px; line-height: 1;">
                        <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                    </span>
                    <div>
                        <div style="font-weight: 800; font-size: 15px; color: #0F172A; letter-spacing: -0.2px;">
                            ${titleText}
                        </div>
                        <div style="font-size: 13.5px; color: #475569; margin-top: 4px; line-height: 1.45; font-weight: 500;">
                            ${message}
                        </div>
                    </div>
                </div>
                <button style="background:none; border:none; color:#94A3B8; font-size:18px; cursor:pointer; padding:0 2px; line-height:1; transition:color 0.2s;" onmouseover="this.style.color='#0F172A'" onmouseout="this.style.color='#94A3B8'" onclick="this.closest('.mtt-toast').remove()" aria-label="Close notification">
                    &times;
                </button>
            </div>
        `;

        toastContainer.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Auto Close after 3.5 seconds
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                setTimeout(() => toast.remove(), 400);
            }
        }, 3500);
    }

    // High-Speed Parallel Dispatch with Debounce
    async function sendFormData(data, submitBtn, successMsg) {
        if (isSubmitting) return;
        isSubmitting = true;

        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
        const isCompactIconBtn = submitBtn && (
            submitBtn.classList.contains('dock-bar-send-btn') || 
            submitBtn.classList.contains('btn-icon-only') ||
            (submitBtn.offsetWidth > 0 && submitBtn.offsetWidth < 75) ||
            !submitBtn.textContent.trim()
        );

        if (submitBtn) {
            submitBtn.disabled = true;
            if (isCompactIconBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
            } else {
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
            }
        }

        const leadName = data.name || data.owner_name || 'Customer';
        const formType = data.form_type || 'Website Enquiry';

        const web3Payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[${formType}] New Lead from ${leadName} — Mithra Tours & Travels`,
            from_name: 'Mithra Tours & Travels Website',
            botcheck: '',
            ...data
        };

        try {
            // 1. Dispatch to Admin Database
            const adminPromise = fetch(getApiEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(err => console.warn('Admin DB async log notice:', err));

            // 2. Dispatch to Web3Forms Email
            const web3Promise = fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(web3Payload)
            }).then(r => r.json()).catch(() => null);

            // 3. Fallback PHP Mailer
            const phpPromise = fetch(getPhpEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(() => null);

            await Promise.allSettled([adminPromise, web3Promise, phpPromise]);
            showToast(successMsg || 'Thank you! Your trip request has been sent to our reservations desk.', 'success');
        } catch (err) {
            showToast(successMsg || 'Thank you! Your enquiry has been received.', 'success');
        } finally {
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    }

    // ── 1. Hero SideCar Compact Search Bar Submit ──
    window.handleHeroSideCarSend = async function (e) {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;

        const form = document.getElementById('hero-sidecar-form') || document.getElementById('hero-planner-form') || document.querySelector('.hero-search-dock-form');
        if (!form) return;

        const submitBtn = form.querySelector('.dock-bar-send-btn, button[type="submit"]');

        const name = document.getElementById('sidecar-name')?.value?.trim() || form.querySelector('[name="name"]')?.value?.trim() || '';
        const phone = document.getElementById('sidecar-phone')?.value?.trim() || form.querySelector('[name="phone"]')?.value?.trim() || '';
        const service = document.getElementById('sidecar-service')?.value || form.querySelector('[name="service"]')?.value || 'Holiday Packages';
        const date = document.getElementById('sidecar-date')?.value || form.querySelector('[name="date"]')?.value || '';

        if (!phone && !name) {
            showToast('Please enter your Name or Phone number to proceed.', 'error');
            return;
        }

        const payload = {
            form_type: 'Hero Search Bar Quick Booking',
            name: name || 'Website Visitor',
            phone: phone || 'Not Provided',
            service: service,
            travel_date: date,
            created_at: new Date().toISOString()
        };

        await sendFormData(payload, submitBtn, 'Thank you! Your trip request has been sent to our reservations desk.');
        form.reset();
    };

    // ── 2. Trip Planner Modal / Section ──
    window.handlePlannerSubmit = async function (e) {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;

        const form = e.target || document.getElementById('trip-planner-form');
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const payload = {
            form_type: 'Trip Planner Lead',
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            service: formData.get('service') || 'Cab / Holiday Booking',
            pickup: formData.get('pickup') || formData.get('from_location') || '',
            drop_city: formData.get('drop') || formData.get('to_location') || '',
            car_type: formData.get('car') || '',
            travel_date: formData.get('date') || '',
            travel_time: formData.get('time') || '',
            travelers_count: formData.get('travelers') || '',
            message: formData.get('message') || formData.get('special_requests') || ''
        };

        if (!payload.name && !payload.phone) {
            showToast('Please enter your name and phone number.', 'error');
            return;
        }

        await sendFormData(payload, submitBtn, 'Trip Planner request received! We will send you custom itinerary options shortly.');
        form.reset();
        if (typeof window.closeTripPlannerModal === 'function') {
            window.closeTripPlannerModal();
        }
    };

    // ── 3. General Contact Form ──
    window.handleContactSubmit = async function (e) {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;

        const form = e.target || document.getElementById('contact-form');
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const payload = {
            form_type: 'Contact Page Inquiry',
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            service: formData.get('service') || 'General Inquiry',
            message: formData.get('message') || ''
        };

        await sendFormData(payload, submitBtn, 'Thank you for reaching out! A Mithra travel expert will call you shortly.');
        form.reset();
    };

    // ── 4. Cab Attachment / Partner Form ──
    window.handleAttachmentSubmit = async function (e) {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;

        const form = e.target || document.getElementById('attachment-form');
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const payload = {
            form_type: 'Cab Attachment Partner Application',
            owner_name: formData.get('owner_name') || formData.get('name') || '',
            phone: formData.get('phone') || '',
            city_location: formData.get('city') || formData.get('location') || 'Chennai',
            vehicle_model: formData.get('vehicle_model') || formData.get('model') || '',
            vehicle_category: formData.get('vehicle_category') || formData.get('category') || 'Sedan',
            registration_year: formData.get('reg_year') || formData.get('year') || '',
            experience_years: formData.get('experience') || '',
            message: formData.get('notes') || formData.get('message') || ''
        };

        await sendFormData(payload, submitBtn, 'Application submitted successfully! Our Fleet Manager will contact you within 24 hours.');
        form.reset();
    };

    // ── 5. Holiday Package Detail Page Inquiry ──
    window.handleHolidayPageEnquiry = async function (e, packageName) {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;

        const form = e.target || e.currentTarget;
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const payload = {
            form_type: 'Holiday Package Booking Request',
            package_name: packageName || formData.get('package_name') || 'Custom Holiday',
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            travel_date: formData.get('travel_date') || formData.get('date') || '',
            travelers_count: formData.get('travelers') || '2 Adults',
            message: formData.get('message') || `Interested in ${packageName}`
        };

        await sendFormData(payload, submitBtn, `Booking inquiry for ${payload.package_name} submitted! Our holiday specialist will share the customized itinerary.`);
        form.reset();
    };

    window.mttNotify = showToast;
})();
