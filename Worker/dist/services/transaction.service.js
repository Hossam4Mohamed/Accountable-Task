"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSyncStatus = exports.storeTransactionsToDatabase = exports.fetchTransactions = void 0;
const axiosAgents_1 = require("../plugins/axiosAgents");
const amqpModule_1 = __importDefault(require("../plugins/amqpModule"));
const enums_1 = require("../util/enums");
async function fetchTransactions(bankAccessToken, intervalFetching) {
    const response = await axiosAgents_1.bankApiAxios.get('/transactions', {
        headers: {
            access_token: bankAccessToken,
        },
        params: {
            intervalFetching: intervalFetching,
        },
    });
    console.log({ response });
    return response.data;
}
exports.fetchTransactions = fetchTransactions;
async function storeTransactionsToDatabase(data) {
    await axiosAgents_1.baseAxios.post('/transactions', data);
}
exports.storeTransactionsToDatabase = storeTransactionsToDatabase;
async function sendSyncStatus(status) {
    return amqpModule_1.default.sendToQueue(enums_1.QueueName.AckQ, status);
}
exports.sendSyncStatus = sendSyncStatus;
//# sourceMappingURL=transaction.service.js.map