import { BaseResponseDto } from "./../dto/base.dto";
import { CartResponseDto } from "./../dto/cart.dto";
import { CartService } from "./../services/cart.service";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "interfaces/auth.interface";

export class CartController {
  static async getCarts(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await CartService.getCart(req.userId!);
      const result: BaseResponseDto<CartResponseDto[]> = {
        status: "success",
        code: 200,
        message: "Carts retrieved successfully",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await CartService.addToCart(req.userId!, req.body);
      const result: BaseResponseDto<CartResponseDto> = {
        status: "success",
        code: 201,
        message: "Product added to cart successfully",
        data: response,
      };

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cartId = req.params.id;
      const response = await CartService.updateCart(
        req.userId!,
        cartId,
        req.body
      );
      const result: BaseResponseDto<CartResponseDto> = {
        status: "success",
        code: 200,
        message: "Cart updated successfully",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cartId = req.params.id;
      await CartService.deleteCart(req.userId!, cartId);
      const result: BaseResponseDto<null> = {
        status: "success",
        code: 200,
        message: "Cart deleted successfully",
        data: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
