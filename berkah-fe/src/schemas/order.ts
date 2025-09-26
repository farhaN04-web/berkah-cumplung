import { z } from "zod";

export const updateOrderStatusSchema = z
  .object({
    id: z.string().min(1),
    status: z.enum(["pending", "success", "failed"]),
    shipping_status: z.enum(["pending", "success", "failed"]),
    shipping_number: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.shipping_status === "success") {
        return data.shipping_number?.trim() !== "";
      }
      return true;
    },
    {
      path: ["shipping_number"],
      message: "Nomor resi wajib diisi jika status pengiriman berhasil.",
    },
  );

export type UpdateOrderStatusSchema = z.infer<typeof updateOrderStatusSchema>;
