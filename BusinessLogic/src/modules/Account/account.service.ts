import AccountModel from './account.model';

import { AccountDTO } from './account.types';

import { VALIDATION_ERROR } from '@/util/errorHandler';

export async function getAccounts(userId?: string): Promise<AccountDTO[]> {
  return AccountModel.find(userId ? { userId } : {});
}

export async function createAccount(
  userId: string,
  data: AccountDTO
): Promise<AccountDTO> {
  return AccountModel.create({ ...data, userId });
}

export async function updateAccount(
  userId: string,
  account: string,
  data: {
    bankAccessToken?: string;
    intervalFetching?: number;
  }
): Promise<void> {
  const accountIns = await AccountModel.findOne({ userId: userId, account });
  if (!accountIns) throw VALIDATION_ERROR('Account not found');
  return AccountModel.updateOne({ userId: userId, account }, { $set: data });
}
