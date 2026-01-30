export interface PaginationInterface<T> {
  list: Array<T>;
  limit: number;
  page: number;
  pages: number;
  total: number;
}
