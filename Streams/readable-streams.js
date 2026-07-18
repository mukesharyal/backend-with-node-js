// Similar to how we could get a buffer by reading a file using the fs module, we can also get the file as a stream
import fs from 'fs';

const fileSize = fs.statSync('./copied-file').size;
const chunkSize = 10 * 1024 * 1024;
const factorPercentage = (chunkSize / fileSize) * 100;
let progressPercentage = 0;

// The default value for the chunk size is 64 KiB, but we can modify it by passing an options object while creating the read stream, and giving the value to the highWaterMark property
const fileStream = fs.createReadStream('./copied-file', {
    highWaterMark: chunkSize
});

// The createReadStream method returns an event emitter, and it will emit an event called 'data' when some data has been loaded onto it
// The data inside the callback function is commonly called chunk, and is received as either a string or a buffer
fileStream.on('data', (chunkBuffer) => {

    console.log(chunkBuffer);

    fs.appendFileSync('./copied-copied-file', chunkBuffer);

    progressPercentage += factorPercentage;

    //console.log(`Progress: ${progressPercentage}`)
});



// States of readable streams
// There are 4 states of a readable stream. They are:
// 1. Initial state: This is the state when the stream has just been created and not a single chunk has still been completely added to the stream.

// 2. Flowing state: The stream is said to be in flowing state after the first 'data' event on the stream has been fired, and there are still more chunks to be added to the stream.

// 3. Paused state: The stream is paused when we pause the stream.

// 4. End state: When all the chunks have been read by the reader, the stream is said to be in the end state.