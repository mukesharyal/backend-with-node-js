// Import the fs module for file handling
const fs = require('fs');

// Read the file stream
const fileBuffer = fs.readFileSync('./secrets.env');

// Convert the buffer to a string
const fileContents = fileBuffer.toString();

// Extract out each individual lines
const extractedLines = fileContents.split('\n');

// Extract the key-value pairs from each line
extractedLines.forEach((line) => {

    const [key, unformattedValue] = line.split('=');

    const value = unformattedValue.split('\r');

    console.log(key, value[0]);

    process.env[key] = value[0];
})