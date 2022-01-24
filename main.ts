declare function require(name: string);
const SHA256 = require('crypto-js/sha256');
const Util = require('./util');

class Block {
  hash: string;
  prevHash: string;
  timestamp: number;
  transactions: Object;
  nonce: number;

  constructor(transactions: object) {
    this.hash = this.calcHash();
    this.prevHash = '0';
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.nonce = 0;
  }

  calcHash(): string {
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
      this.hash = this.calcHash();

      if (now - timelapse < 10000) continue;

      console.log('Average speed (10s):', Math.ceil(count / 10000), 'MH/s');
      timelapse = now;
      count = 0;
    }

    console.log(Array(65).join('_'));
    console.log(this.hash);
    console.log('Block Successfully Mined!');
    console.log('Difficulty', difficulty);
    console.log(this.nonce, 'trials in ' + Util.calcInterval(Date.now() - start));
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
      if (currBlock.hash !== currBlock.calcHash()) return false;
      if (currBlock.prevHash !== prevBlock.hash) return false;
    }

    return true;
  }
}

let soqqaCoin = new Blockchain(5);
soqqaCoin.addBlock(new Block({ amount: 16 }));
soqqaCoin.addBlock(new Block({ amount: 24 }));
soqqaCoin.addBlock(new Block({ amount: 20 }));

console.log(JSON.stringify(soqqaCoin, null, 4));
