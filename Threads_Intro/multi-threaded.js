// This time, we spawn 3 worker threads to run the code of the 3 loops in 3 different cores
// Therefore, with multithreading, all the loop code gets executed simultaneously

const { Worker } = require('worker_threads');

new Worker('./loop-a');
new Worker('./loop-b');
new Worker('./loop-c');