import schedule from 'node-schedule';

import { populateQueue } from '@/util/cronHandler';

export default async function load(): Promise<void> {
  const job1 = schedule.scheduleJob('*/1 * * * *', () => populateQueue(1));
  const job3 = schedule.scheduleJob('*/3 * * * *', () => populateQueue(3));
  const job6 = schedule.scheduleJob('*/6 * * * *', () => populateQueue(6));

  process.on('exit', () => [job1, job3, job6].map((job) => job.cancel()));
}
