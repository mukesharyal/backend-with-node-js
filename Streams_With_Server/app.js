import http from 'http';

import fs from 'fs/promises';

const fileHandle = await fs.open('./file.txt');

const readStream = fileHandle.createReadStream({
    highWaterMark: 1
});

readStream.setEncoding('utf-8');

const server = http.createServer(async (req, res) => {

    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('Content-Type', 'text/txt');

    readStream.on('data', (chunk) => {
        res.write(chunk);

        readStream.pause();

        setTimeout(() => {
            readStream.resume();
        }, 500);
    });

    readStream.on('end', () => {

        res.end();
    });
});

server.listen(3000, "localhost", () => {
    console.log("Server listening on port 3000.")
});