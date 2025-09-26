import { httpClient } from "@/lib/http-client";
import { ApiResponse, Pagination } from "@/types";
import { CustomerResponseDTO } from "@/server/dto/customer.dto";

class AdminCustomerService {
  async getCustomers(page?: number, size?: number) {
    const query = {
      page: page || 1,
      size: size || 10,
    };
    const response = await httpClient.get<
      ApiResponse<CustomerResponseDTO[], Pagination, undefined>
    >(`/admin/customers?page=${query.page}&size=${query.size}`);

    return response;
  }
}

export const adminCustomerService = new AdminCustomerService();
