export interface ProductResponseDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  category_id: string;
  categoryName?: string;
}

export interface ProductCreateDto {
  name: string;
  description: string;
  category_id: string;
  price: number;
  stock: number;
  image: string;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string;
  category_id?: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface ProductFilterDto {
  name?: string;
  page?: number;
  size?: number;
  categoryId?: string;
}
