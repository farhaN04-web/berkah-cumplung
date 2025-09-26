import { BaseResponseDto } from "./../dto/base.dto";
import { CustomerDto, CustomerFilterDto } from "./../dto/customer.dto";
import { CustomerService } from "./../services/customer.service";
import { NextFunction, Request, Response } from "express";

export class CustomerController {
  static async getAllCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: CustomerFilterDto = {
        name: req.query.name as string,
        page: Number(req.query.page) || 1,
        size: Number(req.query.size) || 10,
      };

      const response = await CustomerService.getAllCustomers(request);
      const result: BaseResponseDto<CustomerDto[]> = {
        status: "success",
        code: 200,
        message: "Customers retrieved successfully",
        data: response.data,
        paging: response.paging,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
