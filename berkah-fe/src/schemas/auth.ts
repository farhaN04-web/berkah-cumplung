import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email wajib diisi" })
    .min(1, "Email wajib diisi")
    .min(3, "Email minimal 3 karakter")
    .email({ message: "Format email tidak valid" }),
  password: z
    .string({ message: "Kata sandi wajib diisi" })
    .min(1, "Kata sandi wajib diisi")
    .min(8, "Kata sandi minimal 8 karakter"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
  .extend({
    name: z
      .string({ message: "Nama wajib diisi" })
      .min(1, "Nama wajib diisi")
      .min(3, "Nama minimal 3 karakter")
      .regex(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf dan spasi"),
    confirmPassword: z
      .string({ message: "Konfirmasi kata sandi wajib diisi" })
      .min(1, "Konfirmasi kata sandi wajib diisi")
      .min(8, "Kata sandi minimal 8 karakter"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Kata sandi tidak sama",
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email wajib diisi" })
    .min(1, "Email tidak boleh kosong")
    .min(3, "Email minimal 3 karakter")
    .email({ message: "Format email tidak valid" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Kata sandi minimal 6 karakter" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
