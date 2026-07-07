import constants from 'buffer';

// Now, inside the Buffer constructor itself, there are 2 alloc methods defined
// These are the alloc and allocUnsafe methods
// Let us allocate a chunk of memory using both the methods, and analyse them
const buffer1 = Buffer.alloc(4);
const buffer2 = Buffer.allocUnsafe(4);

// Now, when we console log both the buffer contents using toString on the buffer, we expect to see empty string because the allocated memory will be populated with 0s
// So, we expect an empty string from both the console logs
// console.log(buffer1.toString());
console.log(buffer2.toString());

// But, when we console log it, we see a lot of gibberish
// And, the gibberish is only obtained from the allocUnsafe method, and not the alloc method
// So, that gives one of the major differences between the two methods
// When we use the alloc method, the memory block we obtain is sure to be filled with just 0s
// However, that is not the case for the allocUnsafe method, and we can get some garbage data from the memory location
// In other words, the allocUnsafe method just returns us a block of memory without sanitizing it first with just 0s

// And, that is the reason the method is called unsafe
// However, the allocUnsafe method is much faster than alloc method because it just hands us a block of memory without the cleaning, and thus the process becomes fast

// There are some more things we need to analyse between the alloc and allocUnsafe method which makes the latter faster than the former
// For that, let us print the size of the buffer, as well as the underlying array buffer being used for each of them
console.log(buffer1.byteLength);
console.log(buffer2.byteLength);

console.log(buffer1.buffer.byteLength);
console.log(buffer2.buffer.byteLength);

// Now, we can see the difference between them
// When we specify the size for the buffer to be used, the alloc method just provides us with a block of data with that size
// However, the allocUnsafe method initializes a whole pool of memory, which is 65KiB in my case
// So, when we are allocating some size for our buffer, the allocUnsafe method allocates a whole pool of memory, called a buffer pool, instead of just the number of bytes we specified

// So, the idea is pretty simple, actually
// For the allocUnsafe method, Node already has a pool of 64KB of memory initialized, and when we call allocUnsafe, the buffer gets some chunks of memory from the buffer pool
// By this way, the requirement for frequent allocation gets reduced, because Node already has a block of memory pre-initialized, and whenever we create a new buffer using the allocUnsafe method, those buffers all take up some chunk of memory from the buffer pool
// And, only when the whole pool is exhausted does Node need to create yet another pool for the usage
// And due to this reason, the allocUnsafe method becomes even faster, because we are not even allocating blocks of memory some times, we are just lending the portions of the block we already have
// So, when we create multiple buffers using the allocUnsafe method, the underlying array buffer is the same, which we can verify pretty easily
const a = Buffer.allocUnsafe(10);
const b = Buffer.allocUnsafe(20);
console.log(a.buffer === b.buffer);

// We get true, because we should!
// And with the help of the byteOffset property, we can access the various portions of the underlying array buffer from different buffers simply using the index operator, because the final index will be simply given as
// indexOfArrayBuffer = indexOfBuffer + byteOffset
// We can verify that pretty easily. Let's write something to the buffer b at index 5
b[5] = 0x67;

// For looking at the array buffer, we need to create a dataView for it
const dataView = new DataView(b.buffer);

console.log(b[5] === dataView.getUint8(b.byteOffset + 5));

// And, we get true because they are indeed the same

// And, by the way, the buffer created with the allocUnsafe method will use the buffer pool when the size of the buffer specified in the argument is less than half of the size of the buffer pool
// So, in our case, the size provided while creating the buffer should be less than 32 KiB

// Also, whenever we are creating a buffer using the allocUnsafe method, a new buffer pool will be created whenever the previous one cannot accommodate the buffer

// Now, we can also change the value for the poolSize static property on the Buffer object
// And, when a new buffer pool needs to be created due to the exhaustion of the previous one, the new size will be what was provided by changing the property
// However, for the first buffer pool, the size will be the one which is decided by Node, which is 64KiB in our case
// And we could also reason through it because the first buffer pool might be created before the actual execution of the code begins, and therefore we cannot change the value for the default buffer pool size
// And when the code is executed, the value for the poolSize gets overwritten, and therefore when Node needs to create another buffer pool, it uses the poolSize static property, and therefore the new size will be used
// That makes sense!

// There are more information about the buffers in NodeJS
// The Buffer.from method also uses the allocUnsafe method under the hood, and therefore the buffer created from the Buffer.from method also shares the same underlying array buffer

// Finally, there is another method called Buffer.allocUnsafeSlow which also creates a block of memory without pre-initializing it with 0s, however, it doesn't use the buffer pool, and just initializes the block of memory as specified
// So, in other words, it is similar to the Buffer.alloc method, with the only difference being the default values set inside the memory block; alloc has the data as 0, while the data can be anything with allocUnsafeSlow
