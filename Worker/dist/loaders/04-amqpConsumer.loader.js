"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqpModule_1 = __importDefault(require("../plugins/amqpModule"));
const enums_1 = require("../util/enums");
const transaction_handler_1 = require("../handlers/transaction.handler");
const task_handler_1 = require("../handlers/task.handler");
async function load() {
    await amqpModule_1.default.consumeQueue(enums_1.QueueName.TaskQ, transaction_handler_1.syncTransactions);
    await amqpModule_1.default.consumeQueue(enums_1.QueueName.AckQ, task_handler_1.persistTaskStatus);
}
exports.default = load;
//# sourceMappingURL=04-amqpConsumer.loader.js.map