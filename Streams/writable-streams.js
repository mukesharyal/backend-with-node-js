// Similar to how we'd create a readable stream to read contents of a file, we can also create a writable stream to write contents to the file
import fs from 'fs';
import { pipeline } from 'stream';

const readStream = fs.createReadStream('./file.txt', {
    highWaterMark: 4
});

const writeStream = fs.createWriteStream('./file2.txt', {
    highWaterMark: 4
});

// When we do writeStream.write, first of all, the data to be written is loaded onto the internal buffer of the writable stream and it writes the data
// However, if the internal buffer is full, the writable stream still continues to accept more and more data by storing it somewhere else. This is known as backpressure where the stream's internal buffer is full and yet more data is incoming. In this case, the data is stored somewhere in Node's internal buffers, but it increases the memory usage of the process. Therefore, we need to check whether backpressure is applied or not before sending more data. That ensures that we aren't making Node's internal buffers store a lot of data, and therefore, the memory footprint of the process stays low
// When we use the write function on the writable stream, it returns a boolean stating whether the internal buffer has more space or not. So, when it returns false, then the process should temporarily halt sending more data to the writable stream, and only continue it when the 'drain' event is fired on the writable stream. It means that the stream has finally drained, and thus new data can be accepted by it.

// When the readStream gets the data on its internal buffer, we write the data into the internal buffer of the write stream. Now, we check whether backpressure is being applied, and if it is being applied, then we pause our reading procedure because reading the data won't be much useful when it can't be written
readStream.on('data', (chunkBuffer) => {

    if(!writeStream.write(chunkBuffer))
    {
        readStream.pause();
        console.log("The read stream has been paused");
    }

});

// Finally, when the write stream says that the buffer has finally been drained, then we can add more data from the readStream onto it.
writeStream.on('drain', () => {

    readStream.resume();
    console.log("The read stream has been resumed.");
});

// The next thing is that, a readable stream closes itself after all the data has been read. But, a writable stream doesn't close by default. We need to close it by using the end function. This will close the file (or socket or anything like that) and thus the buffers will be cleared. We can also write some final data in the argument for the end method.
writeStream.end('This will appear at the end of the file.');



// With the help of piping, we can do the same thing we did by attaching a listener to the 'data' event on the readStream, then writing it to the writeStream, and if backpressure is present, pausing the readStream, and then resuming the readStream after the 'drain' event is fired in the writeStream is performed by the pipe method
// NOTE: We use the pipe method on the readStream and provide the writeStream as the argument to it
// So, the code above is equivalent to:
readStream.pipe(writeStream);



// Finally, there is no mechanism of error handling within the pipe function, and thus we need to attach the error listeners on the streams we are working with. So, we can use the global pipeline function to handle the errors for us, and that makes the code even more simpler
pipeline(readStream, writeStream, (err) => {
    console.log(err);
})


