export interface Category {
  id: string;
  name: string;
}

export type CreateCategoryDTO = {
  name: string;
};

export interface UpdateCategoryDTO extends CreateCategoryDTO {
  id: string;
}
