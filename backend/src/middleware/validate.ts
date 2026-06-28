import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const isProduction = process.env.NODE_ENV === 'production';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        res.status(400).json({
          error: 'Validation failed',
          ...(isProduction ? {} : { details }),
        });
        return;
      }
      next(error);
    }
  };
}
