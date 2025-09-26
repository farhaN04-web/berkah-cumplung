import { Status } from "@/types/enum";

export type ApiResponse<T, U, V> = {
  status: Status;
  code: number;
  message: string;
  data: T;
  paging: U;
  error: V;
};
