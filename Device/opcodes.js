class Instruction {
  constructor(code, a, b, c) {
    this.code = code;
    this.a = a;
    this.b = b;
    this.c = c;
  }

  toString(){
    return `${this.code} ${this.a} ${this.b} ${this.c}`
  }
}

class Device {
  // constructor(ip, size) {
  //   this.register = (new Array(size)).fill(0);
  //   this.ip = ip;
  // }
  constructor(ip, arr){
    this.register = arr;
    this.ip = ip;
  }

  getIP(){
    return this.register[this.ip];
  }

  execute(instruction){
    const code = instruction.code;
    const a = instruction.a;
    const b = instruction.b;
    const c = instruction.c;

    switch(code){
      case "addr":  this.addr(a,b,c);   break;
      case "addi":  this.addi(a,b,c);   break;
      case "mulr":  this.mulr(a,b,c);   break;
      case "muli":  this.muli(a,b,c);   break;
      case "banr":  this.banr(a,b,c);   break;
      case "bani":  this.bani(a,b,c);   break;
      case "borr":  this.borr(a,b,c);   break;
      case "bori":  this.bori(a,b,c);   break;
      case "setr":  this.setr(a,b,c);   break;
      case "seti":  this.seti(a,b,c);   break;
      case "gtir":  this.gtir(a,b,c);   break;
      case "gtri":  this.gtri(a,b,c);   break;
      case "gtrr":  this.gtrr(a,b,c);   break;
      case "eqir":  this.eqir(a,b,c);   break;
      case "eqri":  this.eqri(a,b,c);   break;
      case "eqrr":  this.eqrr(a,b,c);   break;
      default:
        assert.fail(`Unknown opcode instruction. Value:'${code}'`)
    }
    this.register[this.ip]++;
  }

  addr(a, b, c) {
    this.register[c] = this.register[a] + this.register[b];
  }

  addi(a, b, c) {
    this.register[c] = this.register[a] + b;
  }

  mulr(a, b, c) {
    this.register[c] = this.register[a] * this.register[b];
  }

  muli(a, b, c) {
    this.register[c] = this.register[a] * b;
  }

  banr(a, b, c) {
    this.register[c] = this.register[a] & this.register[b];
  }

  bani(a, b, c) {
    this.register[c] = this.register[a] & b;
  }

  borr(a, b, c) {
    this.register[c] = this.register[a] | this.register[b];
  }

  bori(a, b, c) {
    this.register[c] = this.register[a] | b;
  }

  setr(a, b, c) {
    this.register[c] = this.register[a];
  }

  seti(a, b, c) {
    this.register[c] = a;
  }

  gtir(a, b, c) {
    this.register[c] = a > this.register[b] ? 1 : 0;
  }

  gtri(a, b, c) {
    this.register[c] = this.register[a] > b ? 1 : 0;
  }

  gtrr(a, b, c) {
    this.register[c] = this.register[a] > this.register[b] ? 1 : 0;
  }

  eqir(a, b, c) {
    this.register[c] = a == this.register[b] ? 1 : 0;
  }

  eqri(a, b, c) {
    this.register[c] = this.register[a] == b ? 1 : 0;
  }

  eqrr(a, b, c) {
    this.register[c] = this.register[a] == this.register[b] ? 1 : 0;
  }
}

export { Device, Instruction };
