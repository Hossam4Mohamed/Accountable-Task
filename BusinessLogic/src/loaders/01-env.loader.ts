import * as Logger from 'signale';
import * as dotenv from 'dotenv';

export default async function load(): Promise<void> {
  if (process.env.NODE_ENV === 'production') return;
  dotenv.config();
  Logger.info('Environment variables are read successfully');
}
