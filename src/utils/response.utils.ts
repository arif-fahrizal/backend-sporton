import { Response } from 'express';
import { PaginationType } from '../types/_index';

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  meta?: PaginationType
) => {
  return res
    .status(statusCode)
    .json({ status: statusCode, success: true, message, ...(data && { data }), ...(meta && { meta }) });
};
