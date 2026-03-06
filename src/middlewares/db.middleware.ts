import { NextFunction, Request, Response } from 'express';
import { connectDB } from '../config/db';

export const dbMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
};
