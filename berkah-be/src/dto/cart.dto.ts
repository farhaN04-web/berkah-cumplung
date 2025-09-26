export interface CartResponseDto {
  id: string;
  product_name: string;
  qty: number;
  price: number;
  subtotal: number;
}

export interface AddCartDto {
  product_id: string;
  qty: number;
}

export interface UpdateCartDto {
  qty?: number;
}
