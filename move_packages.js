const fs = require('fs');

let servicesHtml = fs.readFileSync('services.html', 'utf8');
let indexHtml = fs.readFileSync('index.html', 'utf8');

const prStart = servicesHtml.indexOf('<!-- Transparent Pricing -->');
const prEnd = servicesHtml.indexOf('</section>', prStart) + 10;
const localPackageHtml = servicesHtml.substring(prStart, prEnd);

servicesHtml = servicesHtml.substring(0, prStart) + servicesHtml.substring(prEnd);
fs.writeFileSync('services.html', servicesHtml);

const insertIndex = indexHtml.indexOf('<!-- Journey Planner / Contact Section -->');
indexHtml = indexHtml.substring(0, insertIndex) + localPackageHtml + '\n\n    ' + indexHtml.substring(insertIndex);
fs.writeFileSync('index.html', indexHtml);

console.log('Done');
