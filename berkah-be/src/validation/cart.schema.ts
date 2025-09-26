import { z } from "zod";

export class CartSchema {
  static readonly CREATE = z.object({
    product_id: z.string().nonempty("Product ID is required"),
    qty: z.number().min(1, "Quantity must be at least 1"),
  });

  static readonly UPDATE = z.object({
    qty: z.number().min(1, "Quantity must be at least 1"),
  });
}
