import { ZodTypeAny, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../core/errors/ValidationError';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join(', ');
        return next(new ValidationError(message));
      }
      next(error);
    }
  };
};
