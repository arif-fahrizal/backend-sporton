export interface BaseQueryTypes {
  search?: string;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface PaginationType extends Pick<BaseQueryTypes, 'page' | 'limit'> {
  total: number;
  totalPages: number;
}
