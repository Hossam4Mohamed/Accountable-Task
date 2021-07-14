import { Request } from 'express';

import { IRequestWithUser } from '@/util/types';

import {
  getAccessToken,
  updateUser,
  getUserByQuery,
  addUserToDatabase,
} from './user.service';

import { LOGIN_FAIL_ERR } from '@/util/errorHandler';
import { UserDTO } from './user.types';

export async function loginUser(req: Request): Promise<{ token: string }> {
  const { email } = req.body;

  const user = await getUserByQuery({ email });

  if (!user) throw LOGIN_FAIL_ERR;

  const token = getAccessToken(user.id as string, email);

  return { token };
}

export async function patchUserData(
  req: IRequestWithUser
): Promise<{ success: boolean }> {
  const data = req.body;

  await updateUser(req.user._id, data);

  return { success: true };
}

export async function addUser(req: Request): Promise<{ userData: UserDTO }> {
  const data = req.body;
  const newUser = await addUserToDatabase({ ...data, role: 'USER' });
  return { userData: newUser };
}
