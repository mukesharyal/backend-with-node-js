// We use DataView to read and write from an ArrayBuffer

// First, we create the ArrayBuffer and allocate some bytes in memory
const arrayBuffer = new ArrayBuffer(4);

// Then, we create the DataView which will be used to interact with the ArrayBuffer
// While creating the DataView object, we need to provide the buffer as the argument
const dataView = new DataView(arrayBuffer);

// Now, we can use the set methods on the DataView object to interact with the buffer
dataView.setInt8(1, -1);

// Now, if we console log the buffer, we can see the data
console.log(arrayBuffer);


// Now, we can create multiple data views to interact with one buffer
// So, let's create another one
// This time, we set the byte offset to be 2 bytes, so that the view can only interact with the buffer starting from index 2
const secondDataView = new DataView(arrayBuffer, 2);

// We again set the byte of memory with some data
secondDataView.setInt8(0, 255);

// Now, when we console log the buffer, the 2nd index must have 45H and first index must have 75H
console.log(arrayBuffer);


// That is good. Now, we can also get the data from the buffer pretty easily
const index3Data = dataView.getInt8(2);

console.log(index3Data);

// I was really confused because setting both -1 and 255 would give the same result
// But, I forgot that we CAN'T REPRESENT 255 WITH AN 8-BIT SIGNED INTEGER
// And the setInt8 function happily allows it because it is the programmer's responsibility to handle it
// These are low-level functions and therefore the programmer needs to be more cautious
// This bahaviour is actually similar in all the low-level programming languages
// So, doing a quick math beforehand is always the way to work with this

// The working of the function looks something like this:
// The function receives the data and converts it to binary
// Then, it only uses the bits that is specified in the function
// So, in the case of setInt8, it takes the first 8 bits and stores that
// So, we can choose any large number, and it will just store the 8 least significant bits, without breaking a sweat
// So, it is the programmer's responsibility to be more explicit and mindful

// Therefore, we can also provide a humongous number to the setInt8 function as well
dataView.setInt8(0, 123456789);

console.log(arrayBuffer);

// It is just as happy to do this
// That was quite some learning!