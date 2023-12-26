import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // not really used, specific to express library
  // a different solution is used to handle async errors ('express-async-errors')
  next: NextFunction
) => {
  // check if error is one of our expected errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // unknown errors
  console.error(err);
  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
