import TransactionModel from '@/modules/Transaction/transaction.model';

import { TransactionDTO, TransactionSearchable } from './transaction.types';

export async function getTransactions(
  userId: string | null,
  skip: number,
  limit: number,
  where?: TransactionSearchable
): Promise<TransactionDTO[]> {
  return TransactionModel.find(
    userId ? { userId, ...where } : { ...where },
    null,
    {
      skip,
      limit,
    }
  ).exec();
}

export async function storeTransactions(
  transactionsList: TransactionDTO[]
): Promise<TransactionDTO[]> {
  return TransactionModel.create(transactionsList);
}
