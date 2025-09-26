import { z } from "zod";

export class CheckoutSchema {
  static readonly CHECKOUT = z.object({
    cartIds: z.array(z.string()).nonempty("Cart IDs are required"),
  });
}
