import { z } from "zod";

export class CategorySchema {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(100),
  });

  static readonly UPDATE = z.object({
    name: z.string().optional(),
  });

  static readonly FILTER = z.object({
    name: z.string().optional(),
    page: z.number().int().optional(),
    size: z.number().int().optional(),
  });
}
