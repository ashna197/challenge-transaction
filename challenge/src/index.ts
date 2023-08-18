import express, { Request, Response } from "express";
import { TransactionService } from "./transactions/transaction.service";

const app = express();

require("./database/database.service");

app.use(express.json());

const transactionService = new TransactionService();

app.post("/add-transaction", (req: Request, res: Response) => {
  transactionService.createTransaction(req, res);
});

app.get("/get-balance/:address", (req: Request, res: Response) => {
  transactionService.getTransaction(req, res);
});

app.get("/transaction-history/:address", (req: Request, res: Response) => {
  transactionService.getTransactionHistory(req, res);
});

app.use((req, res) => {
  return res.status(404).json({ message: "PAGE NOT FOUND" });
});

app.listen(9100, () => {
  console.log("SERVER STARTED......");
});
