// Here, we have a module which has a function called sum

// We define the function without any export keyword, like we are used to in React
function sum(...nums) {
    return nums.reduce((curr, acc) => curr + acc);
}

// Finally, we export the function using the module object
module.exports = sum;

