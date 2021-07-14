import amqp, { Channel, ConsumeMessage } from 'amqplib';

import { amqpConfig } from '../config';

export default class AmqpModule {
  private static channelSingleton: Channel;

  static async connect(): Promise<Channel> {
    if (this.channelSingleton) return this.channelSingleton;
    const connection = await amqp.connect(amqpConfig.connectionURL);
    this.channelSingleton = await connection.createChannel();
    this.channelSingleton.prefetch(1);
    return this.channelSingleton;
  }

  static async setQueues(channel: Channel): Promise<void> {
    Object.values(amqpConfig.queues).forEach((queue: { name: string }) => {
      channel.assertQueue(queue.name, {
        durable: true,
      });
    });
  }

  static async bootstrap(): Promise<void> {
    const channel = await this.connect();
    await this.setQueues(channel);
  }

  static async sendToQueue(queue: string, msg: any): Promise<boolean> {
    const channel = await this.connect();
    const msgStringified = JSON.stringify(msg);
    return channel.sendToQueue(queue, Buffer.from(msgStringified), {
      persistent: true,
    });
  }

  static async consumeQueue<T>(
    queue: string,
    handler: (message: T) => Promise<void>
  ): Promise<void> {
    const channel = await this.connect();

    channel.consume(queue, async (message: ConsumeMessage | null) => {
      if (!message) return;
      await handler(JSON.parse(message.content.toString()));
      channel.ack(message);
    });
  }
}
