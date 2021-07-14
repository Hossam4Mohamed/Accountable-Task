import fs from 'fs';

import AccountModel from '@/modules/Account/account.model';

const logStream = fs.createWriteStream('task_technical_failure.log', {
  flags: 'a',
});

process.on('exit', () => logStream.end());

export async function removeNotValidToken(accountId: string): Promise<void> {
  await AccountModel.findByIdAndUpdate(accountId, {
    $set: { bankAccessToken: null },
  });
}

export async function storeTechnicalFailureToFile(
  accountId: string
): Promise<void> {
  const log = `${new Date().toISOString()}: Technical Error with fetching transactions related to accountID: ${accountId}\r\n`;
  logStream.write(log);
}
