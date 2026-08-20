const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

const startStr = 'const citiesData = [';
const endStr = 'function loadCityImages() { return; }';

const startIndex = js.indexOf(startStr);
const endIndex = js.indexOf(endStr);

if(startIndex !== -1 && endIndex !== -1) {
    const replacement = `const destinationsData = [
        { type: 'city', name: 'Coimbatore', icon: 'fa-city', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'The Manchester of South India, known for its textile industry and pleasant climate.', spots: ['Marudhamalai','Isha Yoga','Vydehi Falls'] },
        { type: 'route', from: 'Chennai', to: 'Coimbatore', dist: '500 km', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A premium journey across Tamil Nadu connecting two major industrial hubs.' },
        { type: 'city', name: 'Ooty', icon: 'fa-mountain', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Queen of Hill Stations, offering lush green landscapes and cool mountain air.', spots: ['Botanical Garden','Ooty Lake','Doddabetta'] },
        { type: 'route', from: 'Chennai', to: 'Ooty', dist: '90 km', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A beautiful uphill scenic drive through the Nilgiri mountains.' },
        { type: 'city', name: 'Rameshwaram', icon: 'fa-gopuram', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A sacred island town and pilgrimage center at the tip of the Indian peninsula.', spots: ['Ramanathaswamy','Dhanushkodi','Agni Theertham'] },
        { type: 'route', from: 'Chennai', to: 'Kochi', dist: '190 km', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A pleasant cross-state journey from Tamil Nadu to the backwaters of Kerala.' }
    ];

    const renderSliders = () => {
        const destWrapper = document.getElementById('destinations-swiper-wrapper');
        if (destWrapper) {
            destWrapper.innerHTML = destinationsData.map(item => {
                if (item.type === 'city') {
                    return \`
                        <div class="swiper-slide">
                            <div class="city-slide-card" style="overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                                <div style="position:relative; height:170px; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                                    <img src="\${item.image}" alt="\${item.name}" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1;">
                                    <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%);"></div>
                                    <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:800; font-size:1.05rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);">\${item.name}</div>
                                    <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.9); color:#fff; font-size:0.65rem; font-weight:700; padding:3px 9px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                        <i class="fa-solid \${item.icon}"></i>
                                    </div>
                                </div>
                                <div class="city-card-body">
                                    <p>\${item.desc}</p>
                                    <div class="popular-spots-title">Popular Spots</div>
                                    <div class="spots-container">
                                        \${item.spots.map(spot => \`<span class="spot-tag">\${spot}</span>\`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    \`;
                } else {
                    return \`
                        <div class="swiper-slide">
                            <div class="route-slide-card" style="overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                                <div style="position:relative; height:160px; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                                    <img src="\${item.image}" alt="\${item.from} to \${item.to}" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1;">
                                    <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%);"></div>
                                    <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:800; font-size:0.9rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);">\${item.from} <i class="fa-solid fa-arrow-right-long" style="margin:0 5px; font-size:0.8em; opacity:0.8;"></i> \${item.to}</div>
                                    <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.85); backdrop-filter:blur(4px); color:#fff; font-size:0.72rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid rgba(252,211,77,0.4);">\${item.dist}</div>
                                </div>
                                <div class="route-card-body">
                                    <div class="route-title" style="display:none;"></div>
                                    <a href="index.html#home" onclick="sessionStorage.setItem('prefillPickup', '\${item.from}'); sessionStorage.setItem('prefillDrop', '\${item.to}');" class="route-btn" data-from="\${item.from}" data-to="\${item.to}">Book Route</a>
                                    <p class="route-desc">\${item.desc}</p>
                                </div>
                            </div>
                        </div>
                    \`;
                }
            }).join('');
        }
    };

    renderSliders();

    setTimeout(() => {
        if(typeof Swiper !== 'undefined') {
            new Swiper('.destinationsSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: '.destinationsSwiper .swiper-button-next', prevEl: '.destinationsSwiper .swiper-button-prev' },
                pagination: { el: '.destinationsSwiper .swiper-pagination', clickable: true },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }
    }, 150);

`;
    js = js.substring(0, startIndex) + replacement + js.substring(endIndex);
    fs.writeFileSync('js/main.js', js);
}
