import fs from 'fs';

console.time();

const buffer = Buffer.allocUnsafe(2 * 1024 * 1024);

const fd = fs.openSync('./file.txt', 'w');

let offset = 0;
for(let i = 1; i <= 100000; i++) {
    offset += buffer.write(`${i}, `, offset);
}

fs.writeSync(fd, buffer, 0, offset);

console.timeEnd();