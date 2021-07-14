import { AppRouter } from '@/util/AppRouter';

import { asyncTryCatch } from '@/util/errorHandler';

import { appendUserToRequest } from '@/middleware/getUser';

import {
  getAccountsBasedOnUser,
  patchAccountData,
  createAccountForUser,
} from './account.controller';

const router = AppRouter.getInstance();

router.use('/accounts', appendUserToRequest);

router.get('/accounts', asyncTryCatch(getAccountsBasedOnUser));

router.post('/accounts', asyncTryCatch(createAccountForUser));

router.patch('/accounts', asyncTryCatch(patchAccountData));
