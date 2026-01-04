const path = require("node:path");
const PUBLIC_FOLDER_NAME = 'public'

const getContentType = (reqPath) => {
    const { ext } = path.parse(reqPath);
    switch (ext) {
        case '.webp' || '.png' || '.gif':
            return `img/${ext}`;
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.js' || '.mjs':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}

const getFilePathWithExt = (reqPath) => {
    const { dir, base, ext } = path.parse(reqPath);
    const filePath = path.join(__dirname, ext !== '.json' ? PUBLIC_FOLDER_NAME : '', (!ext || ext === '.html') ? 'views' : '', dir, base === '' ? 'index.html' : base + (`${!ext ? '.html' : ''}`));
    return { filePath, ext: path.parse(filePath).ext };
}


module.exports = { PUBLIC_FOLDER_NAME, getContentType, getFilePathWithExt }
