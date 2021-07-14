import { NextFunction, Request, Response } from 'express';

import * as Logger from 'signale';

import { ErrorCode } from './enums';

export class CustomError extends Error {
  constructor(statusCode: number, code: ErrorCode, message: string) {
    super(message);
    Object.assign(this, {
      statusCode,
      code,
    });
  }
}

export const TECHNICAL_FAILURE_ERR = new CustomError(
  500,
  ErrorCode.TechnicalFailure,
  'The Bank is not available'
);
export const UNAUTHORIZED_ERR = new CustomError(
  401,
  ErrorCode.UnAuthorized,
  'You are not allowed to perform this action'
);
export const VALIDATION_ERROR = (message: string): CustomError =>
  new CustomError(422, ErrorCode.ValidationError, message);

export const handleError = (
  error: any,
  res: Response,
  debug?: boolean
): Response => {
  const { message, code, statusCode, stack } = error;
  const status = statusCode || 500;

  Logger[status === 500 ? 'error' : 'info'](
    `Error in handling Request with Following Details: ${
      code || 500
    } - ${message}`
  );

  if (debug) Logger.debug(stack);

  return res.status(status).json({
    code,
    message,
    success: false,
  });
};

export const asyncTryCatch =
  (
    handler: (req: Request, res?: Response, next?: NextFunction) => Promise<any>
  ) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await handler(req, res);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  };
