import { BaseResponseDto } from "./../dto/base.dto";
import { CheckoutResponseDto } from "./../dto/checkout.dto";
import { CheckoutService } from "./../services/checkout.service";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "interfaces/auth.interface";
export class CheckoutController {
	static async checkout(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userId = req.userId as string;
			const data = req.body;
			const response = await CheckoutService.checkout(userId, data);

			const result: BaseResponseDto<CheckoutResponseDto> = {
				status: "success",
				code: 200,
				message: "Cart checked out successfully",
				data: response,
			};

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async checkoutHistory(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userId = req.userId as string;
			const response = await CheckoutService.checkoutHistory(userId);

			const result: BaseResponseDto<CheckoutResponseDto[]> = {
				status: "success",
				code: 200,
				message: "Order history retrieved successfully",
				data: response,
			};

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
}
