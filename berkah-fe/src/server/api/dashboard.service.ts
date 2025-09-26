import { httpClient } from "@/lib/http-client";
import { ApiResponse } from "@/types";

class DashboardService {
  async getTotalTransaction() {
    const response = await httpClient.get<
      ApiResponse<number, undefined, undefined>
    >("/admin/dashboard/get-total-transaction");

    return response;
  }

  async getCountTransaction() {
    const response = await httpClient.get<
      ApiResponse<number, undefined, undefined>
    >("/admin/dashboard/get-count-transaction");

    return response;
  }

  async getTotalProduct() {
    const response = await httpClient.get<
      ApiResponse<number, undefined, undefined>
    >("/admin/dashboard/get-product-total");

    return response;
  }

  async getTotalCustomer() {
    const response = await httpClient.get<
      ApiResponse<number, undefined, undefined>
    >("/admin/dashboard/get-customer-total");

    return response;
  }
}

export const dashboardService = new DashboardService();
