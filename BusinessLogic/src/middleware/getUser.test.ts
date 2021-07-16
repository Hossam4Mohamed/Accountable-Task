import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

import { appendUserToRequest } from './getUser';

import UserModel from '@/modules/User/user.model';

import { IRequestWithUser } from '@/util/types';

describe('Get User Middleware Function', () => {
  let mockReq: Partial<IRequestWithUser> = {};
  const mockRes: Partial<Response> = {};
  const nextFunction: NextFunction = jest.fn();

  jwt.verify = jest.fn().mockImplementation(() => ({
    userId: '1234',
  }));

  test('Authorization header not found', async () => {
    mockReq = {
      headers: {},
    };

    await appendUserToRequest(
      mockReq as IRequestWithUser,
      mockRes as Response,
      nextFunction
    );
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(UNAUTHORIZED_ERR);
  });

  test('UserID in token is not found', async () => {
    mockReq = {
      headers: {
        authorization: 'AUTH_TOKEN',
      },
    };

    UserModel.findById = jest.fn().mockImplementation(() => null);

    await appendUserToRequest(
      mockReq as IRequestWithUser,
      mockRes as Response,
      nextFunction
    );
    expect(jwt.verify).toBeCalledTimes(1);
    expect(UserModel.findById).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(UNAUTHORIZED_ERR);
    expect(mockReq.user).toBeUndefined();
  });

  test('UserID found and User appended to req', async () => {
    mockReq = {
      headers: {
        authorization: 'AUTH_TOKEN',
      },
    };

    UserModel.findById = jest.fn().mockImplementation(() => ({
      email: 'user@mail.com',
    }));

    await appendUserToRequest(
      mockReq as IRequestWithUser,
      mockRes as Response,
      nextFunction
    );
    expect(jwt.verify).toBeCalledTimes(1);
    expect(UserModel.findById).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith();
    expect(mockReq.user).toEqual({
      email: 'user@mail.com',
    });
  });
});
