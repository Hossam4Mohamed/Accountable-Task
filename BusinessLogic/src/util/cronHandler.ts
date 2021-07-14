import * as Logger from 'signale';

import { Document } from 'mongoose';

import AmqpModule from '@/plugins/amqpModule';

import AccountModel from '@/modules/Account/account.model';

import { QueueName } from '@/util/enums';

export async function populateQueue(intervalFetching: number): Promise<void> {
  Logger.info('Start Populating Queue for interval %d', intervalFetching);
  const accounts: Document[] = await AccountModel.find({
    intervalFetching,
    bankAccessToken: { $exists: true, $ne: null },
  });
  accounts.map((account: Document) => {
    AmqpModule.sendToQueue(QueueName.TaskQ, account.toJSON());
  });
}
