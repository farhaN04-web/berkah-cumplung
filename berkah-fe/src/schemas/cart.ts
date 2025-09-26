import { z } from "zod";

export const addToCartFormSchema = z.object({
  quantity: z
    .number()
    .min(1, "Minimal pembelian 1")
    .nonnegative("Jumlah pembelian tidak boleh negatif"),
});

export type AddToCartFormSchema = z.infer<typeof addToCartFormSchema>;
