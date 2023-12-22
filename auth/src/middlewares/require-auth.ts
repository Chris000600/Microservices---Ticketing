import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // assumes that the currentUser middleware have been run beforehand
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
