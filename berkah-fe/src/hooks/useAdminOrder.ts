import { adminOrderService } from "@/server/api/admin.order.service";
import { UpdateOrderStatusDTO } from "@/server/dto/order.dto";
import { ResponseError } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryKeys } from "@/lib/query-keys";

export function useAdminOrders(status: string, page: number, size: number) {
  const query = useQuery({
    queryKey: QueryKeys.Admin.Orders.list(status, page, size),
    queryFn: () => adminOrderService.getOrders(status, page, size),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat data transaksi"
      : undefined,
  };
}

export function useAdminOrder(id: string) {
  const query = useQuery({
    queryKey: QueryKeys.Admin.Orders.detail(id),
    queryFn: () => adminOrderService.getOrderById(id),
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat data transaksi"
      : undefined,
  };
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: UpdateOrderStatusDTO) => {
      return toast.promise(adminOrderService.updateOrderStatus(request), {
        loading: "Memperbarui status pesanan...",
        success: (response) =>
          response.message || "Status pesanan berhasil diperbarui!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal memperbarui status pesanan"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Admin.Orders.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.Dashboard.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.OrderHistory.all,
        refetchType: "all",
      });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal memperbarui status pesanan"
      : undefined,
  };
}
