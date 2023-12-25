import express from 'express';
import 'express-async-errors'; // use this to handle async errors
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@microtutorials/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

const app = express();
app.set('trust proxy', true); // trust ingress
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // false if test
  })
);

// routing
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// error handling
// unknown route error handling
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// use the error handling middleware created
app.use(errorHandler);

export { app };
