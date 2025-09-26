import { httpClient } from "@/lib/http-client"; // asumsi kamu pakai axios
import { ApiResponse } from "@/types";

type SalesByCategoryItem = {
  categoryId: string;
  categoryName: string;
  totalSold: number;
  totalRevenue: number;
};

type SalesStatsItem = {
  date: string;
  total: number;
  totalQty: number;
};

export const salesService = {
  getSalesByCategory: async (period: string, value: string) => {
    type SalesByCategoryResponse = ApiResponse<
      SalesByCategoryItem[],
      undefined,
      undefined
    >;

    const response = await httpClient.get<SalesByCategoryResponse>(
      `/admin/sales-by-category?period=${period}&value=${value}`,
    );

    return response;
  },

  getSalesStats: async (period: string, value: string) => {
    const response = await httpClient.get<
      ApiResponse<SalesStatsItem[], undefined, undefined>
    >(`/admin/sales-stats?period=${period}&value=${value}`);
    return response.data;
  },
};
