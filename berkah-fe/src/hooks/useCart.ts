import { cartService } from "@/server/api/cart.service";
import {
  AddToCartDTO,
  CheckoutCartDTO,
  DeleteCartItemDTO,
  UpdateCartItemDTO,
} from "@/server/dto/cart.dto";
import { ResponseError } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryKeys } from "@/lib/query-keys";

export function useCart(sessionReady = true) {
  const query = useQuery({
    queryKey: QueryKeys.Cart.all,
    queryFn: () => cartService.getCart(),
    retry: false,
    enabled: sessionReady,
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat keranjang"
      : undefined,
  };
}

export function useAddToCart() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: AddToCartDTO) => {
      return toast.promise(cartService.addToCart(request), {
        loading: "Menambahkan ke keranjang...",
        success: (response) =>
          response.message || "Berhasil menambahkan ke keranjang!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal menambahkan ke keranjang"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Cart.all,
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
        "Gagal menambahkan ke keranjang"
      : undefined,
  };
}

export function useUpdateCartItem() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: UpdateCartItemDTO) => {
      return toast.promise(cartService.updateCartItem(request), {
        loading: "Memperbarui item keranjang...",
        success: (response) =>
          response.message || "Berhasil memperbarui item keranjang!",
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Cart.all,
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
        "Gagal memperbarui item keranjang"
      : undefined,
  };
}

export function useDeleteCartItem() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: DeleteCartItemDTO) => {
      return toast.promise(cartService.deleteCartItem(request), {
        loading: "Menghapus item keranjang...",
        success: (response) =>
          response.message || "Berhasil menghapus item keranjang!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal menghapus item keranjang"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Cart.all,
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
        "Gagal menghapus item keranjang"
      : undefined,
  };
}

export function useCheckoutCart() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: CheckoutCartDTO) => {
      return toast.promise(cartService.checkoutCart(request), {
        loading: "Memproses pembayaran...",
        success: (response) =>
          response.message || "Berhasil memproses pembayaran!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal memproses pembayaran"
          );
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QueryKeys.Cart.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.OrderHistory.all,
        refetchType: "all",
      });
      qc.invalidateQueries({
        queryKey: QueryKeys.Customers.all,
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
        "Gagal memproses pembayaran"
      : undefined,
  };
}
