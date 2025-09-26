export interface CustomerDto {
  name: string;
  email: string;
  transactionCount: number;
  createdAt: Date;
}

export interface CustomerFilterDto {
  name?: string;
  page?: number;
  size?: number;
}
