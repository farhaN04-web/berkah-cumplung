import { BaseResponseDto } from "./../dto/base.dto";
import {
  TransactionDto,
  TransactionFilterDto,
  UpdateStatusTransactionDto,
} from "./../dto/transaction.dto";
import { TransactionService } from "./../services/transaction.service";
import { NextFunction, Request, Response } from "express";

export class TransactionController {
  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: TransactionFilterDto = {
        ...(req.query.status && { status: req.query.status as string }),
        page: Number(req.query.page) || 1,
        size: Number(req.query.size) || 10,
      };

      const response = await TransactionService.getAllTransactions(request);
      const result: BaseResponseDto<TransactionDto[]> = {
        status: "success",
        code: 200,
        message: "Transactions retrieved successfully",
        data: response.data,
        paging: response.paging,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const transactionId = req.params.id;
      const response = await TransactionService.getDetailTransaction(
        transactionId
      );

      const result: BaseResponseDto<TransactionDto> = {
        status: "success",
        code: 200,
        message: "Transaction retrieved successfully",
        data: response,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatusTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const transactionId = req.params.id;
      const request: UpdateStatusTransactionDto =
        req.body as UpdateStatusTransactionDto;
      await TransactionService.updateStatusTransaction(transactionId, request);
      const result: BaseResponseDto<null> = {
        status: "success",
        code: 200,
        message: "Transaction status updated successfully",
        data: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getSalesByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { period, value } = req.query;

      if (!period || !value) {
        res.status(400).json({ message: "Missing period or value" });
        return;
      }

      const data = await TransactionService.getSalesByCategory(
        period as string,
        value as string
      );

      res.status(200).json({
        status: "success",
        message: "Sales by category fetched successfully",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getSalesStats(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { period, value } = req.query;

      if (!period || !value) {
        res.status(400).json({
          status: "error",
          message: "Missing period or value",
        });
        return;
      }

      const stats = await TransactionService.getSalesStats(
        period as string,
        value as string
      );

      res.status(200).json({
        status: "success",
        message: "Sales stats fetched successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
