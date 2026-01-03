const http = require('node:http');
const { getFileContents, getContentType } = require('./common-helper');
const PORT = 5555;
const myServer = http.createServer(async (req, res) => {
    if (req.url === '/' || req.url.includes('index')) {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else if (req.url.includes('css')) {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else if (req.url.includes('img')) {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else if (req.url.includes('data')) {
        let data = await getFileContents(req.url);
        data = JSON.parse(data);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(JSON.stringify(data));
    }
    else if (req.url.includes('old-page')) {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else if (req.url.includes('new-page')) {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else if (req.url === '/js/counter-script.js') {
        const data = await getFileContents(req.url);
        res.writeHead(200, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
    else {
        const data = await getFileContents('/404')
        res.writeHead(404, {
            "content-type": getContentType(req.url)
        }).end(data);
    }
});

myServer.listen(PORT, () => { console.log(`Common Core Module Server is Listening -> http://localhost:${PORT}`) });