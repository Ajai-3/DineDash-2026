import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/errors/AppError';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { MESSAGES } from '../../shared/constants/messages';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('ERROR 💥', err);

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
  });
};
