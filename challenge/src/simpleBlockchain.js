"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = exports.Transaction = void 0;
/**
 * Transaction represents a transfer of value from one address to another.
 * In this simplified scenario, a transaction has a single recipient.
 */
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
exports.Transaction = Transaction;
/**
 * Block represents a set of transactions.
 * In this simplified scenario, a block contains a single transaction.
 */
class Block {
    constructor(prevHash, transaction, timestamp = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    /**
     * Generates a simple hash for the block data.
     * In a real blockchain, a more secure method would be used.
     */
    get hash() {
        const str = JSON.stringify(this);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash.toString();
    }
}
/**
 * Blockchain represents a chain of blocks, with methods for adding blocks
 * and checking the integrity of the chain.
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    /**
     * Create the initial block for the blockchain.
     */
    createGenesisBlock() {
        return new Block("", new Transaction(null, "", 0));
    }
    /**
     * Get the latest block in the chain.
     */
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * Add a new transaction to the blockchain. The transaction is placed in a new block.
     */
    addTransaction(transaction) {
        const newBlock = new Block(this.latestBlock.hash, transaction, Date.now());
        this.chain.push(newBlock);
        return newBlock;
    }
    /**
     * Get the balance of an address by aggregating the amounts in the related transactions.
     */
    getBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            const { fromAddress, toAddress, amount } = block.transaction;
            if (fromAddress === address) {
                balance -= amount;
            }
            if (toAddress === address) {
                balance += amount;
            }
        }
        return balance;
    }
}
exports.Blockchain = Blockchain;
