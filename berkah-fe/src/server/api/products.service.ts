import { httpClient } from "@/lib/http-client";
import { Product } from "@/server/dto/products.dto";
import { ApiResponse, Pagination } from "@/types";

class ProductsService {
  async getProducts(
    name?: string,
    page?: number,
    size?: number,
    categoryId?: string,
  ) {
    const query = {
      name: name || "",
      page: page || 1,
      size: size || 8,
      categoryId: categoryId || "",
    };
    const response = await httpClient.get<
      ApiResponse<Product[], Pagination, undefined>
    >(
      `/products?page=${query.page}&size=${query.size}&name=${query.name}&categoryId=${query.categoryId}`,
    );
    return response;
  }

  async getProductById(id: string) {
    const response = await httpClient.get<
      ApiResponse<Product, undefined, undefined>
    >(`/products/${id}`);
    return response;
  }
}

export const productsService = new ProductsService();
