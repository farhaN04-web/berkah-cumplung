export type Product = {
  id: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
};

export type CreateProductDTO = {
  name: string;
  price: string;
  stock: string;
  description: string;
  category_id: string;
  image?: File;
};

export interface UpdateProductDTO extends CreateProductDTO {
  id: string;
}
