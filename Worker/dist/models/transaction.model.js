"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    account: { type: String },
    amount: { type: Number },
    creditCardNumber: { type: String },
    transactionDescription: { type: String },
    transactionType: { type: String },
    currencyName: { type: String },
    iban: { type: String },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
const transactionModel = mongoose_1.model('Transaction', TransactionSchema);
exports.default = transactionModel;
//# sourceMappingURL=transaction.model.js.map