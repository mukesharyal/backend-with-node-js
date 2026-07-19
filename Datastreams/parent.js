// We actually spawn the child process from our parent process
import fs from 'fs';
import { spawn } from "child_process";

// We also create a write stream to write to another file
const writeStream = fs.createWriteStream('./output.txt');

const childProcess = spawn('node', ['child.js']);

// Now, since the child process was created by our process, we can do anything with the stdout stream of the child in our parent process
// For now, we can just pipe the input which will be received at the stdout stream of the child process into the writeStream to write to the output file
childProcess.stdout.pipe(writeStream);