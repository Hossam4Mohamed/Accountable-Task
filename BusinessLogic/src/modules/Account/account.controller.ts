import { IRequestWithUser } from '@/util/types';

import { getAccounts, updateAccount, createAccount } from './account.service';

import { AccountDTO } from './account.types';

export async function getAccountsBasedOnUser(
  req: IRequestWithUser
): Promise<AccountDTO[]> {
  const { _id: userId, role } = req.user;

  return getAccounts(role === 'ADMIN' ? null : userId);
}

export async function createAccountForUser(
  req: IRequestWithUser
): Promise<AccountDTO> {
  const { _id: userId } = req.user;
  const data = req.body;

  return createAccount(userId, data);
}

export async function patchAccountData(
  req: IRequestWithUser
): Promise<{ success: boolean }> {
  const { account, ...data } = req.body;

  await updateAccount(req.user.id, account, data);

  return { success: true };
}
