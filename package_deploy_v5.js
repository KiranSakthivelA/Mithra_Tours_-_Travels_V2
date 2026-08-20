const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname);
const deployDir = path.join(workspaceRoot, 'deploy_ready');
const zipFile = path.join(workspaceRoot, 'mtt_deploy_v5.zip');

// Clean any old preview zip inside deploy_ready
const oldZip = path.join(deployDir, 'v2_preview_deploy.zip');
if (fs.existsSync(oldZip)) fs.unlinkSync(oldZip);

console.log('Syncing all updated files from v2 into deploy_ready...');

// Copy HTML files from v2 into deploy_ready and root
const htmlFiles = [
    'index.html',
    'about.html',
    'corporate.html',
    'our-fleet.html',
    'holidays.html',
    'cab-attachment.html',
    'contact.html'
];

htmlFiles.forEach(f => {
    const srcV2 = path.join(workspaceRoot, 'v2', f);
    const destDeploy = path.join(deployDir, f);
    const destRoot = path.join(workspaceRoot, f);

    if (fs.existsSync(srcV2)) {
        fs.copyFileSync(srcV2, destDeploy);
        fs.copyFileSync(srcV2, destRoot);
        console.log(`Synced ${f}`);
    }
});

// Sync Assets folder
console.log('Syncing Assets folder...');
const assetsSrc = path.join(workspaceRoot, 'Assets');
const assetsDeploy = path.join(deployDir, 'Assets');
if (!fs.existsSync(assetsDeploy)) fs.mkdirSync(assetsDeploy, { recursive: true });

fs.readdirSync(assetsSrc).forEach(file => {
    const srcFile = path.join(assetsSrc, file);
    const destFile = path.join(assetsDeploy, file);
    if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
    }
});

// Sync CSS and JS
console.log('Syncing CSS and JS...');
['css', 'js', 'data', 'admin', 'holidays'].forEach(dir => {
    const src = path.join(workspaceRoot, 'v2', dir);
    const dest = path.join(deployDir, dir);
    if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true, force: true });
    }
});

// Also ensure root css & js are updated
fs.cpSync(path.join(workspaceRoot, 'v2', 'css'), path.join(workspaceRoot, 'css'), { recursive: true, force: true });
fs.cpSync(path.join(workspaceRoot, 'v2', 'js'), path.join(workspaceRoot, 'js'), { recursive: true, force: true });

console.log('Creating mtt_deploy_v5.zip archive...');
if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);

// PowerShell Compress-Archive
const psCommand = `powershell -Command "Compress-Archive -Path '${deployDir}\\*' -DestinationPath '${zipFile}' -Force"`;
execSync(psCommand, { stdio: 'inherit' });

const stats = fs.statSync(zipFile);
console.log(`Successfully generated mtt_deploy_v5.zip (${(stats.size / 1024 / 1024).toFixed(2)} MB)!`);
