import envLoader from './01-env.loader';
import dbLoader from './02-db.loader';
import amqpConnectionLoader from './03-amqpConnection.loader';
import amqpConsumerLoader from './04-amqpConsumer.loader';

import { runPromisesSequentially } from '../util/asyncHelpers';

export async function init(): Promise<void> {
  runPromisesSequentially<() => Promise<void>, unknown>([
    envLoader,
    dbLoader,
    amqpConnectionLoader,
    amqpConsumerLoader,
  ]);
}
