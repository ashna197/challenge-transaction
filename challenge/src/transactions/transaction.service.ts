import { Request, Response } from "express";
import { TransactionInfo } from "../model/transactionModel";
import { Blockchain, Transaction } from "../simpleBlockchain";
import { isString, isEmpty, isNumber, isInteger } from "lodash";
export class TransactionService {
  private blockchain = new Blockchain();
  constructor() {}

  public async createTransaction(req: Request, res: Response) {
    try {
      let { fromAddress, toAddress, amount } = req.body;
      const checkErrors = this.checkValidations(req.body);
      if (!isEmpty(checkErrors.errors)) {
        return res.status(400).json(checkErrors.errors);
      }
      fromAddress = fromAddress.toLowerCase();
      toAddress = toAddress.toLowerCase();
      const transaction: Transaction = { fromAddress, toAddress, amount };
      const result = this.blockchain.addTransaction(transaction);
      const details = new TransactionInfo(result);
      await details.save();
      return res.status(200).json({
        message: `Transaction of Amount : ${amount} is done fromAddress : ${fromAddress} --> toAddress : ${toAddress}`,
      });
    } catch (error) {
      throw new Error(
        `Error catched in createTransaction method: ${JSON.stringify(error)}`
      );
    }
  }

  getTransaction(req: Request, res: Response) {
    try {
      const paramAddress = req.params.address;
      const balanace = this.blockchain.getBalance(paramAddress.toLowerCase());
      return res
        .status(200)
        .json({ message: `Balanace for ${paramAddress} is : ${balanace}` });
    } catch (error) {
      throw new Error(
        `Error catched in getTransaction method: ${JSON.stringify(error)}`
      );
    }
  }

  async getTransactionHistory(req: Request, res: Response) {
    try {
      const paramAddress = req.params.address.toLowerCase();
      const result = await TransactionInfo.find(
        {
          $or: [
            { "transaction.fromAddress": `${paramAddress}` },
            { "transaction.toAddress": `${paramAddress}` },
          ],
        },
        { _id: 0, __v: 0, nonce: 0 }
      );
      return res.send(result);
    } catch (error) {
      throw new Error(
        `Error catched in getTransactionHistory method: ${JSON.stringify(
          error
        )}`
      );
    }
  }

  checkValidations(body: any) {
    let errors: any = [];
    const { fromAddress, toAddress, amount } = body;
    if (!isString(fromAddress) || isEmpty(fromAddress.trim())) {
      this.pushErrorDetails(
        "fromAddress is required , should be of type string and cannot be empty",
        "fromAddress",
        errors
      );
    }
    if (!isString(toAddress) || isEmpty(toAddress.trim())) {
      this.pushErrorDetails(
        "toAddress is required , should be of type string and cannot be empty",
        "toAddress",
        errors
      );
    }
    if (!isInteger(amount) || amount <= 0 || !amount) {
      this.pushErrorDetails(
        "amount is required and should be positive integer",
        "amount",
        errors
      );
    }
    return { errors };
  }

  pushErrorDetails(error: any, attribute: any, collector: any) {
    collector.push({ Attribute: attribute || "", detail: error });
  }
}
