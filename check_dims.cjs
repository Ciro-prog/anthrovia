const fs = require('fs');
const path = require('path');

function getDims(file) {
    const buffer = fs.readFileSync(file);
    // Very basic JPEG dimension parser
    let i = 0;
    while (i < buffer.length) {
        const marker = buffer.readUInt16BE(i);
        i += 2;
        if (marker === 0xFFC0 || marker === 0xFFC2) {
            const height = buffer.readUInt16BE(i + 3);
            const width = buffer.readUInt16BE(i + 5);
            return { width, height };
        }
        i += buffer.readUInt16BE(i);
    }
    return null;
}

const files = ['hero-1.jpeg', 'hero-2.jpeg'];
files.forEach(f => {
    try {
        const dims = getDims(path.join(process.cwd(), f));
        console.log(`${f}: ${dims ? dims.width + 'x' + dims.height : 'unknown'}`);
    } catch (e) {
        console.log(`${f}: error ${e.message}`);
    }
});
