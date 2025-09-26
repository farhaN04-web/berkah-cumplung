import { z, ZodType } from "zod";

export class AuthSchema {
  static readonly REGISTER: ZodType = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      confirmationPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmationPassword, {
      message: "Passwords do not match",
    });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  static readonly FORGOT_PASSWORD: ZodType = z.object({
    email: z.string().email(),
  });

  static readonly RESET_PASSWORD: ZodType = z
    .object({
      token: z.string(),
      password: z.string().min(6),
      confirmationPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmationPassword, {
      message: "Passwords do not match",
    });
}
