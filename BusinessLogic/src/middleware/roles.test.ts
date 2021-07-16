import { Response, NextFunction } from 'express';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

import { isAdmin } from './roles';

import { IRequestWithUser } from '@/util/types';

describe('Get User Middleware Function', () => {
  let mockReq: Partial<IRequestWithUser> = {};
  const mockRes: Partial<Response> = {};
  const nextFunction: NextFunction = jest.fn();

  test('User role is not ADMIN', async () => {
    mockReq = {
      user: {
        role: 'NOT_ADMIN',
      },
    };

    await isAdmin(
      mockReq as IRequestWithUser,
      mockRes as Response,
      nextFunction
    );
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(UNAUTHORIZED_ERR);
  });

  test('User role is not ADMIN', async () => {
    mockReq = {
      user: {
        role: 'ADMIN',
      },
    };

    await isAdmin(
      mockReq as IRequestWithUser,
      mockRes as Response,
      nextFunction
    );
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith();
  });
});
