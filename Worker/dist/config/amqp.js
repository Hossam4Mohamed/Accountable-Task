"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amqpConfig = void 0;
const enums_1 = require("../util/enums");
exports.amqpConfig = {
    connectionURL: process.env.AMQP_CONNECTION_URL || 'amqp://localhost:5672',
    queues: {
        taskQ: {
            name: enums_1.QueueName.TaskQ,
        },
        ackQ: {
            name: enums_1.QueueName.AckQ,
        },
    },
};
//# sourceMappingURL=amqp.js.map