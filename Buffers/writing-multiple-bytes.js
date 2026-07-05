// This time, we use the other methods on the DataView to read and write more than 1 byte
// Let's first initilize the array buffer
const arrayBuffer = new ArrayBuffer(4);

// Now, we create the data view to interact with the buffer
const dataView = new DataView(arrayBuffer);

// Let's put some values before we extract them
dataView.setInt32(0, 123456);

// For data more than 1 byte, we need to also specify the endianness of the data because we can write to or read from the same chunk in different ways
// The littleEndian is an optional parameter in the get and set functions
// When it is not specified, it is undefined, and therefore the default endianness becomes bigEndian
const bigEndianData = dataView.getInt16(0);

const littleEndianData = dataView.getInt16(0, true);

console.log(bigEndianData, littleEndianData);