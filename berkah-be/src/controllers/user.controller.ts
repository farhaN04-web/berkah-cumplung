import { BaseResponseDto } from "./../dto/base.dto";
import { UpdateProfileImageDto, UserResponseDto } from "./../dto/user.dto";
import { UserService } from "./../services/user.service";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "interfaces/auth.interface";

export class UserController {
  /**
   * User Controller for handling Admin, Mentor, and User Profiles Related Operations
   */
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getProfileUsers(req.userId as string);

      const result: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 200,
        message: "User retrieved successfully !",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserService.changePassword(
        req.userId as string,
        req.body
      );

      const result: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 200,
        message: "Password changed successfully !",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserService.updateProfile(
        req.userId as string,
        req.body
      );

      const result: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 200,
        message: "User updated successfully !",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileImage(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // get file from request
      const file = req.file;
      const filePath = file?.path.replace(/\\/g, "/");

      const reqBody = {
        image: filePath
      }

      console.log("reqBody", reqBody);

      const response = await UserService.updateProfileImage(
        req.userId as string,
        reqBody as UpdateProfileImageDto
      );

      const result: BaseResponseDto<UserResponseDto> = {
        status: "success",
        code: 200,
        message: "User updated successfully !",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
