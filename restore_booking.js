const fs = require('fs');
function walkDir(dir, callback) {
    try {
        fs.readdirSync(dir).forEach( f => {
            let dirPath = dir + '/' + f;
            let isDirectory = fs.statSync(dirPath).isDirectory();
            if (isDirectory) {
                walkDir(dirPath, callback);
            } else {
                callback(dirPath);
            }
        });
    } catch(e) {}
}
let found = false;
walkDir('C:/Users/kiran/.gemini/antigravity-ide/brain', function(filePath) {
    if (found) return;
    if (filePath.endsWith('transcript.jsonl')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let lines = content.split('\n');
        for (let line of lines) {
            if (line.includes('js/booking.js') && line.includes('VIEW_FILE')) {
                try {
                    let obj = JSON.parse(line);
                    if (obj.content && obj.content.includes('const VEHICLES = [')) {
                        let fileLines = obj.content.split('\n');
                        let originalCode = [];
                        for (let fLine of fileLines) {
                            if (fLine.match(/^\d+:/)) {
                                originalCode.push(fLine.replace(/^\d+:\s?/, '').replace(/\r$/, ''));
                            }
                        }
                        if (originalCode.length > 50) {
                            fs.writeFileSync('js/booking.original.js', originalCode.join('\n'));
                            console.log('Restored original booking.js! length: ' + originalCode.length);
                            found = true;
                            return;
                        }
                    }
                } catch(e) {}
            }
        }
    }
});
if (!found) console.log('Could not find original js/booking.js in transcripts');
