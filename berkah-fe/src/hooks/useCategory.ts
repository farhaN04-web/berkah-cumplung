import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/server/api/categories.service";
import { QueryKeys } from "@/lib/query-keys";
import { ResponseError } from "@/types";

export function useCategories() {
  const query = useQuery({
    queryKey: QueryKeys.Categories.all,
    queryFn: () => categoriesService.getCategories(),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat kategori"
      : undefined,
  };
}
