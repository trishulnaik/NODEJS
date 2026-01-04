const http = require('node:http');
const fs = require('node:fs');
const fsPromises = fs.promises;
const { getContentType, getFilePathWithExt } = require('./common-helper');
const PORT = 5555;

const myServer = http.createServer(async (req, res) => {
    const { filePath, ext } = getFilePathWithExt(req.url);
    try {
        if (fs.existsSync(filePath) && !filePath.includes('404.html')) {
            const data = await fsPromises.readFile(filePath);
            res.writeHead(200, {
                "content-type": getContentType(req.url)
            }).end(ext === '.json' ? JSON.stringify(JSON.parse(data)) : data);
        }
        else {
            const data = await fsPromises.readFile(getFilePathWithExt('/404').filePath);
            res.writeHead(404, {
                "content-type": getContentType(req.url)
            }).end(data);
        }
    } catch {
        res.writeHead(501, {
            "content-type": "text/plain"
        }).end("Internal Server Error");
    }
});

myServer.listen(PORT, () => { console.log(`Common Core Module Server is Listening -> http://localhost:${PORT}`) });