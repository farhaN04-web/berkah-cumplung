export interface CategoryResponseDto {
  id: string;
  name: string;
}

export interface CategoryCreateDto {
  name: string;
}

export interface CategoryUpdateDto {
  name?: string;
}

export interface CategoryFilterDto {
  name?: string;
  page?: number;
  size?: number;
}
