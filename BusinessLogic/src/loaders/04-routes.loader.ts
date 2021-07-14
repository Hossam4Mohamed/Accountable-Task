import { Application, NextFunction, Request, Response } from 'express';

import { AppRouter } from '@/util/AppRouter';

import '@/modules/Transaction/transaction.routes';
import '@/modules/User/user.routes';
import '@/modules/Account/account.routes';
import '@/modules/Task/task.routes';

import { handleError, NOT_FOUND_ERR } from '@/util/errorHandler';

const router = AppRouter.getInstance();

export default async function load(app: Application): Promise<void> {
  app.use('/api', router);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(NOT_FOUND_ERR);
  });

  app.use(function (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __: NextFunction
  ): void {
    handleError(err, res);
  });
}
