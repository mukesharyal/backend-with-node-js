// Now, we understand some basic things to use the module system of NodeJS
// For CommonJS modules, we use the require function

a = 20;

const sum = require('./sum');

console.log(sum(1, 2, 3, 4, 5));
