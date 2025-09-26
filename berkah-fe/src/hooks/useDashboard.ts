import { dashboardService } from "@/server/api/dashboard.service";
import { ResponseError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";

export function useTotalTransaction() {
  const query = useQuery({
    queryKey: QueryKeys.Dashboard.totalTransaction,
    queryFn: () => dashboardService.getTotalTransaction(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat total transaksi"
      : undefined,
  };
}

export function useCountTransaction() {
  const query = useQuery({
    queryKey: ["dashboard", "transaction", "count"],
    queryFn: () => dashboardService.getCountTransaction(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat jumlah transaksi"
      : undefined,
  };
}

export function useTotalProduct() {
  const query = useQuery({
    queryKey: ["dashboard", "products", "total"],
    queryFn: () => dashboardService.getTotalProduct(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat total produk"
      : undefined,
  };
}

export function useTotalCustomer() {
  const query = useQuery({
    queryKey: ["dashboard", "users", "total"],
    queryFn: () => dashboardService.getTotalCustomer(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat total pelanggan"
      : undefined,
  };
}
