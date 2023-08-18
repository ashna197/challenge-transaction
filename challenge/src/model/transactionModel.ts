import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  prevHash: { type: String, required: true },
  transaction: { type: Object, required: true },
  timestamp: { type: Date, required: true },
  nonce: { type: Number },
});

export const TransactionInfo = mongoose.model(
  "TransactionInfo",
  transactionSchema,
  "TransactionInfo"
);
