/**
 * Mithra Tours & Travels — Global Luxury Custom Dropdown & Date Picker System
 * Replaces standard browser select and date elements with custom luxury UI matching the hero dock design.
 */
(function () {
    function getIconForOption(text) {
        const t = (text || '').toLowerCase();
        if (t.includes('corporate') || t.includes('employee') || t.includes('9+')) return 'fa-solid fa-building';
        if (t.includes('airport') || t.includes('drop') || t.includes('pickup')) return 'fa-solid fa-plane-arrival';
        if (t.includes('flight')) return 'fa-solid fa-plane';
        if (t.includes('outstation') || t.includes('intercity') || t.includes('route')) return 'fa-solid fa-route';
        if (t.includes('family') || t.includes('3 - 4') || t.includes('3-4')) return 'fa-solid fa-people-roof';
        if (t.includes('business')) return 'fa-solid fa-briefcase';
        if (t.includes('domestic') || t.includes('kodaikanal') || t.includes('ooty') || t.includes('kerala') || t.includes('rajasthan') || t.includes('tawang')) return 'fa-solid fa-map-location-dot';
        if (t.includes('international') || t.includes('singapore') || t.includes('vietnam') || t.includes('dubai') || t.includes('bali')) return 'fa-solid fa-earth-asia';
        if (t.includes('train') || t.includes('rail')) return 'fa-solid fa-train';
        if (t.includes('cruise') || t.includes('ocean')) return 'fa-solid fa-ship';
        if (t.includes('visa') || t.includes('passport')) return 'fa-solid fa-passport';
        if (t.includes('sedan') || t.includes('dzire') || t.includes('city') || t.includes('verna')) return 'fa-solid fa-car';
        if (t.includes('suv') || t.includes('ertiga') || t.includes('carens')) return 'fa-solid fa-truck-pickup';
        if (t.includes('innova') || t.includes('fortuner')) return 'fa-solid fa-car-side';
        if (t.includes('traveller') || t.includes('urbania')) return 'fa-solid fa-van-shuttle';
        if (t.includes('coach') || t.includes('bus')) return 'fa-solid fa-bus-simple';
        if (t.includes('1 - 2') || t.includes('1-2') || t.includes('solo') || t.includes('couple') || t.includes('2 persons')) return 'fa-solid fa-user-group';
        if (t.includes('5 - 8') || t.includes('5-8') || t.includes('5 - 7') || t.includes('small group') || t.includes('group')) return 'fa-solid fa-users';
        if (t.includes('8+') || t.includes('8+ group')) return 'fa-solid fa-bus-simple';
        return 'fa-solid fa-circle-check';
    }

    function formatDateDisplay(val) {
        if (!val) return 'Select Date';
        try {
            const parts = val.split('-');
            if (parts.length === 3) {
                const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                if (!isNaN(d.getTime())) {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
                }
            }
        } catch (e) {}
        return val;
    }

    function initCustomDropdowns() {
        // 1. Initialize Custom Select Dropdowns
        const selects = document.querySelectorAll('select.form-control, select.pkg-form-input, select[name="passengers"]');

        selects.forEach(select => {
            if (select.dataset.customInit === 'true') return;
            select.dataset.customInit = 'true';

            // Hide the native select while keeping it in the form DOM for value access
            select.style.display = 'none';

            const dropdown = document.createElement('div');
            dropdown.className = 'custom-dropdown form-dropdown';

            const btn = document.createElement('div');
            btn.className = 'custom-dropdown-btn';

            const selectedValSpan = document.createElement('span');
            selectedValSpan.className = 'selected-val';

            const activeOption = select.options[select.selectedIndex] || select.options[0];
            const activeText = activeOption ? activeOption.text : 'Select Option';
            const activeIcon = getIconForOption(activeText);

            selectedValSpan.innerHTML = `<i class="${activeIcon}" style="color:#D97706; width:16px; text-align:center;"></i> <span class="val-txt">${activeText}</span>`;

            const chevron = document.createElement('i');
            chevron.className = 'fa-solid fa-chevron-down dropdown-chevron';

            btn.appendChild(selectedValSpan);
            btn.appendChild(chevron);
            dropdown.appendChild(btn);

            const menu = document.createElement('div');
            menu.className = 'custom-dropdown-menu';

            Array.from(select.options).forEach((opt, idx) => {
                const item = document.createElement('div');
                item.className = 'custom-dropdown-item' + (idx === select.selectedIndex ? ' active' : '');
                item.dataset.val = opt.value || opt.text;

                const iconClass = getIconForOption(opt.text);
                item.innerHTML = `<i class="${iconClass}"></i> <span>${opt.text}</span>`;

                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.selectedIndex = idx;
                    select.value = opt.value || opt.text;

                    selectedValSpan.innerHTML = `<i class="${iconClass}" style="color:#D97706; width:16px; text-align:center;"></i> <span class="val-txt">${opt.text}</span>`;

                    menu.querySelectorAll('.custom-dropdown-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');

                    dropdown.classList.remove('open');

                    // Dispatch change event on select
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                });

                menu.appendChild(item);
            });

            dropdown.appendChild(menu);

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('open');
                document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
                if (!isOpen) {
                    dropdown.classList.add('open');
                }
            });

            select.parentNode.insertBefore(dropdown, select.nextSibling);

            // Sync from native select change
            select.addEventListener('change', () => {
                const opt = select.options[select.selectedIndex];
                if (!opt) return;
                const iconClass = getIconForOption(opt.text);
                selectedValSpan.innerHTML = `<i class="${iconClass}" style="color:#D97706; width:16px; text-align:center;"></i> <span class="val-txt">${opt.text}</span>`;
                menu.querySelectorAll('.custom-dropdown-item').forEach((it, idx) => {
                    if (idx === select.selectedIndex) it.classList.add('active');
                    else it.classList.remove('active');
                });
            });
        });

        // 2. Initialize Custom Date Pickers
        const dateInputs = document.querySelectorAll('input[type="date"]:not(.custom-date-input-overlay)');

        dateInputs.forEach(dateInput => {
            if (dateInput.dataset.customDateInit === 'true') return;
            dateInput.dataset.customDateInit = 'true';

            const wrapper = document.createElement('div');
            wrapper.className = 'custom-date-field form-date-field';

            const display = document.createElement('div');
            display.className = 'custom-date-display';
            
            const currentFormatted = formatDateDisplay(dateInput.value);
            display.innerHTML = `<i class="fa-solid fa-calendar-days"></i> <span class="date-txt">${currentFormatted}</span>`;

            // Insert wrapper before input
            dateInput.parentNode.insertBefore(wrapper, dateInput);

            // Transform input into invisible overlay
            dateInput.classList.add('custom-date-input-overlay');
            
            wrapper.appendChild(display);
            wrapper.appendChild(dateInput);

            wrapper.addEventListener('click', () => {
                try {
                    if (typeof dateInput.showPicker === 'function') {
                        dateInput.showPicker();
                    } else {
                        dateInput.focus();
                    }
                } catch (err) {}
            });

            dateInput.addEventListener('change', () => {
                const formatted = formatDateDisplay(dateInput.value);
                display.innerHTML = `<i class="fa-solid fa-calendar-days"></i> <span class="date-txt">${formatted}</span>`;
            });
        });
    }

    // Global outside click listener to close dropdowns
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomDropdowns);
    } else {
        initCustomDropdowns();
    }

    window.initCustomDropdowns = initCustomDropdowns;
})();
