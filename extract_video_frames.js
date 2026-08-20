const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; }
    video { max-width: 100vw; max-height: 100vh; }
  </style>
</head>
<body>
  <video id="vid" src="file://${path.resolve('ref_video.mp4').replace(/\\/g, '/')}" muted playsinline></video>
</body>
</html>
`;

fs.writeFileSync('video_player.html', htmlContent);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('file:///' + path.resolve('video_player.html').replace(/\\/g, '/'), { waitUntil: 'load' });

  // Get video duration
  const duration = await page.evaluate(async () => {
    const vid = document.getElementById('vid');
    await new Promise(r => {
      if (vid.readyState >= 1) return r();
      vid.onloadedmetadata = () => r();
    });
    return vid.duration;
  });

  console.log('Video duration:', duration);
  const framesDir = path.resolve('video_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

  // Capture frames every 1.5 seconds or across key parts
  const steps = Math.min(10, Math.max(4, Math.floor(duration)));
  for (let i = 0; i <= steps; i++) {
    const time = (i / steps) * (duration - 0.2);
    await page.evaluate(async (t) => {
      const vid = document.getElementById('vid');
      vid.currentTime = t;
      await new Promise(r => {
        vid.onseeked = () => r();
      });
    }, time);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(framesDir, `frame_${i}_${time.toFixed(1)}s.png`) });
    console.log(`Saved frame at ${time.toFixed(1)}s`);
  }

  await browser.close();
  console.log('Finished capturing frames.');
})();
