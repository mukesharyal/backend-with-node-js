// Similar to how we create Uint8Array (or other ones), we create a Buffer in NodeJS in a similar way
// Actually, the creating a buffer using the Buffer constructor has been deprecated right now, but we can create it nonetheless for demonstration purposes

// We create an uint8array like so
const uint8array = new Uint8Array(4);

// We also create a buffer in the same way
// const nodeBuffer = new Buffer(4);

// console.log(nodeBuffer);

// But, since the Buffer constructor way of creating a node buffer is deprecated, we use the alloc function to create the buffer for us
// Everything else remains the same
const nodeBuffer = Buffer.alloc(4);

console.log(nodeBuffer);

// Now, we can also create the ArrayBuffer ourselves and create the NodeJS buffer from it
// For that, we use the from static method on the Buffer constructror
const arrayBuffer = new ArrayBuffer(4);

const bufferFromArrayBuffer = Buffer.from(arrayBuffer);

console.log(bufferFromArrayBuffer);

// So, the new information obtained is that, the Buffer object in NodeJS is formed by extending the Uint8Array object of JavaScript
// It has some more methods defined on top of the Uint8Array
// So, it extends the functionality of the Uint8Array object

// For example, we have the toString method on the Uint8Array, but it behaves like the toString method for a regular array, and just displays the contents by separating them with commas
// So, some binary data present in the array will be printed as is
// However, the toString method is overridden inside the Buffer object, and thus it allows to enter a encooding format and can therefore display the data with the proper encoding applied to it

// Also, similar to the Uint8Array object, we can also provide an array of data while creating the Buffer object using the Buffer.from method for pre-populating the buffer with the data