import { IRequestWithUser } from '@/util/types';
import { Request } from 'express';

import { getTransactions, storeTransactions } from './transaction.service';

import { TransactionReqQuery, TransactionDTO } from './transaction.types';

export async function getTransactionsBasedOnUser(
  req: IRequestWithUser
): Promise<TransactionDTO[]> {
  const { _id: userId, role } = req.user;

  const { where = {}, skip = 0, limit = 0 } = req.query as TransactionReqQuery;

  return getTransactions(role === 'ADMIN' ? null : userId, skip, limit, where);
}

export async function addTransactionsList(
  req: Request
): Promise<{ success: boolean }> {
  const data = req.body;

  await storeTransactions(data);

  return {
    success: true,
  };
}
