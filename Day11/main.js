const fs = require("fs");
const os = require("os");
const assert = require("assert");
const { performance } = require("perf_hooks");

const gridSize = 300;

function partOne(input) {
  const serialNumber = Number(input);
  const grid = buildFuelCellGrid(serialNumber);

  const size = 3;

  let maxPower = 0;
  let maxPowerX = 0;
  let maxPowerY = 0;

  for (let x = 0; x <= gridSize - size; x++) {
    for (let y = 0; y < gridSize - size; y++) {
      let tally = 0;
      for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
          tally += grid[j][i];
        }
      }
      if (tally > maxPower) {
        maxPower = tally;
        maxPowerX = x + 1;
        maxPowerY = y + 1;
      }
    }
  }

  console.log(`MaxPower: ${maxPower}`);

  return `Cell: [${maxPowerX},${maxPowerY}]`;
}

function partTwo(input) {
  const serialNumber = Number(input);
  const grid = buildFuelCellGrid(serialNumber);

  let maxPower = -99999;
  let maxPowerX = 0;
  let maxPowerY = 0;
  let maxPowerSize = 0;

  for (let size = 1; size < 300; size++) {
    for (let y = 0; y <= gridSize - size; y++) {
      const seen = new Object();
      for (let x = 0; x < gridSize - size; x++) {
        let tally = 0;
        for (let i = x; i < x + size; i++) {
          let col = 0;
          if (seen[i] === undefined) {
            for (let j = y; j < y + size; j++) {
              col += grid[j][i];
            }
            seen[i] = col;
          } else {
            col = seen[i];
          }
          tally += col;
        }
        if (tally > maxPower) {
          maxPower = tally;
          maxPowerX = x + 1;
          maxPowerY = y + 1;
          maxPowerSize = size;
        }
      }
    }
  }

  console.log(`MaxPower: ${maxPower}`);

  return `Cell: [${maxPowerX},${maxPowerY},${maxPowerSize}]`;
}

function buildFuelCellGrid(serialNumber) {
  const grid = [];
  for (let y = 0; y < gridSize; y++) {
    grid[y] = [];
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = calcCellPowerLevel(x + 1, y + 1, serialNumber);
    }
  }
  return grid;
}

function calcCellPowerLevel(x, y, serialNumber) {
  const rackId = x + 10;
  let pl1 = rackId * y;
  pl2 = pl1 + serialNumber;
  pl3 = pl2 * rackId;
  pl4 = Math.trunc(pl3 / 100);
  pl5 = pl4 % 10;
  //console.log(`Text: ${pl5}`);
  return pl5 - 5;
}

function solveFile(filePath) {
  var input = fs.readFileSync(filePath).toString().trim();
  console.log(`\nFile: ${filePath}`);

  let start = performance.now();
  const result1 = partOne(input);
  const mid = performance.now();
  console.log(
    `Result partOne: ${result1} in ${(mid - start).toPrecision(6)}ms`,
  );

  start = performance.now();
  const result2 = partTwo(input);
  const end = performance.now();

  console.log(
    `Result partTwo: ${result2} in ${(end - start).toPrecision(6)}ms`,
  );
}

for (let filePath of process.argv.slice(2)) {
  solveFile(filePath);
}
