import { Request, Response, NextFunction } from "express";
import {
  CategoryCreateDto,
  CategoryResponseDto,
  CategoryUpdateDto,
} from "./../dto/category.dto";
import { CategoryService } from "./../services/category.service";
import { BaseResponseDto } from "./../dto/base.dto";

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse query parameters and convert page and size to numbers
      const query = {
        name: req.query.name as string | undefined,
        page: req.query.page
          ? parseInt(req.query.page as string, 10)
          : undefined,
        size: req.query.size
          ? parseInt(req.query.size as string, 10)
          : undefined,
      };

      const response = await CategoryService.getAll(query);
      const result: BaseResponseDto<CategoryResponseDto[]> = {
        status: "success",
        code: 200,
        message: "Categories retrieved successfully",
        data: response.data,
        paging: response.paging,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getById(req.params.id);
      const result: BaseResponseDto<CategoryResponseDto> = {
        status: "success",
        code: 200,
        message: "Category retrieved successfully",
        data,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const data: CategoryCreateDto = req.body;
      const created = await CategoryService.create(data);
      const result: BaseResponseDto<CategoryResponseDto> = {
        status: "success",
        code: 201,
        message: "Category created successfully",
        data: created,
      };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CategoryUpdateDto = req.body;
      const updated = await CategoryService.update(req.params.id, data);
      const result: BaseResponseDto<CategoryResponseDto> = {
        status: "success",
        code: 200,
        message: "Category updated successfully",
        data: updated,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.delete(req.params.id);
      const result: BaseResponseDto<null> = {
        status: "success",
        code: 200,
        message: "Category deleted successfully",
        data: null,
      };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
