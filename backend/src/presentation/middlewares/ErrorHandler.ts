import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/errors/AppError';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { MESSAGES } from '../../shared/constants/messages';
import logger from '../../infrastructure/logging/logger';
import { ApiResponse } from '../../shared/utils/ApiResponse';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn(`AppError: ${err.message}`);
    return ApiResponse.error(res, err.statusCode, err.message);
  }

  logger.error('Unhandled ERROR 💥', err);

  return ApiResponse.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
};
