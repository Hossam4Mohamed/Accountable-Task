import { handleError } from '../util/errorHandler';
import * as Logger from 'signale';

import {
  fetchTransactions,
  storeTransactionsToDatabase,
  sendSyncStatus,
} from '../services/transaction.service';

import { TaskMetaData } from '../util/types';

export async function syncTransactions(data: TaskMetaData): Promise<void> {
  const {
    bankAccessToken,
    intervalFetching,
    account,
    _id: accountId,
    userId,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = data!;

  Logger.debug('start syncing for accountID %s', account);

  try {
    const transactions = await fetchTransactions(
      bankAccessToken,
      intervalFetching
    );

    Logger.debug(
      'finished syncing for accountID %s and transaction Length is %d',
      account,
      transactions.length
    );

    await storeTransactionsToDatabase(
      transactions.map((transaction) => ({ ...transaction, accountId, userId }))
    );

    Logger.debug('finished saving transactions for accountID %s', account);

    await sendSyncStatus({ success: true, accountId });
  } catch (e) {
    const errorObj = await handleError(e);
    await sendSyncStatus({
      ...errorObj,
      accountId,
    });
  }
}
