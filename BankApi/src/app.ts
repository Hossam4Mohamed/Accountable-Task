import express from 'express';
import jwt from 'jsonwebtoken';

import * as Logger from 'signale';

import { mockTransactionsList } from './helpers';

import {
  asyncTryCatch,
  UNAUTHORIZED_ERR,
  TECHNICAL_FAILURE_ERR,
} from './errorHandler';

const app = express();

app.get(
  '/refreshToken',
  asyncTryCatch(async (req, res) => {
    if (process.env.IS_UNAVAILABLE) throw TECHNICAL_FAILURE_ERR;

    const { account } = req.query;

    if (!account) throw UNAUTHORIZED_ERR;

    const token = jwt.sign(
      { account },
      process.env.SECRET_KEY || 'SECRET_KEY',
      {
        expiresIn: process.env.JWT_EXPIRES_PERIOD || 2 * 60 * 60,
      }
    );

    return { token };
  })
);

app.get(
  '/transactions',
  asyncTryCatch(async (req, res) => {
    if (process.env.IS_UNAVAILABLE) throw TECHNICAL_FAILURE_ERR;

    const { access_token } = req.headers;

    if (!access_token) throw UNAUTHORIZED_ERR;

    const { intervalFetching } = req.query;

    const payload = jwt.verify(
      access_token as string,
      process.env.SECRET_KEY || 'SECRET_KEY'
    ) as { account: string };

    if (!payload.account) throw UNAUTHORIZED_ERR;

    return mockTransactionsList(
      payload.account as string,
      Number(intervalFetching)
    );
  })
);

app.listen(process.env.PORT || 4000, () => {
  Logger.success(
    'Bank Api Server is listening on port: %s',
    process.env.PORT || 4000
  );
});
