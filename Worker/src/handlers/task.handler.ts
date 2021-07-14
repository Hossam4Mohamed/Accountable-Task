import { storeSyncStatus } from '../services/task.service';

import { SyncStatus } from '../util/types';

export async function persistTaskStatus(message: SyncStatus): Promise<void> {
  await storeSyncStatus(message);
}
