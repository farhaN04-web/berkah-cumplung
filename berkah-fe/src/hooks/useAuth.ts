// Lokasi: berkah-fe/src/hooks/useAuth.ts

import { useSession } from "@/hooks/useSession";
import { QueryKeys } from "@/lib/query-keys";
import { authService } from "@/server/api/auth.service";
import {
  ForgotPasswordDTO,
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
  ResetPasswordDTO,
} from "@/server/dto/auth.dto";
import { ApiResponse, ResponseError, Session } from "@/types";
import {
  useMutation,
  UseMutationOptions, // 1. Impor UseMutationOptions
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * Hook untuk menangani proses login pengguna.
 */
export const useSignIn = () => {
  const { signIn: setSession } = useSession();

  // 2. Definisikan semua options di dalam variabel terpisah
  const mutationOptions: UseMutationOptions<
    ApiResponse<LoginResponse>,
    ResponseError,
    LoginDTO
  > = {
    mutationFn: authService.login,
    onSuccess: (response) => {
      toast.success(response.message || "Login berhasil!");
      if (response.status === "success" && response.data) {
        const sessionData: Session = {
          token: response.data.token,
          user: {
            name: response.data.user.name,
            email: response.data.user.email,
            photo: response.data.user.photo,
            role: response.data.user.role as "user" | "admin",
          },
        };
        setSession(sessionData);
      }
    },
    onError: (error) => {
      toast.error(error.response?.message || "Gagal untuk login");
    },
  };

  return useMutation(mutationOptions); // 3. Panggil useMutation dengan options tersebut
};

/**
 * Hook untuk menangani proses logout pengguna.
 */
export const useSignOut = () => {
  const { signOut: removeSession } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signOut = async (callbackURL: string = "/login") => {
    await removeSession();
    queryClient.clear();
    navigate(callbackURL);
  };

  return signOut;
};

/**
 * Hook untuk menangani proses registrasi pengguna baru.
 */
export const useSignUp = () => {
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<
    ApiResponse<RegisterResponse>,
    ResponseError,
    RegisterDTO
  > = {
    mutationFn: authService.register,
    onSuccess: (response) => {
      toast.success(response.message || "Register berhasil!");
      queryClient.invalidateQueries({ queryKey: QueryKeys.User.All });
    },
    onError: (error) => {
      toast.error(error.response?.message || "Gagal untuk register");
    },
  };

  return useMutation(mutationOptions);
};

/**
 * Hook untuk memeriksa apakah email terdaftar di sistem.
 */
export function useCheckEmail() {
  const mutationOptions: UseMutationOptions<
    ApiResponse<{ email: string }>,
    ResponseError,
    ForgotPasswordDTO
  > = {
    mutationFn: authService.checkEmail,
  };

  return useMutation(mutationOptions);
}

/**
 * Hook untuk mengirimkan password baru ke server.
 */
export const useResetPassword = () => {
  const mutationOptions: UseMutationOptions<
    ApiResponse<ResetPasswordDTO>,
    ResponseError,
    ResetPasswordDTO
  > = {
    mutationFn: authService.resetPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Kata sandi berhasil diubah!");
    },

    onError: (error) => {
      toast.error(error.response?.message || "Gagal mengubah kata sandi");
    },
  };

  return useMutation(mutationOptions);
};
