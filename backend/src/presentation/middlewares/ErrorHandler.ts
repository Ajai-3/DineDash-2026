import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/errors/AppError';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { MESSAGES } from '../../shared/constants/messages';
import logger from '../../infrastructure/logging/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn(`AppError: ${err.message}`);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  logger.error('Unhandled ERROR 💥', err);

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
  });
};
