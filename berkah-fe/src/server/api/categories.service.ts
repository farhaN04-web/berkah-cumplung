// src/server/api/categories.service.ts
import { httpClient } from "@/lib/http-client";
import { Category } from "../dto/categories.dto";
import { ApiResponse } from "@/types";

class CategoriesService {
  async getCategories() {
    const response =
      await httpClient.get<ApiResponse<Category[], undefined, undefined>>(
        "/categories",
      );
    return response;
  }
}

export const categoriesService = new CategoriesService();
