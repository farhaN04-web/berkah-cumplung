export class BaseResponseDto<T> {
  status?: string;
  code?: number;
  message?: string;
  data?: T;
  error?: string;
  paging?: Paging;
}

export interface Paging {
  size: number;
  page: number;
  current_page: number;
  total_page: number;
}
