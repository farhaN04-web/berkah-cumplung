import { z } from "zod";

export class CustomerSchema {
  static readonly CustomerFilter = z.object({
    name: z.string().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
  });
}
