const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const artifactDir = 'C:\\Users\\kiran\\.gemini\\antigravity-ide\\brain\\8bf7ee16-14be-4276-9b0c-92611f49e668';
const assetsDir = path.join(__dirname, 'v2', 'Assets');

const files = [
    { src: path.join(artifactDir, 'flight_low_v7_1787400250584.jpg'), dst: path.join(assetsDir, 'swiggy_vec_airport.png') },
    { src: path.join(artifactDir, 'corp_v5_styled_1787399255257.jpg'), dst: path.join(assetsDir, 'swiggy_vec_corporate.png') },
    { src: path.join(artifactDir, 'final_outstation_white_1787398778329.jpg'), dst: path.join(assetsDir, 'swiggy_vec_outstation.png') }
];

async function removeWhiteBG(srcPath, dstPath) {
    const image = await Jimp.read(srcPath);
    const w = image.bitmap.width, h = image.bitmap.height;
    const d = image.bitmap.data;
    
    // Pass 1: Aggressive flood-fill from edges with LOW threshold (220)
    // This catches the shadow halos that were left before
    const visited = new Uint8Array(w * h);
    const queue = [];
    
    // Seed all edge pixels
    for (let x = 0; x < w; x++) { queue.push([x, 0]); queue.push([x, h - 1]); }
    for (let y = 0; y < h; y++) { queue.push([0, y]); queue.push([w - 1, y]); }
    
    const threshold = 220; // Much more aggressive - catches shadow halos
    
    while (queue.length > 0) {
        const [x, y] = queue.pop();
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const idx = y * w + x;
        if (visited[idx]) continue;
        
        const p = idx * 4;
        const r = d[p], g = d[p+1], b = d[p+2];
        
        // Check if pixel is light enough to be background/shadow halo
        if (r >= threshold && g >= threshold && b >= threshold) {
            visited[idx] = 1;
            d[p + 3] = 0; // Make transparent
            queue.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
            // Also push diagonal neighbors for smoother edges
            queue.push([x+1,y+1],[x-1,y-1],[x+1,y-1],[x-1,y+1]);
        }
    }
    
    // Pass 2: Clean up isolated small opaque patches (noise)
    // Any opaque pixel that has mostly transparent neighbors is likely residue
    const tempAlpha = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) tempAlpha[i] = d[i * 4 + 3];
    
    for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
            const idx = y * w + x;
            if (tempAlpha[idx] === 0) continue; // already transparent
            
            // Count transparent neighbors in 5x5 area
            let transCount = 0;
            let totalCount = 0;
            for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const ni = (y + dy) * w + (x + dx);
                    totalCount++;
                    if (tempAlpha[ni] === 0) transCount++;
                }
            }
            
            // If mostly surrounded by transparent pixels, remove it
            if (transCount > totalCount * 0.7) {
                d[idx * 4 + 3] = 0;
            }
        }
    }
    
    // Pass 3: Soften edges - semi-transparent for pixels at boundary
    const finalAlpha = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) finalAlpha[i] = d[i * 4 + 3];
    
    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (finalAlpha[idx] === 0) continue;
            
            // Count transparent immediate neighbors
            let tc = 0;
            if (finalAlpha[idx - 1] === 0) tc++;
            if (finalAlpha[idx + 1] === 0) tc++;
            if (finalAlpha[idx - w] === 0) tc++;
            if (finalAlpha[idx + w] === 0) tc++;
            
            if (tc > 0) {
                const r = d[idx*4], g = d[idx*4+1], b = d[idx*4+2];
                // Light edge pixels become semi-transparent
                if (r > 200 && g > 200 && b > 200) {
                    d[idx * 4 + 3] = Math.max(0, 255 - tc * 80);
                }
            }
        }
    }
    
    await image.writeAsync(dstPath);
    console.log('  ✓ ' + path.basename(dstPath));
}

(async () => {
    console.log('Removing backgrounds with aggressive cleanup...\n');
    for (const f of files) { await removeWhiteBG(f.src, f.dst); }
    
    // Sync to all directories
    for (const f of files) {
        const bn = path.basename(f.dst);
        if (fs.existsSync(path.join(__dirname, 'Assets'))) fs.copyFileSync(f.dst, path.join(__dirname, 'Assets', bn));
        if (fs.existsSync(path.join(__dirname, 'deploy_ready', 'Assets'))) fs.copyFileSync(f.dst, path.join(__dirname, 'deploy_ready', 'Assets', bn));
    }
    console.log('\n✅ All done - backgrounds properly removed!');
})();
