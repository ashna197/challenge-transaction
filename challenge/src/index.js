"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_service_1 = require("./transactions/transaction.service");
const app = (0, express_1.default)();
require("./database/database.service");
app.use(express_1.default.json());
const transactionService = new transaction_service_1.TransactionService();
app.post("/add-transaction", (req, res) => {
    transactionService.createTransaction(req, res);
});
app.get("/get-balance/:address", (req, res) => {
    transactionService.getTransaction(req, res);
});
app.get("/transaction-history/:address", (req, res) => {
    transactionService.getTransactionHistory(req, res);
});
app.use((req, res) => {
    return res.status(404).json({ message: "PAGE NOT FOUND" });
});
app.listen(9100, () => {
    console.log("SERVER STARTED......");
});
