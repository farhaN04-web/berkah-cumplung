export interface TransactionDto {
  id: string;
  orderId: string;
  name?: string;
  total: number;
  status: string;
  shipping_status: string;
  shipping_number: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionDetailDto extends TransactionDto {
  TransactionDetails: {
    id: string;
    product_id: string;
    qty: number;
    price: number;
    sub_total: number;
  }[];
}

export interface UpdateStatusTransactionDto {
  status: string;
  shipping_status: string;
  shipping_number: string;
}

export interface TransactionFilterDto {
  status?: string;
  page?: number;
  size?: number;
}
