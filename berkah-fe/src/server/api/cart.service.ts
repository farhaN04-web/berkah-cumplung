import { httpClient } from "@/lib/http-client";
import {
  AddToCartDTO,
  CartItemDTO,
  CheckoutCartDTO,
  CheckoutDTO,
  DeleteCartItemDTO,
  UpdateCartItemDTO,
} from "@/server/dto/cart.dto";
import { ApiResponse } from "@/types";

class CartService {
  async getCart() {
    const response =
      await httpClient.get<ApiResponse<CartItemDTO[], undefined, undefined>>(
        "/user/cart",
      );

    return response;
  }

  async addToCart(request: AddToCartDTO) {
    const response = await httpClient.post<
      ApiResponse<CartItemDTO[], undefined, undefined>
    >("/user/cart", {
      product_id: request.productId,
      qty: request.quantity,
    });

    return response;
  }

  async updateCartItem(request: UpdateCartItemDTO) {
    const response = await httpClient.put<
      ApiResponse<CartItemDTO[], undefined, undefined>
    >(`/user/cart/${request.cartId}`, {
      qty: request.quantity,
    });

    return response;
  }

  async deleteCartItem(request: DeleteCartItemDTO) {
    const response = await httpClient.delete<
      ApiResponse<CartItemDTO[], undefined, undefined>
    >(`/user/cart/${request.cartId}`);

    return response;
  }

  async checkoutCart(request: CheckoutCartDTO) {
    const response = await httpClient.post<
      ApiResponse<CheckoutDTO, undefined, undefined>
    >("/user/cart/checkout", {
      cartIds: request.cartId,
    });

    return response;
  }
}

export const cartService = new CartService();
