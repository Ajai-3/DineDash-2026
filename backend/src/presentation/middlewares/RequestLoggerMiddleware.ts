import { Request, Response, NextFunction } from 'express';

export const RequestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(`Incoming request: ${req.method} ${fullUrl}`);
  next();
};
