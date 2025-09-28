import { NextFunction, Request, Response } from "express";
import {
  ForgotPasswordDto,
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  ResetPasswordDto,
} from "./../dto/auth.dto";
import { BaseResponseDto } from "./../dto/base.dto";
import { UserResponseDto } from "./../dto/user.dto";
import { AuthService } from "./../services/auth.service";

export class AuthController {
  /**
   * Controller untuk mendaftarkan pengguna baru.
   */
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: RegisterDto = req.body;
      const data = await AuthService.register(request);

      const response: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 201,
        message: "Pengguna berhasil terdaftar!",
        data: data,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Controller untuk login pengguna.
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: LoginDto = req.body;
      // Parameter 'path' tidak digunakan di service, jadi bisa dihilangkan saat memanggil
      const data = await AuthService.login(request);

      const response: BaseResponseDto<LoginResponseDto> = {
        status: "success",
        code: 200,
        message: "Login berhasil!",
        data: data,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Controller untuk memeriksa keberadaan email dalam database.
   * Bagian dari alur "Lupa Password".
   */
  static async checkEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: ForgotPasswordDto = req.body;
      const data = await AuthService.checkEmail(request);

      const response: BaseResponseDto<{ email: string }> = {
        status: "success",
        code: 200,
        message: "Email ditemukan.",
        data: data,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Controller untuk mereset password pengguna.
   * Bagian dari alur "Lupa Password".
   */
  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: ResetPasswordDto = req.body;
      await AuthService.resetPassword(request);

      const response: BaseResponseDto<null> = {
        status: "success",
        code: 200,
        message: "Kata sandi berhasil diubah.",
        data: null,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}