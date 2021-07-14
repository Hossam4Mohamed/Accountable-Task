import { Request } from 'express';

import {
  removeNotValidToken,
  storeTechnicalFailureToFile,
} from './task.service';

import TaskModel from './task.model';
import { TaskDTO } from './task.types';

export async function getTasks(_: Request): Promise<TaskDTO[]> {
  return TaskModel.find();
}

export async function addTask(req: Request): Promise<{ success: boolean }> {
  const data = req.body;

  const { success, accountId, accessInvalid } = data;

  if (!success && accessInvalid) {
    await removeNotValidToken(accountId);
  }

  if (!success && !accessInvalid) {
    await storeTechnicalFailureToFile(accountId);
  }

  await TaskModel.create(data);

  return {
    success: true,
  };
}
