import { orderService } from "@/server/api/order.service";
import { ResponseError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";

export function useOrderHistory() {
  const query = useQuery({
    queryKey: QueryKeys.OrderHistory.all,
    queryFn: () => orderService.getOrderHistory(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat riwayat pemesanan"
      : undefined,
  };
}
