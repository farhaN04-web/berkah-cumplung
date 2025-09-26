import { BaseResponseDto } from "./../dto/base.dto";
import { DashboardService } from "./../services/dashboard.service";
import { NextFunction, Request, Response } from "express";

export class DashboardController {
  static async getTotalTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.getTotalTransaction();

      const result: BaseResponseDto<any> = {
        status: "success",
        code: 200,
        message: "Get total transaction success",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCountTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.getCountTransaction();

      const result: BaseResponseDto<any> = {
        status: "success",
        code: 200,
        message: "Get count transaction success",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getProductTotal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.getProductTotal();

      const result: BaseResponseDto<any> = {
        status: "success",
        code: 200,
        message: "Get product total success",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomersTotal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await DashboardService.getCustomersTotal();

      const result: BaseResponseDto<any> = {
        status: "success",
        code: 200,
        message: "Get customers total success",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
