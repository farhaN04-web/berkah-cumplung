import { productsService } from "@/server/api/products.service";
import { ResponseError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/query-keys";

export function useProducts(
  name?: string,
  page?: number,
  size?: number,
  categoryId?: string,
) {
  const query = useQuery({
    queryKey: [
      ...QueryKeys.Products.all,
      name || "",
      page || 1,
      size || 10,
      categoryId || "",
    ],
    queryFn: () =>
      productsService.getProducts(
        name || "",
        page || 1,
        size || 10,
        categoryId || "",
      ),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat produk"
      : undefined,
  };
}

export function useProductById(id: string) {
  const query = useQuery({
    queryKey: QueryKeys.Products.detail(id),
    queryFn: () => productsService.getProductById(id),
    enabled: !!id,
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat produk"
      : undefined,
  };
}
