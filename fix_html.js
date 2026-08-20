const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change the dark card to light
html = html.replace('background: linear-gradient(145deg, #1f1a17 0%, #0d0a08 100%); border-radius: 24px; padding: 3rem 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); color: #fff; position: relative; overflow: hidden;', 'background: #ffffff; border-radius: 24px; padding: 3rem 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.04); border: 1px solid rgba(232, 160, 32, 0.1); color: #1f2937; position: relative; overflow: hidden;');

// Update colors inside the card
html = html.replace('<h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 10px;">', '<h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 10px;">');

html = html.replace(/<strong style="display: block; font-size: 1.1rem; margin-bottom: 0.3rem; color: #f3f4f6;">/g, '<strong style="display: block; font-size: 1.1rem; margin-bottom: 0.3rem; color: #374151;">');

html = html.replace(/<span style="color: #9ca3af; font-size: 0.95rem; line-height: 1.6;">/g, '<span style="color: #6b7280; font-size: 0.95rem; line-height: 1.6;">');

// 2. Fix the Services 4-box layout
// Currently it is likely: grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
// Let's find it.
const servicesStart = html.indexOf('<div class="services-grid');
if (servicesStart !== -1) {
    const nextBracket = html.indexOf('>', servicesStart);
    let servicesDiv = html.substring(servicesStart, nextBracket + 1);
    
    // We can inject a style directly if it's using a class, or modify CSS.
    // Let's modify the brand.css instead.
}
fs.writeFileSync('index.html', html);
console.log('index.html updated');
