import { z, ZodType } from "zod";

export class AuthSchema {
  /**
   * Skema validasi untuk registrasi pengguna baru.
   * Memastikan nama, email, password, dan konfirmasi password valid.
   */
  static readonly REGISTER: ZodType = z
    .object({
      name: z.string().min(2, "Nama minimal harus 2 karakter"),
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(6, "Password minimal harus 6 karakter"),
      confirmationPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmationPassword, {
      message: "Konfirmasi password tidak cocok",
      path: ["confirmationPassword"], // Menampilkan pesan error di field konfirmasi
    });

  /**
   * Skema validasi untuk login pengguna.
   */
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(1, "Password tidak boleh kosong"),
  });

  /**
   * Skema validasi untuk memeriksa email saat lupa password.
   */
  static readonly FORGOT_PASSWORD: ZodType = z.object({
    email: z.string().email("Format email tidak valid"),
  });

  /**
   * Skema validasi untuk mereset password.
   * Memastikan email, password baru, dan konfirmasinya valid.
   */
  static readonly RESET_PASSWORD: ZodType = z
    .object({
      // Mengganti 'token' dengan 'email'
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(6, "Password minimal harus 6 karakter"),
      confirmationPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmationPassword, {
      message: "Konfirmasi password tidak cocok",
      path: ["confirmationPassword"],
    });
}