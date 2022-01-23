console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();

declare function require(name: string);
const SHA256 = require('crypto-js/sha256');

function calculateTime(milliseconds: number) {
  const day = 86400000;
  const hour = 3600000;
  const minut = 60000;
  const second = 1000;
  let time = '';

  if (milliseconds > day) {
    let days = Math.floor(milliseconds / day);
    time += days + 'd ';
    milliseconds -= days * day;
  }

  if (milliseconds > hour) {
    let hours = Math.floor(milliseconds / hour);
    time += hours + 'hr ';
    milliseconds -= hours * hour;
  }

  if (milliseconds > minut) {
    let minuts = Math.floor(milliseconds / minut);
    time += minuts + 'm ';
    milliseconds -= minuts * minut;
  }

  if (milliseconds > second) {
    let seconds = Math.floor(milliseconds / second);
    time += seconds + 's';
    milliseconds -= seconds * second;
  }

  return time;
}

class Block {
  hash: string;
  prevHash: string;
  timestamp: number;
  transactions: Object;
  nonce: number;

  constructor(
    transactions: object,
  ) {
    this.hash = this.calculateHash();
    this.prevHash = '0';
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.nonce = 0;
  }

  calculateHash(): string {
    return SHA256(
      this.prevHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    let start = Date.now();
    let timelapse = start;
    let count = 0;

    while (
      this.hash.substring(0, difficulty) !==
      Array(difficulty + 1).join('0')
    ) {
      let now = Date.now();
      count++;

      this.nonce++;
      this.hash = this.calculateHash();

      if (now - timelapse < 10000) continue;

      console.log('Average speed (10s):', Math.ceil(count / 10000), 'MH/s');
      timelapse = now;
      count = 0;
    }

    console.log(Array(65).join('_'));
    console.log('Block Successfully Mined!');
    console.log(this.hash);
    console.log('Difficulty', difficulty);
    console.log(this.nonce, 'trials in ' + calculateTime(Date.now() - start));
    console.log(Array(65).join('_'));
  }
}

class Blockchain {
  chain: Array<Block>;
  difficulty: number;

  constructor(difficulty: number = 0) {
    this.chain = [new Block({ name: 'Genesis Block!' })];
    this.difficulty = difficulty;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      if (currBlock.hash !== currBlock.calculateHash()) return false;
      if (currBlock.prevHash !== prevBlock.hash) return false;
    }

    return true;
  }
}

let soqqaCoin = new Blockchain(6);
soqqaCoin.addBlock(new Block({ amount: 16 }));
soqqaCoin.addBlock(new Block({ amount: 24 }));
soqqaCoin.addBlock(new Block({ amount: 20 }));

console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log(JSON.stringify(soqqaCoin, null, 4));
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();
console.log();