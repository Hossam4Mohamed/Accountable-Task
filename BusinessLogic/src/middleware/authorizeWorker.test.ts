import { Request, Response, NextFunction } from 'express';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

import { isWorkerAuthorized } from './authorizeWorker';

describe('Authorize Worker Middleware Function', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeAll(() => {
    process.env.WORKER_API_KEY = 'API_KEY';
  });

  test('Authorized Worker', async () => {
    mockReq = {
      headers: {
        api_key: 'API_KEY',
      },
    };

    await isWorkerAuthorized(
      mockReq as Request,
      mockRes as Response,
      nextFunction
    );
    expect(nextFunction).toBeCalledWith();
  });

  test('UnAuthorized Worker', async () => {
    mockReq = {
      headers: {
        api_key: 'STRING',
      },
    };

    await isWorkerAuthorized(
      mockReq as Request,
      mockRes as Response,
      nextFunction
    );
    expect(nextFunction).toBeCalledWith(UNAUTHORIZED_ERR);
  });
});
