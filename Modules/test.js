// So, doesn't matter whether we use var or let, still we are in the local scope
// When we do export, that doesn't work either because that is still a module thing

var num = 42;

console.log(num);

export const globalNum = 67;
