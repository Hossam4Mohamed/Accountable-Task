import { Request, Response } from 'express';

import { VALIDATION_ERROR } from '@/util/errorHandler';

import { asyncTryCatch } from './errorHandler';

describe('Error Handler Utility', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {
    status: jest
      .fn()
      .mockImplementation((code: number) => ({ ...mockRes, statusCode: code })),
    json: jest.fn(),
  };

  test('Return response json with result and status code 200', async () => {
    const handler = jest
      .fn()
      .mockImplementation(() => Promise.resolve('success'));

    await asyncTryCatch(handler)(mockReq as Request, mockRes as Response);
    expect(handler).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith('success');
    expect(mockRes.status).toBeCalledWith(200);
  });

  test('Throw error on calling the handler', async () => {
    const handler = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(VALIDATION_ERROR('Dummy Error'))
      );

    await asyncTryCatch(handler)(mockReq as Request, mockRes as Response);
    expect(handler).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      code: 'VALIDATION_ERROR',
      message: 'Dummy Error',
      success: false,
    });
    expect(mockRes.status).toBeCalledWith(422);
  });
});
