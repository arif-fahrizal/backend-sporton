import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ status: false, message: 'Unauthorized' });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET || '');

    req.user = decode;

    next();
  } catch (error) {
    console.error('Auth Error', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
