import { Application } from 'express';

import envLoader from './01-env.loader';
import dbLoader from './02-db.loader';
import expressLoader from './03-express.loader';
import routesLoader from './04-routes.loader';
import amqpLoader from './05-amqp.loader';
import cronLoader from './06-cron.loader';
import seedLoader from './99-seed.loader';

import { runPromisesSequentially } from '@/util/asyncHelpers';

export async function init(expressApp: Application): Promise<void> {
  runPromisesSequentially<Application, (app: Application) => Promise<void>>(
    [
      envLoader,
      dbLoader,
      expressLoader,
      routesLoader,
      amqpLoader,
      cronLoader,
      seedLoader,
    ],
    expressApp
  );
}
