"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInfo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const transactionSchema = new Schema({
    prevHash: { type: String, required: true },
    transaction: { type: Object, required: true },
    timestamp: { type: Date, required: true },
    nonce: { type: Number },
});
exports.TransactionInfo = mongoose_1.default.model("TransactionInfo", transactionSchema, "TransactionInfo");
