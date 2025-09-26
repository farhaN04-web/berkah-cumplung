import { httpClient } from "@/lib/http-client";
import { OrderHistoryDTO } from "@/server/dto/order.dto";
import { Pagination } from "@/types/pagination";
import { ApiResponse } from "@/types";

class OrderService {
  async getOrderHistory() {
    const response = await httpClient.get<
      ApiResponse<OrderHistoryDTO[], Pagination, undefined>
    >("/user/order-history");

    return response;
  }
}

export const orderService = new OrderService();
