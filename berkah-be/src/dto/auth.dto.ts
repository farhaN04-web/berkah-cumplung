import { UserResponseDto } from "./user.dto";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmationPassword: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserResponseDto;
}
