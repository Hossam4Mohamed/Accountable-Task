import { baseAxios } from '../plugins/axiosAgents';

import { SyncStatus } from '../util/types';

export async function storeSyncStatus(status: SyncStatus): Promise<void> {
  await baseAxios.post('/tasks', status);
}
