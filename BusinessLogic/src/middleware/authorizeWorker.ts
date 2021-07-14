import { Request, Response, NextFunction } from 'express';

import { UNAUTHORIZED_ERR } from '@/util/errorHandler';

export async function isWorkerAuthorized(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { api_key } = req.headers;

  if (api_key !== process.env.WORKER_API_KEY) next(UNAUTHORIZED_ERR);

  next();
}
