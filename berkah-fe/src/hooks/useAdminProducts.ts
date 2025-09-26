import { adminProductsService } from "@/server/api/admin.products.service";
import { CreateProductDTO, UpdateProductDTO } from "@/server/dto/products.dto";
import { ResponseError } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryKeys } from "@/lib/query-keys";

export function useAdminProducts(page: number, size: number) {
  const query = useQuery({
    queryKey: [...QueryKeys.Admin.Products.all, page, size],
    queryFn: () => adminProductsService.getAllProducts(page || 1, size || 10),
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

export function useAdminProduct(id: string) {
  const query = useQuery({
    queryKey: QueryKeys.Admin.Products.detail(id),
    queryFn: () => adminProductsService.getProductById(id),
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

export function useCreateProduct() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: CreateProductDTO) => {
      return toast.promise(adminProductsService.createProduct(request), {
        loading: "Membuat produk...",
        success: (response) => response.message || "Produk berhasil dibuat!",
        error: (error: ResponseError) => {
          return (
            error.response?.message || error.message || "Gagal membuat produk"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Products.all,
        refetchType: "all",
      });
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal membuat produk"
      : undefined,
  };
}

export function useUpdateProduct() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateProductDTO) => {
      return toast.promise(adminProductsService.updateProduct(data), {
        loading: "Mengupdate produk...",
        success: (response) => response.message || "Produk berhasil diupdate!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal mengupdate produk"
          );
        },
      });
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Products.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Products.detail(variables.id),
        refetchType: "all",
      });
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal mengupdate produk"
      : undefined,
  };
}

export function useDeleteProduct() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(adminProductsService.deleteProduct(id), {
        loading: "Menghapus produk...",
        success: (response) => response.message || "Produk berhasil dihapus!",
        error: (error: ResponseError) => {
          return (
            error.response?.message || error.message || "Gagal menghapus produk"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Products.all,
        refetchType: "all",
      });
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal menghapus produk"
      : undefined,
  };
}
