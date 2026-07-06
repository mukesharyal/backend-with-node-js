// Similar to DataView, we have another way to work with an ArrayBuffer in JavaScript
// However, unlike DataViews where we have a constructor function called DataView, we have various constructors like Int8Array, Int16Array, Int32Array and so on
// So, we have various different types that look like this:

//Int8Array
//Int16Array
//Int32Array
//BigInt64Array

//Uint8Array
//Uint8ClampedArray
//Uint16Array
//Uint32Array
//BigInt64Array

//Float32Array
//Float64Array

// However, the way we interface with the buffers using typed arrays remains the same
// So, we first create a buffer
const arrayBuffer = new ArrayBuffer(4);

// Now, we create one of the typed arrays
// And, we set the argument as the buffer we just created
const uint8Array = new Uint8Array(arrayBuffer);

// Typed arrays are much more easier to work with than data views
// Because, the elements of the buffer are indexed like an array inside of it
// So, we can use indexes to read from and write to the buffer

uint8Array[2] = 0x75;

console.log(arrayBuffer)

// Now, when we add more than a byte to the buffer, it uses the LITTLE ENDIAN SCHEME
// And, there is no way to change it
// That is why, the level of granularity that can be achieved with data views cannot be achieved with typed arrays

// Now, the next thing is that we do not need to create the array buffer separately to be used with typed arrays
// If we mention the size of the typed array while creating it, then the array buffer will be automatically created and linked with the typed array
// So, we can do something like this:
const secondIntArray = new Uint8Array(4);

// The buffer property on the typed array object holds the memory location, i.e. the array buffer inside of it, and therefore we needn't create it separately
console.log(secondIntArray.buffer);

// And that is not the end of it
// When we create the typed array by specifying the bytelength for the buffer, we need to populate the buffer manually
// But, we can just pass an array with the intended data to the constructor of the typed array, and the buffer will be populated with the data that we provided in the array as the argument
const typedArrayWithData = new Uint8Array([0x13, 0x45, 0x56, 0xfe]);

// Now when we console log the buffer, we see the buffer pre-populated with the values
console.log(typedArrayWithData.buffer);

// Let's do an exercise where we populate the values of the buffer with some data using a loop
const workingTypedArray = new Uint8Array(1.9 * 1024 * 1024 * 1024);

for(let i = 0; i < workingTypedArray.byteLength; i++) {
    workingTypedArray[i] = i;
}

console.dir(workingTypedArray);