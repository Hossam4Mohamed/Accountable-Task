import AmqpModule from '../plugins/amqpModule';
import { QueueName } from '../util/enums';

import { syncTransactions } from '../handlers/transaction.handler';
import { persistTaskStatus } from '../handlers/task.handler';
import { SyncStatus, TaskMetaData } from '../util/types';

export default async function load(): Promise<void> {
  await AmqpModule.consumeQueue<TaskMetaData>(
    QueueName.TaskQ,
    syncTransactions
  );
  await AmqpModule.consumeQueue<SyncStatus>(QueueName.AckQ, persistTaskStatus);
}
