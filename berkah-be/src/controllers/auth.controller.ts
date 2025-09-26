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
import { NextFunction, Request, Response } from "express";

export class AuthController {
  /**
   * Login and Registration Routes
   */

  // Controller for register user
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: RegisterDto = req.body as RegisterDto;
      const response = await AuthService.register(request);

      const result: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 201,
        message: "User Registered Successfully !",
        data: response,
      };

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Controller for login
  private static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: LoginDto = req.body as LoginDto;
      const path = req.path;
      const response = await AuthService.login(request, path);


      const result: BaseResponseDto<LoginResponseDto> = {
        status: "success",
        code: 200,
        message: "User Logged In Successfully !",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await AuthController.login(req, res, next);
  }

  // Controller for forgotting password
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ForgotPasswordDto = req.body as ForgotPasswordDto;
      await AuthService.forgotPassword(request);

      const result: BaseResponseDto<string> = {
        status: "success",
        code: 200,
        message: "Password Reset Link Sent Successfully !",
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /** End of Login and Registration Routes */
}
