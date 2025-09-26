import { useQuery } from "@tanstack/react-query";
import { adminCustomerService } from "@/server/api/admin.customer.service";
import { ResponseError } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

export function useCustomers(page: number, size: number) {
  const query = useQuery({
    queryKey: [...QueryKeys.Customers.all, page, size],
    queryFn: () => adminCustomerService.getCustomers(page, size),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat data pelanggan"
      : undefined,
  };
}
