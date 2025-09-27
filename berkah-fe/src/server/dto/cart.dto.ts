// DTO untuk item yang ditampilkan di keranjang
export type CartItemDTO = {
  id: string; // ID dari item di keranjang
  product_name: string;
  product_image: string;
  qty: number;
  price: number;
  subtotal: number;
};

// DTO untuk menambah item ke keranjang
export interface AddToCartDTO {
  productId: string;
  quantity: number;
}

// DTO untuk mengupdate item di keranjang
export interface UpdateCartItemDTO {
  cartId: string;
  quantity: number;
}

// DTO untuk menghapus item dari keranjang
export type DeleteCartItemDTO = {
  cartId: string;
};

// DTO untuk payload checkout, TERMASUK PENGIRIMAN
export interface CheckoutPayloadDTO {
  items: {
    product_id: string;
    qty: number;
  }[];
  expedition_id: string;
  shipping_cost: number;
  address: string;
}

// DTO untuk respons setelah checkout berhasil
export interface CheckoutResultDTO {
  id: string;
  code: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}