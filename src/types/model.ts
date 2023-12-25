export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}
