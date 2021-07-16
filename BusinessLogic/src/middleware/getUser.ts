import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import UserModel from '@/modules/User/user.model';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

import { IRequestWithUser } from '@/util/types';

export async function appendUserToRequest(
  req: IRequestWithUser,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) return next(UNAUTHORIZED_ERR);

  try {
    const payload = jwt.verify(
      authorization as string,
      process.env.JWT_SECRET || 'JWT_SECRET'
    ) as { userId: string };

    const { userId } = payload;
    const user = await UserModel.findById(userId);
    if (!user) return next(UNAUTHORIZED_ERR);
    req.user = user;

    return next();
  } catch (e) {
    return next(UNAUTHORIZED_ERR);
  }
}
