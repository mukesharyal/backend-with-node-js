// Let's import the fs module to write to a file
import fs from 'node:fs/promises';

// Then, let's create a typed array to write the contents
const typedArray = new Uint8Array([0x4d, 0x75, 0x6b, 0x65, 0x73, 0x68]);

// Now, we just write to a file using the fs module
fs.writeFile('./bufferedText.txt', typedArray);

