const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

const startStr = 'const destinationsData = [';
const endStr = 'function loadCityImages() { return; }';

const startIndex = js.indexOf(startStr);
const endIndex = js.indexOf(endStr);

if(startIndex !== -1 && endIndex !== -1) {
    const replacement = `const citiesData = [
        { name: 'Chennai',    icon: 'fa-building', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'The cultural capital of South India, famous for its Marina beach and historic temples.', spots: ['Marina Beach','Kapaleeshwarar','Fort St. George'] },
        { name: 'Ooty',       icon: 'fa-mountain', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Queen of Hill Stations, offering lush green landscapes and cool mountain air.', spots: ['Botanical Garden','Ooty Lake','Doddabetta'] },
        { name: 'Kodaikanal', icon: 'fa-tree',     image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A misty hill station known for its star-shaped lake and serene atmosphere.', spots: ['Kodai Lake','Coaker\\'s Walk','Pillar Rocks'] },
        { name: 'Madurai',    icon: 'fa-gopuram',  image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Athens of the East, home to the magnificent Meenakshi Amman Temple.', spots: ['Meenakshi Temple','Thirumalai Nayakkar','Gandhi Museum'] },
        { name: 'Rameshwaram',icon: 'fa-om',       image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A sacred island town and pilgrimage center at the tip of the Indian peninsula.', spots: ['Ramanathaswamy','Dhanushkodi','Agni Theertham'] },
        { name: 'Coimbatore', icon: 'fa-industry', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'The Manchester of South India, known for its textile industry and pleasant climate.', spots: ['Marudhamalai','Isha Yoga','Vydehi Falls'] }
    ];

    const routesData = [
        { from: 'Chennai', to: 'Bangalore',  dist: '360 km', desc: 'A comfortable interstate journey connecting the textile city to the IT capital.', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400' },
        { from: 'Chennai', to: 'Coimbatore', dist: '500 km', desc: 'A premium journey across Tamil Nadu connecting two major industrial hubs.', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400' },
        { from: 'Chennai', to: 'Ooty',       dist: '90 km',  desc: 'A beautiful uphill scenic drive through the Nilgiri mountains.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600&h=400' },
        { from: 'Chennai', to: 'Kochi',      dist: '190 km', desc: 'A pleasant cross-state journey from Tamil Nadu to the backwaters of Kerala.', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400' },
        { from: 'Coimbatore', to: 'Kodaikanal', dist: '175 km', desc: 'Through mist-covered mountains to the soul-soothing \\'Princess of Hill Stations\\'.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600&h=400' }
    ];

    const renderSliders = () => {
        const cityWrapper = document.getElementById('cities-swiper-wrapper');
        const routeWrapper = document.getElementById('routes-swiper-wrapper');

        if (cityWrapper) {
            cityWrapper.innerHTML = citiesData.map(city => \`
                <div class="swiper-slide">
                    <div class="city-slide-card" style="overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                        <div style="position:relative; height:170px; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                            <img src="\${city.image}" alt="\${city.name}" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1;">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%);"></div>
                            <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:800; font-size:1.05rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);">\${city.name}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.9); color:#fff; font-size:0.65rem; font-weight:700; padding:3px 9px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px;">
                                <i class="fa-solid \${city.icon}"></i>
                            </div>
                        </div>
                        <div class="city-card-body">
                            <p>\${city.desc}</p>
                            <div class="popular-spots-title">Popular Spots</div>
                            <div class="spots-container">
                                \${city.spots.map(spot => \`<span class="spot-tag">\${spot}</span>\`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            \`).join('');
        }


        if (routeWrapper) {
            routeWrapper.innerHTML = routesData.map(route => \`
                <div class="swiper-slide">
                    <div class="route-slide-card" style="overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                        <div style="position:relative; height:160px; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                            <img src="\${route.image}" alt="\${route.from} to \${route.to}" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1;">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%);"></div>
                            <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:800; font-size:0.9rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);">\${route.from} <i class="fa-solid fa-arrow-right-long" style="margin:0 5px; font-size:0.8em; opacity:0.8;"></i> \${route.to}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.85); backdrop-filter:blur(4px); color:#fff; font-size:0.72rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid rgba(252,211,77,0.4);">\${route.dist}</div>
                        </div>
                        <div class="route-card-body">
                            <div class="route-title" style="display:none;"></div>
                            <a href="index.html#home" onclick="sessionStorage.setItem('prefillPickup', '\${route.from}'); sessionStorage.setItem('prefillDrop', '\${route.to}');" class="route-btn" data-from="\${route.from}" data-to="\${route.to}">Book Route</a>
                            <p class="route-desc">\${route.desc}</p>
                        </div>
                    </div>
                </div>
            \`).join('');
        }
    };

    renderSliders();

    setTimeout(() => {
        if(typeof Swiper !== 'undefined') {
            new Swiper('.citiesSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: '.citiesSwiper .swiper-button-next', prevEl: '.citiesSwiper .swiper-button-prev' },
                pagination: { el: '.citiesSwiper .swiper-pagination', clickable: true },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
            new Swiper('.routesSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: { delay: 3500, disableOnInteraction: false },
                navigation: { nextEl: '.routesSwiper .swiper-button-next', prevEl: '.routesSwiper .swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }
    }, 150);

`;
    js = js.substring(0, startIndex) + replacement + js.substring(endIndex);
    fs.writeFileSync('js/main.js', js);
}
