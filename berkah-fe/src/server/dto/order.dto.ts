export type OrderItemDTO<T> = {
  id: string;
  orderId: string;
  name: string;
  total: number;
  status: string;
  // payment_status: string;
  shipping_status: string;
  shipping_number: string;
  createdAt: string;
  updatedAt: string;
  TransactionDetails: T;
};

export type TransactionDetailsDTO = {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  qty: number;
  price: number;
  sub_total: number;
};

export type UpdateOrderStatusDTO = {
  id: string;
  status: string;
  // payment_status: string;
  shipping_status: string;
  shipping_number?: string;
};

export type OrderHistoryDTO = {
  id: string;
  code: string;
  userId: string;
  total: number;
  status: string;
  shipping_status: string;
  shipping_number: string;
  createdAt: string;
  updatedAt: string;
  TransactionDetails: {
    id: string;
    product_id: string;
    qty: number;
    price: number;
    sub_total: number;
    product: {
      id: string;
      name: string;
      image: string;
    };
  }[];
};
