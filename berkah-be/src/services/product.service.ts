import { prismaClient } from "./../config/db.config";
import { Paging } from "./../dto/base.dto";
import {
  ProductCreateDto,
  ProductFilterDto,
  ProductResponseDto,
  ProductUpdateDto,
} from "./../dto/product.dto";
import { ResponseError } from "./../utils/response.util";
import { ProductSchema } from "./../validation/product.validation";
import { Validation } from "./../validation/validation";

export class ProductService {
  /**
   * Product Service
   */

  // Converts the product response to a specific format
  private static toProductResponse(
    response:
      | (ProductResponseDto & { category?: { name: string } })
      | (ProductResponseDto & { category?: { name: string } })[]
  ): ProductResponseDto | ProductResponseDto[] {
    const mapProduct = (item: any): ProductResponseDto => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      stock: item.stock,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      category_id: item.category_id,
      categoryName: item.category?.name || null,
    });

    return Array.isArray(response)
      ? response.map(mapProduct)
      : mapProduct(response);
  }

  // Get All Products
  static async getAll(query: ProductFilterDto): Promise<{
    data: ProductResponseDto[];
    paging: Paging;
  }> {
    const validatedQuery: ProductFilterDto = Validation.validate(
      ProductSchema.FILTER,
      query
    );

    const filters = [];

    if (validatedQuery.name) {
      filters.push({
        name: {
          contains: validatedQuery.name,
        },
      });
    }

    if (query.categoryId) {
      filters.push({
        category_id: query.categoryId,
      });
    }

    console.log("Query Filters:", filters);

    const productData = await prismaClient.products.findMany({
      where: {
        AND: filters,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validatedQuery.page! - 1) * validatedQuery.size!,
      take: validatedQuery.size,
      include: {
        category: true,
      },
    });

    const count = await prismaClient.products.count({
      where: {
        AND: filters,
      },
    });

    const totalPage = Math.ceil(count / validatedQuery.size!);

    return {
      data: this.toProductResponse(productData) as ProductResponseDto[],
      paging: {
        page: validatedQuery.page!,
        size: validatedQuery.size!,
        current_page: validatedQuery.page!, // ← ini pakai `validatedQuery`, bukan productData.length
        total_page: totalPage,
      },
    };
  }

  // Get Product By ID
  static async getById(id: string): Promise<ProductResponseDto> {
    const productData = await prismaClient.products.findUnique({
      where: {
        id,
      },
    });

    if (!productData) {
      throw new ResponseError("error", 404, "Product not found");
    }

    return this.toProductResponse(productData) as ProductResponseDto;
  }

  // Create Product
  static async create(data: ProductCreateDto): Promise<ProductResponseDto> {
    const validatedData: ProductCreateDto = Validation.validate(
      ProductSchema.CREATE,
      data
    );

    const productData = await prismaClient.products.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        category_id: validatedData.category_id,
        price: validatedData.price,
        stock: validatedData.stock,
        image: validatedData.image,
      },
    });

    return this.toProductResponse(productData) as ProductResponseDto;
  }

  // Update Product
  static async update(
    id: string,
    data: ProductUpdateDto
  ): Promise<ProductResponseDto> {
    const validatedData: ProductUpdateDto = Validation.validate(
      ProductSchema.UPDATE,
      data
    );

    const productData = await prismaClient.products.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        stock: validatedData.stock,
        image: validatedData.image,
        category_id: validatedData.category_id,
      },
    });

    return this.toProductResponse(productData) as ProductResponseDto;
  }

  // Delete Product
  static async delete(id: string): Promise<ProductResponseDto> {
    const productExists = await prismaClient.products.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!productExists) {
      throw new ResponseError("error", 404, "Product not found");
    }

    const productData = await prismaClient.products.delete({
      where: {
        id,
      },
    });

    return this.toProductResponse(productData) as ProductResponseDto;
  }
}
