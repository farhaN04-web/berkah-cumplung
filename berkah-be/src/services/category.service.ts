import { prismaClient } from "./../config/db.config";
import { Paging } from "./../dto/base.dto";
import {
  CategoryCreateDto,
  CategoryFilterDto,
  CategoryResponseDto,
  CategoryUpdateDto,
} from "./../dto/category.dto";
import { getDateRange } from "./../utils/getDateRange";
import { ResponseError } from "./../utils/response.util";
import { CategorySchema } from "./../validation/category.validation";
import { Validation } from "./../validation/validation";

export class CategoryService {
  private static toCategoryResponse(
    response:
      | (CategoryResponseDto & { category?: { name: string } })
      | (CategoryResponseDto & { category?: { name: string } })[]
  ): CategoryResponseDto | CategoryResponseDto[] {
    const mapCategory = (item: any): CategoryResponseDto => ({
      id: item.id,
      name: item.name,
    });

    return Array.isArray(response)
      ? response.map(mapCategory)
      : mapCategory(response);
  }

  static async getAll(query: CategoryFilterDto): Promise<{
    data: CategoryResponseDto[];
    paging: Paging;
  }> {
    const validatedQuery: CategoryFilterDto = Validation.validate(
      CategorySchema.FILTER,
      query
    );

    // Set default values for page and size if undefined
    const page = validatedQuery.page ?? 1;
    const size = validatedQuery.size ?? 10;

    const filters = [];

    if (validatedQuery.name) {
      filters.push({
        name: {
          contains: validatedQuery.name,
        },
      });
    }

    const categoryData = await prismaClient.category.findMany({
      where: {
        AND: filters,
      },
      skip: (page - 1) * size,
      take: size,
    });

    const count = await prismaClient.category.count({
      where: {
        AND: filters,
      },
    });

    const totalPage = Math.ceil(count / size);

    return {
      data: this.toCategoryResponse(categoryData) as CategoryResponseDto[],
      paging: {
        page,
        size,
        current_page: page,
        total_page: totalPage,
      },
    };
  }

  static async getById(id: string): Promise<CategoryResponseDto> {
    const categoryData = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!categoryData) {
      throw new ResponseError("error", 404, "Product not found");
    }

    return this.toCategoryResponse(categoryData) as CategoryResponseDto;
  }

  static async create(data: CategoryCreateDto): Promise<CategoryResponseDto> {
    const validatedData: CategoryCreateDto = Validation.validate(
      CategorySchema.CREATE,
      data
    );

    const categoryData = await prismaClient.category.create({
      data: {
        name: validatedData.name,
      },
    });

    return this.toCategoryResponse(categoryData) as CategoryResponseDto;
  }

  static async update(
    id: string,
    data: CategoryUpdateDto
  ): Promise<CategoryResponseDto> {
    const validatedData: CategoryUpdateDto = Validation.validate(
      CategorySchema.UPDATE,
      data
    );

    const categoryData = await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
      },
    });

    return this.toCategoryResponse(categoryData) as CategoryResponseDto;
  }

  static async delete(id: string): Promise<CategoryResponseDto> {
    const categoryExists = await prismaClient.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!categoryExists) {
      throw new ResponseError("error", 404, "Product not found");
    }

    const categoryData = await prismaClient.category.delete({
      where: {
        id,
      },
    });

    return this.toCategoryResponse(categoryData) as CategoryResponseDto;
  }
}
