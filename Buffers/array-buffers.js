const myArrayBuffer = new ArrayBuffer(20);

console.log(myArrayBuffer);

// The thing about ArrayBuffer is that we can neither read its contents, nor write to it
// That is because an ArrayBuffer is just a block of memory and has no interface of its own
// We use other things like DataView or TypedArray to read and write to it

// So, if we try to get the value using indexing, we get undefined
console.log(myArrayBuffer[0]);

// But, this is NOT because we haven't written anything to it
// Even then, the data stored inside it is 0s
// We can see the 0s by logging the buffer, which we've already done
// The reason we are getting the undefined is that we don't have the property in the object
// Because, at the end of the day, normal arrays in JavaScript are objects

// This can be solidified by trying to set the index of the buffer
myArrayBuffer[0] = 21;

console.log(myArrayBuffer);

// Now, instead of the first byte being changed to 21, we are getting a property on the object itself, which is expected to be honest

// So, we can therefore verify that, this is not the correct way to access data from, and write data to an ArrayBuffer
// And for that, we need either DataView or TypedArray
