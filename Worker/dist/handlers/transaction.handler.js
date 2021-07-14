"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncTransactions = void 0;
const errorHandler_1 = require("../util/errorHandler");
const Logger = __importStar(require("signale"));
const transaction_service_1 = require("../services/transaction.service");
async function syncTransactions(data) {
    const { bankAccessToken, intervalFetching, account, _id: accountId, userId, } = data;
    Logger.debug('start syncing for accountID %s', account);
    try {
        const transactions = await transaction_service_1.fetchTransactions(bankAccessToken, intervalFetching);
        Logger.debug('finished syncing for accountID %s and transaction Length is %d', account, transactions.length);
        await transaction_service_1.storeTransactionsToDatabase(transactions.map((transaction) => ({ ...transaction, accountId, userId })));
        Logger.debug('finished saving transactions for accountID %s', account);
        await transaction_service_1.sendSyncStatus({ success: true, accountId });
    }
    catch (e) {
        const errorObj = await errorHandler_1.handleError(e);
        await transaction_service_1.sendSyncStatus({
            ...errorObj,
            accountId,
        });
    }
}
exports.syncTransactions = syncTransactions;
//# sourceMappingURL=transaction.handler.js.map