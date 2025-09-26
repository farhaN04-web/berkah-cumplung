import { adminCategoriesService } from "@/server/api/admin.categories.service";
import { ResponseError } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryKeys } from "@/lib/query-keys";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/server/dto/categories.dto";

export function useAdminCategories(page: number, size: number) {
  const query = useQuery({
    queryKey: [...QueryKeys.Admin.Categories.all, page, size],
    queryFn: () =>
      adminCategoriesService.getAllCategories(page || 1, size || 10),
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

export function useAdminCategory(id: string) {
  const query = useQuery({
    queryKey: QueryKeys.Admin.Categories.detail(id),
    queryFn: () => adminCategoriesService.getCategoryById(id),
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

export function useCreateCategory() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: CreateCategoryDTO) => {
      return toast.promise(adminCategoriesService.createCategory(request), {
        loading: "Membuat kategori...",
        success: (response) => response.message || "Kategori berhasil dibuat!",
        error: (error: ResponseError) => {
          return (
            error.response?.message || error.message || "Gagal membuat kategori"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Categories.all,
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

export function useUpdateCategory() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateCategoryDTO) => {
      return toast.promise(adminCategoriesService.updateCategory(data), {
        loading: "Mengupdate kategori...",
        success: (response) =>
          response.message || "Kategori berhasil diupdate!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal mengupdate kategori"
          );
        },
      });
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Categories.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Categories.detail(variables.id),
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
        "Gagal mengupdate kategori"
      : undefined,
  };
}

export function useDeleteCategory() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(adminCategoriesService.deleteCategory(id), {
        loading: "Menghapus kategori...",
        success: (response) => response.message || "Kategori berhasil dihapus!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal menghapus kategori"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Categories.all,
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
        "Gagal menghapus kategori"
      : undefined,
  };
}
