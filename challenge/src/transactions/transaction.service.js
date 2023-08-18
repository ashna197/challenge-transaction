"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transactionModel_1 = require("../model/transactionModel");
const simpleBlockchain_1 = require("../simpleBlockchain");
const lodash_1 = require("lodash");
class TransactionService {
    constructor() {
        this.blockchain = new simpleBlockchain_1.Blockchain();
    }
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { fromAddress, toAddress, amount } = req.body;
                const checkErrors = this.checkValidations(req.body);
                if (!(0, lodash_1.isEmpty)(checkErrors.errors)) {
                    return res.status(400).json(checkErrors.errors);
                }
                fromAddress = fromAddress.toLowerCase();
                toAddress = toAddress.toLowerCase();
                const transaction = { fromAddress, toAddress, amount };
                const result = this.blockchain.addTransaction(transaction);
                const details = new transactionModel_1.TransactionInfo(result);
                yield details.save();
                return res.status(200).json({
                    message: `Transaction of Amount : ${amount} is done fromAddress : ${fromAddress} --> toAddress : ${toAddress}`,
                });
            }
            catch (error) {
                throw new Error(`Error catched in createTransaction method: ${JSON.stringify(error)}`);
            }
        });
    }
    getTransaction(req, res) {
        try {
            const paramAddress = req.params.address;
            const balanace = this.blockchain.getBalance(paramAddress.toLowerCase());
            return res
                .status(200)
                .json({ message: `Balanace for ${paramAddress} is : ${balanace}` });
        }
        catch (error) {
            throw new Error(`Error catched in getTransaction method: ${JSON.stringify(error)}`);
        }
    }
    getTransactionHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramAddress = req.params.address.toLowerCase();
                const result = yield transactionModel_1.TransactionInfo.find({
                    $or: [
                        { "transaction.fromAddress": `${paramAddress}` },
                        { "transaction.toAddress": `${paramAddress}` },
                    ],
                }, { _id: 0, __v: 0, nonce: 0 });
                return res.send(result);
            }
            catch (error) {
                throw new Error(`Error catched in getTransactionHistory method: ${JSON.stringify(error)}`);
            }
        });
    }
    checkValidations(body) {
        let errors = [];
        const { fromAddress, toAddress, amount } = body;
        if (!(0, lodash_1.isString)(fromAddress) || (0, lodash_1.isEmpty)(fromAddress.trim())) {
            this.pushErrorDetails("fromAddress is required , should be of type string and cannot be empty", "fromAddress", errors);
        }
        if (!(0, lodash_1.isString)(toAddress) || (0, lodash_1.isEmpty)(toAddress.trim())) {
            this.pushErrorDetails("toAddress is required , should be of type string and cannot be empty", "toAddress", errors);
        }
        if (!(0, lodash_1.isInteger)(amount) || amount <= 0 || !amount) {
            this.pushErrorDetails("amount is required and should be positive integer", "amount", errors);
        }
        return { errors };
    }
    pushErrorDetails(error, attribute, collector) {
        collector.push({ Attribute: attribute || "", detail: error });
    }
}
exports.TransactionService = TransactionService;
