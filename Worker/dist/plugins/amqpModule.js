"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("../config");
class AmqpModule {
    static async connect() {
        if (this.channelSingleton)
            return this.channelSingleton;
        const connection = await amqplib_1.default.connect(config_1.amqpConfig.connectionURL);
        this.channelSingleton = await connection.createChannel();
        this.channelSingleton.prefetch(1);
        return this.channelSingleton;
    }
    static async setQueues(channel) {
        Object.values(config_1.amqpConfig.queues).forEach((queue) => {
            channel.assertQueue(queue.name, {
                durable: true,
            });
        });
    }
    static async bootstrap() {
        const channel = await this.connect();
        await this.setQueues(channel);
    }
    static async sendToQueue(queue, msg) {
        const channel = await this.connect();
        const msgStringified = JSON.stringify(msg);
        return channel.sendToQueue(queue, Buffer.from(msgStringified), {
            persistent: true,
        });
    }
    static async consumeQueue(queue, handler) {
        const channel = await this.connect();
        channel.consume(queue, async (message) => {
            if (!message)
                return;
            await handler(JSON.parse(message.content.toString()));
            channel.ack(message);
        });
    }
}
exports.default = AmqpModule;
//# sourceMappingURL=amqpModule.js.map