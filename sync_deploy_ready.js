const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Ensure deploy_ready is an exact, clean mirror of v2
const v2Dir = path.resolve(__dirname, 'v2');
const deployDir = path.resolve(__dirname, 'deploy_ready');

copyDirRecursive(v2Dir, deployDir);
console.log('Successfully synchronized v2 -> deploy_ready');
