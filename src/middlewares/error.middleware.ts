import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    status: error.status || 'Error',
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
