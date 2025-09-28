import { httpClient } from "@/lib/http-client";
import {
  ForgotPasswordDTO,
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
  ResetPasswordDTO,
} from "@/server/dto/auth.dto";
import { ApiResponse } from "@/types";

class AuthService {
  /**
   * Mengirim request login ke server.
   * @param request - Data email dan password
   */
  async login(request: LoginDTO) {
    const response = await httpClient.post<ApiResponse<LoginResponse>>(
      "/login",
      request,
    );
    return response;
  }

  /**
   * Mengirim request registrasi akun baru ke server.
   * @param request - Data nama, email, dan password
   */
  async register(request: RegisterDTO) {
    const response = await httpClient.post<ApiResponse<RegisterResponse>>(
      "/register",
      request,
    );
    return response;
  }

  /**
   * Memeriksa apakah email terdaftar di database.
   * @param request - Data email yang akan diperiksa
   */
  async checkEmail(request: ForgotPasswordDTO) {
    const response = await httpClient.post<ApiResponse<{ email: string }>>(
      "/check-email",
      request,
    );
    return response;
  }

  /**
   * Mengirim request untuk mereset password dengan password baru.
   * @param request - Data email dan password baru
   */
  async resetPassword(request: ResetPasswordDTO) {
    const response = await httpClient.post<ApiResponse<ResetPasswordDTO>>(
      "/reset-password",
      request,
    );
    return response;
  }
}

export const authService = new AuthService();

