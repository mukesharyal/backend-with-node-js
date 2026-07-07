// Now, we look at some of the methods and properties that we have in the Buffer object
// First, let's create a buffer
const buffer = Buffer.from('test');

// The first method is the toString method. Using that method, we can convert the buffer binary data into string with various encoding formats
console.log(buffer.toString());

// The next method is the write method, and this method is used to write to a buffer with some string in some encoding format
// For that, we create a buffer, and then we can write some string to it using the write method
const myBuffer = Buffer.alloc(8);

// Now, we use the write method to write to the buffer with some encoding format
myBuffer.write('Hello, world!');

console.log(myBuffer.toString());

// Lovely! And, we also saw that if we write a string with more bytes than what the capacity of the buffer is, those bytes are dropped, and we get an incomplete string

// Also, the write method is in some relation with the Buffer.from method
// In the Buffer.from method, we provide the string and the encoding format, and we get the buffer with the byteLength equal to what is required to accommodate the string
// And with the write method, we create the buffer ourselves and write to it
// So, if the string length exceeds the capacity of the buffer, then the string is cut off

// Similar to the slice method on an array, we also have the slice method on the Buffer object in NodeJS
// But since the slice method is deprecated, we will use the subarray method instead
const slicedBuffer = myBuffer.subarray(0, 6);

console.log(slicedBuffer.byteLength);