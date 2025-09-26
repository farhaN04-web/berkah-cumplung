import { z } from "zod";

export const profilePictureSchema = z.object({
  image: z
    .instanceof(File, { message: "Foto profil tidak boleh kosong" })
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      { message: "Hanya file JPG, JPEG, atau PNG yang diperbolehkan" },
    )
    .refine((file) => file.size <= 1024 * 1024 * 3, {
      message: "Ukuran gambar maksimal 3MB",
    })
    .refine((file) => file !== undefined, {
      message: "Foto profil tidak boleh kosong",
    }),
});

export type ProfilePictureSchema = z.infer<typeof profilePictureSchema>;

export const informationFormSchema = z.object({
  name: z
    .string({ message: "Nama wajib diisi" })
    .min(3, "Nama minimal 3 karakter")
    .regex(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf dan spasi"),
  email: z
    .string({ message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" })
    .optional(),
});

export type InformationFormSchema = z.infer<typeof informationFormSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Kata sandi saat ini wajib diisi" })
      .min(8, "Kata sandi minimal 8 karakter"),
    newPassword: z
      .string({ message: "Kata sandi baru wajib diisi" })
      .min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z
      .string({ message: "Konfirmasi kata sandi wajib diisi" })
      .min(8, "Kata sandi minimal 8 karakter"),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Konfirmasi kata sandi tidak cocok",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
