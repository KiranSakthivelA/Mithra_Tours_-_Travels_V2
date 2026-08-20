const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let servicesHtml = fs.readFileSync('services.html', 'utf8');

// 1. Delete the "Local Packages" table from index.html (lines 594-638)
const tableStart = indexHtml.indexOf('<!-- Transparent Pricing -->');
const tableEnd = indexHtml.indexOf('</section>', tableStart) + 10;
if (tableStart !== -1) {
    indexHtml = indexHtml.substring(0, tableStart) + indexHtml.substring(tableEnd);
    // clean up any double blank lines
    indexHtml = indexHtml.replace(/\n\s*\n\s*\n/g, '\n\n');
}

// 2. Extract "City Touring Packages" from index.html
const cityStart = indexHtml.indexOf('<!-- City Touring Packages -->');
const cityEnd = indexHtml.indexOf('</section>', cityStart) + 10;
const cityPackagesHtml = indexHtml.substring(cityStart, cityEnd);

// 3. Insert "City Touring Packages" into services.html right before "Wide Service Coverage"
const wideStart = servicesHtml.indexOf('<!-- Wide Service Coverage -->');
if (wideStart !== -1) {
    servicesHtml = servicesHtml.substring(0, wideStart) + cityPackagesHtml + '\n\n    ' + servicesHtml.substring(wideStart);
}

fs.writeFileSync('index.html', indexHtml);
fs.writeFileSync('services.html', servicesHtml);
console.log('Success');
