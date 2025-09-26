import { httpClient } from "@/lib/http-client";
import {
  ForgotPasswordDTO,
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
} from "@/server/dto/auth.dto";
import { ApiResponse } from "@/types";

class AuthService {
  async login(request: LoginDTO) {
    const response = await httpClient.post<
      ApiResponse<LoginResponse, undefined, undefined>
    >("/auth/login/", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async register(request: RegisterDTO) {
    const response = await httpClient.post<
      ApiResponse<RegisterResponse, undefined, undefined>
    >("/auth/register", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async forgotPassword(request: ForgotPasswordDTO) {
    const response = await httpClient.post<
      ApiResponse<undefined, undefined, undefined>
    >("/auth/forgot-password", request, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}

export const authService = new AuthService();
