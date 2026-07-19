// We read from the file in our child process
import fs from 'fs';

const readStream = fs.createReadStream('./input.txt', {
    highWaterMark: 4
});

// We have the stdout write stream in our child process to write the data into it. We can use the pipe method for this
readStream.pipe(process.stdout);