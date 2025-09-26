import { httpClient } from "@/lib/http-client";
import { ApiResponse, Pagination } from "@/types";
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../dto/categories.dto";

class AdminCategoriesService {
  async getAllCategories(page?: number, size?: number) {
    const query = {
      page: page || 1,
      size: size || 10,
    };
    const response = await httpClient.get<
      ApiResponse<Category[], Pagination, undefined>
    >(`/admin/categories?page=${query.page}&size=${query.size}`);

    return response;
  }

  async getCategoryById(id: string) {
    const response = await httpClient.get<
      ApiResponse<Category, undefined, undefined>
    >(`/admin/categories/${id}`);
    return response;
  }

  async createCategory(categoryData: CreateCategoryDTO) {
    const response = await httpClient.post<
      ApiResponse<Category, undefined, undefined>
    >("/admin/categories/", { name: categoryData.name });
    return response;
  }

  async updateCategory(categoryData: UpdateCategoryDTO) {
    const response = await httpClient.put<
      ApiResponse<Category, undefined, undefined>
    >(`/admin/categories/${categoryData.id}`, { name: categoryData.name });
    return response;
  }

  async deleteCategory(id: string) {
    const response = await httpClient.delete<
      ApiResponse<null, undefined, undefined>
    >(`/admin/categories/${id}`);
    return response;
  }
}

export const adminCategoriesService = new AdminCategoriesService();
