import { httpClient } from "@/lib/http-client";
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "@/server/dto/products.dto";
import { ApiResponse, Pagination } from "@/types";

class AdminProductsService {
  async getAllProducts(page?: number, size?: number) {
    const query = {
      page: page || 1,
      size: size || 10,
    };
    const response = await httpClient.get<
      ApiResponse<Product[], Pagination, undefined>
    >(`/admin/products?page=${query.page}&size=${query.size}`);

    return response;
  }

  async getProductById(id: string) {
    const response = await httpClient.get<
      ApiResponse<Product, undefined, undefined>
    >(`/admin/products/${id}`);
    return response;
  }

  async createProduct(productData: CreateProductDTO) {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("description", productData.description);
    formData.append("category_id", productData.category_id);

    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await httpClient.post<
      ApiResponse<Product, undefined, undefined>
    >("/admin/products/", formData);
    return response;
  }

  async updateProduct(productData: UpdateProductDTO) {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("description", productData.description);
    formData.append("category_id", productData.category_id);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await httpClient.put<
      ApiResponse<Product, undefined, undefined>
    >(`/admin/products/${productData.id}`, formData);
    return response;
  }

  async deleteProduct(id: string) {
    const response = await httpClient.delete<
      ApiResponse<null, undefined, undefined>
    >(`/admin/products/${id}`);
    return response;
  }
}

export const adminProductsService = new AdminProductsService();
