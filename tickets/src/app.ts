import express from 'express';
import 'express-async-errors'; // use this to handle async errors
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@microtutorials/common';

const app = express();
app.set('trust proxy', true); // trust ingress
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' // false if test
  })
);

// error handling
// unknown route error handling
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// use the error handling middleware created
app.use(errorHandler);

export { app };
