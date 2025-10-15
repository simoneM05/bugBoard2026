import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';
import { HttpException } from '@exceptions/HttpException';

export const ValidationMiddleware = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map(e => e.message).join(', ');
        return next(new HttpException(400, errors));
      }
      next(err);
    }
  };
};
