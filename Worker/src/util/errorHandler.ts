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

export const handleError = async (
  error: any,
  debug?: boolean
): Promise<{
  reasonOfFailure: string;
  success: boolean;
  accessInvalid: boolean;
  code: string;
}> => {
  const { message, code, stack } = error.isAxiosError
    ? error.response.data
    : error;

  const status = error.isAxiosError
    ? error.response.status
    : error.statusCode || 500;

  Logger[status === 500 ? 'error' : 'info'](
    `Error in handling Request with Following Details: ${
      code || 500
    } - ${message}`
  );

  if (debug) Logger.debug(stack);

  console.log({ error: error.response.data });

  console.log({ status });
  return {
    code,
    reasonOfFailure: message,
    success: false,
    accessInvalid: status === 401,
  };
};
