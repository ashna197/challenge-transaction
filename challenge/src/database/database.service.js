"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
(function () {
    mongoose_1.default.connect("mongodb://localhost:27017/transactionDetails_DB", {}, (err) => {
        if (err)
            console.log("error is detected");
        else
            console.log("connection is made successfully");
    });
})();
