// src/hooks/useSalesStats.ts
import { useQuery } from "@tanstack/react-query";
import { salesService } from "@/server/api/admin.sales.service";
import { ResponseError } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

export function useSalesStats(period: string, value: string) {
  const query = useQuery({
    queryKey: QueryKeys.Admin.SalesStats.detail(period, value),
    queryFn: () => salesService.getSalesStats(period, value),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat statistik"
      : undefined,
  };
}
