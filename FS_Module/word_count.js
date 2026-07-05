// We are making a word counter app that reads the file and then lists the count for each word

import fs from 'node:fs/promises';

const fileBuffer = await fs.readFile('./file-1.txt');
const fileContent = fileBuffer.toString();

const lines = fileContent.split('\n');
const words = {};
lines.forEach((line) => {

    // We can also use regular expressions as the argument for the split function
    // And this regex in particular is for removing non-word characters

    const extractedWords = line.split(/\W/);

    extractedWords.forEach((word) => {

        if(words[word]) {
            words[word]++;
        }
        else {
            words[word] = 1;
        }
    });

});

console.log(words);

