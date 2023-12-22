import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if any errors exists
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // calls error handler
    throw new RequestValidationError(errors.array());
  }

  next();
};
