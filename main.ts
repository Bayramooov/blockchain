class User {
  public_key: string;
  secret_key: string;

  generateKey(password: string): void {
    this.public_key = password;
    this.secret_key = password.substr(-3);
  }
}

class Block {
  hash: string;
  prev_hash: string;

  from: User;
  signature: string;

  // Signature
  sign(secret_key: string): void {
    this.signature = `${this.hash}/${this.data.hash}/${secret_key}`;
    console.log(this.signature);
  }

  // Verification
  verify(public_key: string): boolean {
    let signature = `${this.hash}/${this.data.hash}/${public_key.substr(-3)}`;
    if (this.signature === signature) return true;
    else return false;
  }
}

class Miner {
  name: string;
  coin: number;
}