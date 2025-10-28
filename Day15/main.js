const fs = require("fs");
const os = require("os");
const assert = require("assert");
const { performance } = require("perf_hooks");
const { Queue } = require("../Utils/Queue.js");

class Unit {
  constructor(id, r, c, type) {
    this.id = id;
    this.row = r;
    this.col = c;
    this.type = type;
    this.power = 3;
    this.health = 200;
    this.dead = false;
  }
}

const directions = {
  0: { dr: -1, dc: 0 },
  1: { dr: 0, dc: -1 },
  2: { dr: 0, dc: 1 },
  3: { dr: 1, dc: 0 },
};

let map = [];
let units = [];
let height = 0;
let width = 0;

function moveUnit(unit, map) {
  const next = getShortestPathToEnemy(unit.row, unit.col, getEnemyType(unit), map);
  // console.log(`Next: ${next}`);
  if (next !== undefined && next !== null) {
    // console.log(`Returned path item: ${next}`);
    map[unit.row][unit.col] = ".";
    unit.row = next[0];
    unit.col = next[1];
    map[unit.row][unit.col] = unit.type;
  }
}

function combat(unit, map) {
  if (unit.health <= 0) {
    console.log(`Unit not fighing: ${unit.id}] health:${unit.health}`);
    return;
  }

  let weakestEnemy = null;
  const enemy = getEnemyType(unit);
  let minHealth = 999;

  for (const { dr, dc } of dirValues) {
    const nr = unit.row + dr;
    const nc = unit.col + dc;
    const adj = getUnitAtLocation(nr, nc);
    if (
      adj != null &&
      adj.type == enemy &&
      adj.health < minHealth &&
      adj.health > 0
    ) {
      minHealth = adj.health;
      weakestEnemy = adj;
    }
  }
  //attack them
  if (weakestEnemy != null) {
    weakestEnemy.health -= unit.power;
    if (weakestEnemy.health <= 0){
      weakestEnemy.dead = true;
    }
  }
}

function partOne(input) {
  dirValues = Object.values(directions);
  units = [];
  setupMap(input);
  setupUnits();

  //printMap();

  let round = 0;
  let roundComplete = true;

  while (hasFighters("E") && hasFighters("G")) {
    units.sort((a, b) => byReadingOrder(a, b));
    let battleMap = drawBattleMap();

    const combatants = [];
    units.forEach((x) => combatants.push(x.id));

    for (const id of combatants) {
      const unit = getUnit(id);

      const enemy = getEnemyType(unit);
      if (!hasFighters(enemy)) {
        console.log(`No enemies to fight. Breaking early`);
        //round--;
        roundComplete = false;
        break;
      }
      moveUnit(unit, battleMap);
      combat(unit, battleMap);
    }

    units = units.filter((x) => x.health > 0);

    if (roundComplete){
      round++;
    }

    // round++;
    // if (hasFighters("E") && hasFighters("G")) {
    //   units.sort((a, b) => byReadingOrder(a, b));
    //   battleMap = drawBattleMap();
    // }
  }

  //printMap();

  const tally = units.reduce((a, b) => a + b.health, 0);

  console.log(`Hit points: ${tally}, rounds:${round}`);
  return tally * round;
}

function partTwo(input) {
  let tally = 0;

  return tally;
}

function getShortestPathToEnemy(r, c, target, map) {
  const seen = new Set();
  const q = new Queue([{ r: r, c: c, path: [] }]);

  while (!q.isEmpty()) {
    const pt = q.dequeue();
    for (const { dr, dc } of dirValues) {
      const nr = pt.r + dr;
      const nc = pt.c + dc;
      if (map[nr][nc] == target) {
        return pt.path[0];
      }
      if (seen.has(`${nr}-${nc}`)) {
        continue;
      }
      seen.add(`${nr}-${nc}`);
      if (isValidMove(nr, nc, map)) {
        q.enqueue(setArgs(nr, nc, pt.path));
      }
    }
  }
  return null;
}

function hasFighters(type) {
  return units.filter((x) => x.type == type && !x.dead).length > 0;
}

function getUnitAtLocation(r, c) {
  for (const unit of units) {
    if (unit.row == r && unit.col == c) {
      return unit;
    }
  }
  return null;
}

function getUnit(id) {
  for (const unit of units) {
    if (unit.id == id) {
      return unit;
    }
  }
  return null;
}

function setArgs(r, c, path) {
  const arr = path.slice();
  arr.push([r, c]);
  return { r: r, c: c, path: arr };
}

function isValidMove(r, c, map) {
  return map[r][c] == ".";
}

function byReadingOrder(a, b) {
  return a.row * height + a.col - (b.row * height + b.col);
}

function drawBattleMap() {
  const arr = [];
  for (let i = 0; i < height; i++) {
    arr[i] = map[i].slice();
  }
  for (const u of units) {
    arr[u.row][u.col] = u.type;
  }
  return arr;
}

function printMap() {
  const arr = [];
  console.log();
  for (let i = 0; i < height; i++) {
    arr[i] = map[i].slice();
  }
  for (const u of units) {
    arr[u.row][u.col] = `${u.type} (${u.health})`;
  }
  // const arr = drawBattleMap();
  arr.forEach((row) => console.log(...row));
}

function setupMap(input) {
  for (let i = 0; i < input.length; i++) {
    map[i] = input[i].split("");
  }
  height = map.length;
  width = map[0].length;
}

function getEnemyType(unit) {
  return unit.type == "G" ? "E" : "G";
}

function setupUnits() {
  let idx = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (map[r][c] == "G" || map[r][c] == "E") {
        units.push(new Unit(idx++, r, c, map[r][c]));
        map[r][c] = ".";
      }
    }
  }
}

function solveFile(filePath) {
  var input = fs.readFileSync(filePath).toString().trim().split("\n");
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
