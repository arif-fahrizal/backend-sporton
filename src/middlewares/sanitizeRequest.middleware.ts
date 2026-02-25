import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'express-mongo-sanitize';

export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  if (req.query) {
    const sanitizedQuery = sanitize({ ...req.query });
    Object.keys(sanitizedQuery).forEach(key => {
      (req.query as any)[key] = (sanitizedQuery as any)[key];
    });
  }
  next();
};
