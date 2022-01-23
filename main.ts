declare function require(name: string);
const SHA256 = require('crypto-js/sha256');

class Block {
  index: number;
  hash: string;
  prevHash: string;
  timestamp: any;
  data: any;

  constructor(
    index: number,
    timestamp: any,
    data: any,
    prevHash: string = ''
  ) {
    this.index = index;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  chain: Array<Block>;

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, '01/01/2017', 'Genesis Block', '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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

let soqqaCoin = new Blockchain();
soqqaCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }));
soqqaCoin.addBlock(new Block(2, '12/07/2017', { amount: 10 }));

console.log(JSON.stringify(soqqaCoin, null, 4));
console.log('Is blockchain valid?', soqqaCoin.isChainValid());
