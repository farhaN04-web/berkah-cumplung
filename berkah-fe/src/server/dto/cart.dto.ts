export type CartItemDTO = {
  id: string;
  product_name: string;
  product_image: string;
  qty: number;
  price: number;
  subtotal: number;
};

export interface AddToCartDTO {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDTO {
  cartId: string;
  quantity: number;
}

export type DeleteCartItemDTO = {
  cartId: string;
};

export interface CheckoutPayloadDTO {
  items: {
    product_id: string;
    qty: number;
  }[];
  expedition_id: string;
  shipping_cost: number;
  address: string;
}

export interface CheckoutResultDTO {
  id: string;
  code: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}