const express = require('express');
const path = require('node:path');
const fsPromises = require("node:fs/promises");
const { getFilePathWithExt, PUBLIC_FOLDER_NAME } = require('./common-helper');
const myServer = express();
const PORT = 5556;

myServer.get('/data/data.json', async (req, res) => {
    const { filePath } = getFilePathWithExt(req.url)
    let data = await fsPromises.readFile(filePath);
    res.json(JSON.parse(data));
})

// middleware to server static files
myServer.use(express.static(PUBLIC_FOLDER_NAME));


const viewsPath = path.join(__dirname, PUBLIC_FOLDER_NAME, 'views');
try {
    myServer.get(['/', '/index.html', '/index'], (req, res) => {
        res.sendFile(path.join(viewsPath, 'index.html'));
    })
    myServer.get(['/old-page', '/old-page.html'], (req, res) => {
        res.sendFile(path.join(viewsPath, 'old-page.html'));
    })
    myServer.get(['/subDirectory/new-page', '/subDirectory/new-page.html'], (req, res) => {
        res.sendFile(path.join(viewsPath, 'subDirectory', 'new-page.html'));
    })
    myServer.get('/*splat', (req, res) => {
        res.status(404).sendFile(path.join(viewsPath, '404.html'));
    })
} catch {
    myServer.use((req, res) => {
        res.status(501).send('Internal Server Error');
    })
}

myServer.listen(PORT, () => { console.log(`Express Server is Listening -> http://localhost:${PORT}`) });