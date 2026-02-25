import { Request } from 'express';

export class ProductValidator {
  static validateGetProducts(req: Request) {
    let error;

    const { page, limit, sort } = req.query;

    if (page && (isNaN(Number(page)) || Number(page) < 1)) {
      error = 'Page must be positive number';
    }

    if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
      error = 'Limit must be between 1 and 100';
    }

    if (sort && !['asc', 'desc'].includes(sort as string)) {
      error = 'Sort must be either "asc" or "desc"';
    }

    return error;
  }
}
