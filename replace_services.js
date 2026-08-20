const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const servicesHtml = fs.readFileSync('services.html', 'utf8');

// Extract How We Serve You
const startServe = indexHtml.indexOf('<!-- Services Overview -->');
const endServe = indexHtml.indexOf('</section>', startServe) + 10;
const howWeServeHtml = indexHtml.substring(startServe, endServe);

// Extract Why Choose Us / Pricing & Features
const startWhyUs = indexHtml.indexOf('<!-- Why Choose Us / Pricing & Features -->');
const endWhyUs = indexHtml.indexOf('</section>', startWhyUs) + 10;
const whyUsHtml = indexHtml.substring(startWhyUs, endWhyUs);

// Replace in services.html
// 1. Replace Services Grid
let newServices = servicesHtml;
const svStart = servicesHtml.indexOf('<!-- Services Grid -->');
const svEnd = servicesHtml.indexOf('</section>', svStart) + 10;
newServices = newServices.substring(0, svStart) + howWeServeHtml + newServices.substring(svEnd);

// 2. Replace Transparent Pricing (only the outstation table, keep the local packages table)
const prStart = newServices.indexOf('<!-- Transparent Pricing -->');
// Insert whyUsHtml before Transparent Pricing
newServices = newServices.substring(0, prStart) + whyUsHtml + '\n\n' + newServices.substring(prStart);

// Now remove the first pricing-table-wrap (Outstation Pricing) inside Transparent Pricing
// But first re-find prStart because length changed
const newPrStart = newServices.indexOf('<!-- Transparent Pricing -->');
const tableWrap1Start = newServices.indexOf('<div class="pricing-table-wrap">', newPrStart);
const tableWrap1End = newServices.indexOf('</div>', newServices.indexOf('</table>', tableWrap1Start)) + 6;
newServices = newServices.substring(0, tableWrap1Start) + newServices.substring(tableWrap1End);

// Change the Transparent Pricing section header to focus on Local Packages
newServices = newServices.replace(
    '<h2><i class="fa-solid fa-tags" style="color:var(--mtt-amber);"></i> Transparent Pricing</h2>', 
    '<h2><i class="fa-solid fa-tags" style="color:var(--mtt-amber);"></i> Local Packages</h2>'
);
newServices = newServices.replace(
    '<p>We believe in complete transparency. No surprises, no haggling.</p>', 
    '<p>Affordable city rentals for all your local needs.</p>'
);

fs.writeFileSync('services.html', newServices);
console.log('Success');
