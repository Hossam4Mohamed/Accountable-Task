import { QueueName } from '../util/enums';

type QueueConfig = {
  name: QueueName;
};

type AmqpConfig = {
  connectionURL: string;
  queues: { [queue: string]: QueueConfig };
};

export const amqpConfig: AmqpConfig = {
  connectionURL: process.env.AMQP_CONNECTION_URL || 'amqp://localhost:5672',
  queues: {
    taskQ: {
      name: QueueName.TaskQ,
    },
    ackQ: {
      name: QueueName.AckQ,
    },
  },
};
