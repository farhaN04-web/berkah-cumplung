import { Status } from "@/types/enum";

export type ApiResponse<T, U = undefined, V = undefined> = {
  status: Status;
  code: number;
  message: string;
  data?: T;      
  paging?: U;    
  error?: V;     
};