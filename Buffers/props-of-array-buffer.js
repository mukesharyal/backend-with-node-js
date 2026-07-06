// Apart from the byteLength property, an array buffer has more properties like detached, resizable, and maxByteLength
// Now, the resizable property is set to false by default when we only specify the size of the memory block when creating the array buffer
// However, we can also pass another optional argument to the constructor function where we can specify the maxByteLength property
// Now, when we specify the maxByteLength property, the resizable property also becomes true, because now, we can expand the buffer to accomodate more data
// The maxByteLength property, as the name suggests, specifies the limit upto which the buffer can be expanded
const resizableArrayBuffer = new ArrayBuffer(4, { maxByteLength: 16 });

// When we console log the object, we find that the resizable property has been set to true
console.log(resizableArrayBuffer);

// Now, we can call the resize method on the buffer to change the size upto the maxByteLength
resizableArrayBuffer.resize(12);

// Now when we console log the buffer, the byteLength becomes 12, because we have resized the buffer
console.log(resizableArrayBuffer);

// Finally, the last property on the buffer is the detached property
// In array buffer, we can call the transfer function so that the size of the buffer on which the transfer function was called becomes zero, and the amount of memory is allocated for the receiving buffer, in that case, the detached property becomes true, as it has been detached

// Create an array buffer called a
const a = new ArrayBuffer(4);

// Let's give some data to the buffer, to make sure that calling the transfer function also copies (or handover) the data inside the buffer
const aInterface = new Uint8Array(a);

aInterface[0] = 0x25;

// By calling the transfer function on a, transfer the contents to b
const b = a.transfer();

// Now, when we console log a, the array buffer becomes empty, and the detached property becomes true
console.log(a);
console.log(b);

// So, we have seen that the data is also handed over
// So, it is actually just changing the ownership for the block of data without doing anything else on the memory itself