import { BaseResponseDto } from "./../dto/base.dto";
import { ProductFilterDto, ProductResponseDto } from "./../dto/product.dto";
import { ProductService } from "./../services/product.service";
import { NextFunction, Request, Response } from "express";
export class ProductController {
  /**
   * Product Controller
   */

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: ProductFilterDto = {
        name: req.query.name as string,
        page: Number(req.query.page) || 1,
        size: Number(req.query.size) || 10,
        categoryId: req.query.categoryId as string,
      };

      const response = await ProductService.getAll(request);
      const result: BaseResponseDto<ProductResponseDto[]> = {
        status: "success",
        code: 200,
        message: "Products retrieved successfully",
        data: response.data,
        paging: response.paging,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const response = await ProductService.getById(id);
      const result: BaseResponseDto<ProductResponseDto> = {
        status: "success",
        code: 200,
        message: "Product retrieved successfully",
        data: response,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;
      const filePath = file?.path.replace(/\\/g, "/");

      const reqBody = {
        ...req.body,
        image: filePath,
        price: Number(req.body.price) || "",
        stock: Number(req.body.stock) || "",
      };
      const response = await ProductService.create(reqBody);
      const result: BaseResponseDto<ProductResponseDto> = {
        status: "success",
        code: 201,
        message: "Product created successfully",
        data: response,
      };

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;
      let filePath: string | undefined;

      if (file) {
        filePath = file.path.replace(/\\/g, "/");
      }

      const existingProduct = await ProductService.getById(req.params.id);

      const reqBody = {
        ...req.body,
        image: filePath || existingProduct.image, // Gunakan image baru jika ada, jika tidak tetap pakai lama
        price:
          req.body.price !== undefined ? Number(req.body.price) : undefined,
        stock:
          req.body.stock !== undefined ? Number(req.body.stock) : undefined,
        category_id: req.body.category_id,
      };

      const response = await ProductService.update(req.params.id, reqBody);

      const result: BaseResponseDto<ProductResponseDto> = {
        status: "success",
        code: 200,
        message: "Product updated successfully",
        data: response,
      };
      console.log("BODY:", req.body);
      console.log("CATEGORY_ID:", req.body.category_id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await ProductService.delete(req.params.id);
      const result: BaseResponseDto<null> = {
        status: "success",
        code: 200,
        message: "Product deleted successfully",
        data: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
