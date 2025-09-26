import { create } from "domain";
import { z } from "zod";

export class TransactionSchema {
  static readonly UPDATE_STATUS_TRANSACTION = z.object({
    status: z.enum(["pending", "success", "failed"]),
    shipping_status: z.enum(["pending", "success", "failed"]),
    shipping_number: z.string(),
  });

  static readonly TRANSACTION_FILTER_SCHEMA = z.object({
    status: z.enum(["pending", "success", "failed"]).optional(),
    page: z.number().min(1).default(1),
    size: z.number().min(1).max(100).default(10),
  });
}
