const fsPromises = require("node:fs/promises");
const path = require("node:path");
const PUBLIC_FOLDER_NAME = 'public'

const getContentType = (reqPath) => {
    const { ext } = path.parse(reqPath);
    // console.log(ext);
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

const getFileContents = async (reqPath) => {
    // console.log(path.parse(reqPath));
    const { dir, base, ext } = path.parse(reqPath);
    // console.log(ext, base);
    if (!ext || ext === '.html') {
        // console.log("html")
        return await fsPromises.readFile(path.join(__dirname,PUBLIC_FOLDER_NAME , 'views', dir, base === '' ? 'index.html' : base + (`${!ext ? '.html' : ''}`)));
    }
    else {
        return await fsPromises.readFile(path.join(__dirname, ext!=='.json' ? PUBLIC_FOLDER_NAME : '', dir, base));
    }

}

module.exports = {PUBLIC_FOLDER_NAME, getContentType, getFileContents}
