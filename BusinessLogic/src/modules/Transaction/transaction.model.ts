import { Schema, model, Types } from 'mongoose';

const TransactionSchema = new Schema(
  {
    amount: { type: Number },
    creditCardNumber: { type: String },
    transactionDescription: { type: String },
    transactionType: { type: String },
    currencyName: { type: String },
    iban: { type: String },
    accountId: { type: Types.ObjectId, ref: 'Account' },
    userId: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const transactionModel = model('Transaction', TransactionSchema);

export default transactionModel;
