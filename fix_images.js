const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

const replacement = `const citiesData = [
    { name: 'Chennai',    icon: 'fa-building', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', desc: 'The cultural capital of South India, famous for its Marina beach and historic temples.', spots: ['Marina Beach','Kapaleeshwarar','Fort St. George'] },
    { name: 'Ooty',       icon: 'fa-mountain', image: 'https://images.unsplash.com/photo-1589123053646-4c4c23c52865?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Queen of Hill Stations, offering lush green landscapes and cool mountain air.', spots: ['Botanical Garden','Ooty Lake','Doddabetta'] },
    { name: 'Kodaikanal', icon: 'fa-tree',     image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A misty hill station known for its star-shaped lake and serene atmosphere.', spots: ['Kodai Lake','Coaker\\'s Walk','Pillar Rocks'] },
    { name: 'Madurai',    icon: 'fa-gopuram',  image: 'https://images.unsplash.com/photo-1616038242814-a6eac7847c21?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Athens of the East, home to the magnificent Meenakshi Amman Temple.', spots: ['Meenakshi Temple','Thirumalai Nayakkar','Gandhi Museum'] },
    { name: 'Rameshwaram',icon: 'fa-om',       image: 'https://images.unsplash.com/photo-1623055403061-0d3a5165dc54?auto=format&fit=crop&q=80&w=600&h=400', desc: 'A sacred island town and pilgrimage center at the tip of the Indian peninsula.', spots: ['Ramanathaswamy','Dhanushkodi','Agni Theertham'] },
    { name: 'Coimbatore', icon: 'fa-industry', image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=600&h=400', desc: 'The Manchester of South India, known for its textile industry and pleasant climate.', spots: ['Marudhamalai','Isha Yoga','Vydehi Falls'] }
];

const routesData = [
    { from: 'Chennai', to: 'Bangalore',  dist: '360 km', desc: 'A comfortable interstate journey connecting the textile city to the IT capital.', image: 'https://images.unsplash.com/photo-1522093537031-3ee91e98a72f?auto=format&fit=crop&q=80&w=600&h=400' },
    { from: 'Chennai', to: 'Coimbatore', dist: '500 km', desc: 'A premium journey across Tamil Nadu connecting two major industrial hubs.', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600&h=400' },
    { from: 'Chennai', to: 'Ooty',       dist: '90 km',  desc: 'A beautiful uphill scenic drive through the Nilgiri mountains.', image: 'https://images.unsplash.com/photo-1555562095-200742f89c4a?auto=format&fit=crop&q=80&w=600&h=400' },
    { from: 'Chennai', to: 'Kochi',      dist: '190 km', desc: 'A pleasant cross-state journey from Tamil Nadu to the backwaters of Kerala.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600&h=400' },
    { from: 'Coimbatore', to: 'Kodaikanal', dist: '175 km', desc: 'Through mist-covered mountains to the soul-soothing \\'Princess of Hill Stations\\'.', image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&q=80&w=600&h=400' }
];`;

const startStr = 'const citiesData = [';
const endStr = 'const renderSliders = () => {';
const s1 = js.indexOf(startStr);
const s2 = js.indexOf(endStr);

if (s1 !== -1 && s2 !== -1) {
    js = js.substring(0, s1) + replacement + '\n\n    ' + js.substring(s2);
    fs.writeFileSync('js/main.js', js);
    console.log('Images fixed');
} else {
    console.log('Could not find strings');
}
