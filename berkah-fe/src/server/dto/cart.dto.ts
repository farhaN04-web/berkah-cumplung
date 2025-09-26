export type AddToCartDTO = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemDTO = {
  cartId: string;
  quantity: number;
};

export type DeleteCartItemDTO = {
  cartId: string;
};

export type CheckoutCartDTO = {
  cartId: string[];
};

export type CheckoutDTO = {
  id: string;
  code: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
};

export type CheckoutItemDTO = {
  orderId: string;
  items: {
    productName: string;
    qty: number;
    price: number;
  }[];
};

export type CartItemDTO = {
  id: string;
  product_name: string;
  product_image: string;
  qty: number;
  price: number;
  subtotal: number;
};
