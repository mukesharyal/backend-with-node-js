// When we run all the loops in the same thread, then the loops get run one after another
// So, the total time it takes will be roughly 3 times the time taken for a single loop

console.time();

for(let i = 0; i < 1000000000; i++) {
    if(i % 400000000 == 0) {
        console.log(`Running loop 1 ${i}`);
    }
}

for(let i = 0; i < 1000000000; i++) {
    if(i % 400000000 == 0) {
        console.log(`Running loop 2 ${i}`);
    }
}

for(let i = 0; i < 1000000000; i++) {
    if(i % 400000000 == 0) {
        console.log(`Running loop 3 ${i}`);
    }
}

console.timeEnd();


// Now, with the help of threads, we can delegate the tasks of the for loops into their own threads
// And since our devices are multicore, all the threads get executed paralelly
// Therefore, we can complete the work in the time it takes for a single for loop
// That is so cool!