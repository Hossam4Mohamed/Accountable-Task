import { AppRouter } from '@/util/AppRouter';

import { asyncTryCatch } from '@/util/errorHandler';

import { getTasks, addTask } from './task.controller';

import { appendUserToRequest } from '@/middleware/getUser';

import { isAdmin } from '@/middleware/roles';

import { isWorkerAuthorized } from '@/middleware/authorizeWorker';

const router = AppRouter.getInstance();

router.get('/tasks', appendUserToRequest, isAdmin, asyncTryCatch(getTasks));

router.post('/tasks', isWorkerAuthorized, asyncTryCatch(addTask));
