import express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';
import compression from 'compression';

import helmet from 'helmet';

import * as Logger from 'signale';

export default async function load(app: express.Application): Promise<void> {
  try {
    app.use(compression());

    app.use(helmet());

    app.use(cors());

    app.use(methodOverride());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  } catch (e) {
    Logger.error('Exception happened in express loader: %s', e);
  }
}
