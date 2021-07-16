import { bankApiAxios, baseAxios } from '../plugins/axiosAgents';
import amqpModule from '../plugins/amqpModule';

import { TransactionDTO, SyncStatus } from '../util/types';
import { QueueName } from '../util/enums';

export async function fetchTransactions(
  bankAccessToken: string,
  intervalFetching: number
): Promise<TransactionDTO[]> {
  const response = await bankApiAxios.get('/transactions', {
    headers: {
      access_token: bankAccessToken,
    },
    params: {
      intervalFetching: intervalFetching,
    },
  });
  return response.data;
}

export async function storeTransactionsToDatabase(
  data: TransactionDTO[]
): Promise<void> {
  await baseAxios.post('/transactions', data);
}

export async function sendSyncStatus(status: SyncStatus): Promise<boolean> {
  return amqpModule.sendToQueue(QueueName.AckQ, status);
}
