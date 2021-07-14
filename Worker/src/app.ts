import * as Logger from 'signale';

import { init } from './loaders';

async function bootstrap() {
  await init();
}

bootstrap();

// Handle warning and errors.
process.on('unhandledRejection', (reason, promise) => {
  Logger.warn('Unhandled Rejection at: %s, reason: %s', promise, reason);

  //Future logic.
});

process.on('warning', (warning) => {
  Logger.warn(
    'Node.js warning -> name: %s , message: %s , stack: %s',
    warning.name,
    warning.message,
    warning.stack
  );
});
