import { Response, NextFunction } from 'express';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

import { IRequestWithUser } from '@/util/types';

export async function isAdmin(
  req: IRequestWithUser,
  _: Response,
  next: NextFunction
): Promise<void> {
  const {
    user: { role },
  } = req;

  if (role !== 'ADMIN') next(UNAUTHORIZED_ERR);

  next();
}
