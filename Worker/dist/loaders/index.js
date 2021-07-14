"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const _01_env_loader_1 = __importDefault(require("./01-env.loader"));
const _02_db_loader_1 = __importDefault(require("./02-db.loader"));
const _03_amqpConnection_loader_1 = __importDefault(require("./03-amqpConnection.loader"));
const _04_amqpConsumer_loader_1 = __importDefault(require("./04-amqpConsumer.loader"));
const asyncHelpers_1 = require("../util/asyncHelpers");
async function init() {
    asyncHelpers_1.runPromisesSequentially([
        _01_env_loader_1.default,
        _02_db_loader_1.default,
        _03_amqpConnection_loader_1.default,
        _04_amqpConsumer_loader_1.default,
    ]);
}
exports.init = init;
//# sourceMappingURL=index.js.map