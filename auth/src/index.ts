import express from 'express';
import 'express-async-errors'; // use this to handle async errors
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

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

// using the error handling middleware we created
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
