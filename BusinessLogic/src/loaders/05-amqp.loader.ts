import * as Logger from 'signale';

import AmqpModule from '@/plugins/amqpModule';

export default async function load(): Promise<void> {
  try {
    await AmqpModule.bootstrap();
    Logger.success('Connected to AMQP successfully');
  } catch (e) {
    Logger.error('Error Connecting to AMQP');
    process.exit(1);
  }
}
