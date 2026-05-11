import { ZodObject, ZodError, ZodTypeAny } from 'zod';
import { ValidationError } from '../../core/errors/ValidationError';

export class Validator {
  static async validate<T>(schema: ZodTypeAny, data: unknown): Promise<T> {
    try {
      const result = await schema.parseAsync(data);
      return result as T;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join(', ');
        throw new ValidationError(message);
      }
      throw error;
    }
  }
}
