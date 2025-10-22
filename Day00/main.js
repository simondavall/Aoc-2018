const fs = require("fs");
const os = require("os");
const assert = require("assert");
const { performance } = require("perf_hooks");


function partOne(input){

  let tally = 0;

  return tally;
}

function partTwo(input){

  let tally = 0;

  return tally;
}

function solveFile(filePath){
  var input = fs.readFileSync(filePath).toString().trim().split('\n');
  console.log(`\nFinding solution for ${filePath}`)
  
  let start = performance.now();
  const result1 = partOne(input);
  const mid = performance.now();
  console.log(`Result partOne: ${result1} in ${(mid - start).toPrecision(6)}ms`)


  start = performance.now();
  const result2 = partTwo(input);
  const end = performance.now();
  const arr = Array.from(result2).sort();

  console.log(`Result partTwo: ${result2} in ${(end - start).toPrecision(6)}ms`)
}

for (let filePath of process.argv.slice(2)){
  solveFile(filePath);
}
