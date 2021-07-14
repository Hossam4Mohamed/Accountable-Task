import { AppRouter } from '@/util/AppRouter';

import { asyncTryCatch } from '@/util/errorHandler';

import {
  getTransactionsBasedOnUser,
  addTransactionsList,
} from './transaction.controller';

import { appendUserToRequest } from '@/middleware/getUser';

import { isWorkerAuthorized } from '@/middleware/authorizeWorker';

const router = AppRouter.getInstance();

router.get(
  '/transactions',
  appendUserToRequest,
  asyncTryCatch(getTransactionsBasedOnUser)
);

router.post(
  '/transactions',
  isWorkerAuthorized,
  asyncTryCatch(addTransactionsList)
);
