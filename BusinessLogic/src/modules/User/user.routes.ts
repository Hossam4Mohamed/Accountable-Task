import { AppRouter } from '@/util/AppRouter';

import { asyncTryCatch } from '@/util/errorHandler';

import { appendUserToRequest } from '@/middleware/getUser';

import { isAdmin } from '@/middleware/roles';

import { loginUser, patchUserData, addUser } from './user.controller';

const router = AppRouter.getInstance();

router.post('/users/login', asyncTryCatch(loginUser));

router.post('/users', appendUserToRequest, isAdmin, asyncTryCatch(addUser));

router.patch('/users/me', appendUserToRequest, asyncTryCatch(patchUserData));
