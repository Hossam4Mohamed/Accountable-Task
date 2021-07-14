"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTransactionsList = void 0;
const faker_1 = __importDefault(require("faker"));
var financeProps;
(function (financeProps) {
    financeProps["amount"] = "amount";
    financeProps["currencyName"] = "currencyName";
    financeProps["creditCardNumber"] = "creditCardNumber";
    financeProps["iban"] = "iban";
    financeProps["transactionDescription"] = "transactionDescription";
    financeProps["transactionType"] = "transactionType";
})(financeProps || (financeProps = {}));
const randomNumber = (intervalFetching = 1) => Math.floor(Math.random() *
    (Number(process.env.MAX_TRANSACTIONS_NUMBER) || 10) *
    intervalFetching) + 1;
exports.mockTransactionsList = (account, intervalFetching) => Array.from({ length: randomNumber(intervalFetching) }).map(() => Object.keys(financeProps).reduce((acc, cat) => {
    acc[cat] = faker_1.default.finance[cat]();
    return acc;
}, { account }));
//# sourceMappingURL=helpers.js.map