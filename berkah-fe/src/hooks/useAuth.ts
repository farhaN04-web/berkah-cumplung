import { useSession } from "@/hooks/useSession";
import { authService } from "@/server/api/auth.service";
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO, // 1. Impor DTO yang diperlukan
} from "@/server/dto/auth.dto";
import { QueryKeys } from "@/lib/query-keys";
import { ResponseError, Session } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const { signIn: setSession } = useSession();

  const mutation = useMutation({
    mutationFn: (request: LoginDTO) => {
      return toast.promise(authService.login(request), {
        loading: "Loading...",
        success: (response) => response.message || "Login berhasil!",
        error: (error: ResponseError) => {
          return (
            error.response?.message || error.message || "Gagal untuk login"
          );
        },
      });
    },

    onSuccess: async (response) => {
      if (response.status === "success") {
        const sessionData: Session = {
          token: response.data.token,
          user: {
            name: response.data.user.name,
            email: response.data.user.email,
            photo: response.data.user.photo,
            role: response.data.user.role as "user" | "admin",
          },
        };
        await setSession(sessionData);
      }
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
        "Gagal untuk login"
      : undefined,
  };
};

export const useSignOut = () => {
  const { signOut: removeSession } = useSession();
  const navigate = useNavigate();

  const signOut = async (callbackURL?: string) => {
    await removeSession();
    if (callbackURL) {
      requestAnimationFrame(() => {
        navigate(callbackURL);
      });
    }
  };

  return signOut;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: RegisterDTO) => {
      return toast.promise(authService.register(request), {
        loading: "Loading...",
        success: (response) => response.message || "Register berhasil!",
        error: (error: ResponseError) => {
          return (
            error.response?.message || error.message || "Gagal untuk register"
          );
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.User.All });
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
        "Gagal untuk register"
      : undefined,
  };
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (request: ForgotPasswordDTO) => {
      return toast.promise(authService.forgotPassword(request), {
        loading: "Loading...",
        success: (response) =>
          response.message || "Email untuk reset password telah dikirim!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal mengirim email reset"
          );
        },
      });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal untuk forgot password"
      : undefined,
  };
};

// 2. Tambahkan hook baru di sini
export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: (request: ResetPasswordDTO) => {
      return toast.promise(authService.resetPassword(request), {
        loading: "Menyimpan kata sandi baru...",
        success: (response) =>
          response.message || "Kata sandi berhasil diubah!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal mengubah kata sandi"
          );
        },
      });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal mengubah kata sandi"
      : undefined,
  };
};