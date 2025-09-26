import { httpClient } from "@/lib/http-client";
import { ApiResponse, Pagination } from "@/types";
import {
  OrderItemDTO,
  TransactionDetailsDTO,
  UpdateOrderStatusDTO,
} from "@/server/dto/order.dto";

class AdminOrderService {
  async getOrders(status?: string, page?: number, size?: number) {
    const query = {
      status: status || "",
      page: page || 1,
      size: size || 10,
    };

    const response = await httpClient.get<
      ApiResponse<OrderItemDTO<undefined>[], Pagination, undefined>
    >(
      `/admin/transactions?page=${query.page}&size=${query.size}&status=${query.status}`,
    );

    return response;
  }

  async getOrderById(id: string) {
    const response = await httpClient.get<
      ApiResponse<OrderItemDTO<TransactionDetailsDTO[]>, undefined, undefined>
    >(`/admin/transactions/${id}`);

    return response;
  }

  async updateOrderStatus(request: UpdateOrderStatusDTO) {
    const response = await httpClient.put<
      ApiResponse<undefined, undefined, undefined>
    >(`/admin/transactions/${request.id}`, {
      status: request.status,
      // payment_status: request.payment_status,
      shipping_status: request.shipping_status,
      shipping_number: request.shipping_number,
    });

    return response;
  }
}

export const adminOrderService = new AdminOrderService();
