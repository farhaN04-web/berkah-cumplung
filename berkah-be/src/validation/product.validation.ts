import { z } from "zod";

export class ProductSchema {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    image: z.string().min(1),
    category_id: z.string().nonempty("Kategori harus dipilih"),
  });

  static readonly UPDATE = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    image: z.string().min(1).optional(),
    category_id: z.string().nonempty("Kategori harus dipilih"),
  });

  static readonly FILTER = z.object({
    name: z.string().optional(),
    page: z.number().int().optional(),
    size: z.number().int().optional(),
    category: z.string().optional(),
  });
}
