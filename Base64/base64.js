// Like other encoding formats, base64 is yet another encoding format, with a single distinction from other ones
// While the other encoding formats encode text into binary and vice versa (where the actual data is itself text), base64 is used to encode binary data into text and vice versa (where the actual data is not text, but binary data, like an image, a file or anything else)
// The requirement for base64 is to convert binary data into text so that it can be transmitted via medium that supports text

// In Base64, we use 64 characters to represent the binary data. The bitstream is read in 24-bit chunks, which are then converted to 4 6-bit chunks, and for each 6-bit chunk, we convert the chunk into its corresponding base64 character.
// If the final piece of data is not of 24 bits, then we pad additional 0s on the end of the data to make it 24 bits, and then proceed as usual
// Finally, for the 6-bit chunk where no portion is part of the data, and is just the padded zeros, we use = instead of the letter A for the 000000.

// We can just encode the incoming data from a file with the base64 encoding format as well
import fs from 'node:fs/promises';

// We supply the encoding format as base64, and thus get the base64 string representation of the binary data inside the file
// By the way, this is equivalent to the btoa() method defined on the browser
const base64Data = await fs.readFile('./file.txt', 'base64');

// And, this is equivalent to the atob() method defined on the browser
await fs.writeFile('./file.txt', 'U29tZSB0ZXh0', 'base64');

console.log(base64Data);