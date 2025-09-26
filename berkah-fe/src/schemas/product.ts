import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Nama produk tidak boleh kosong" })
    .min(1, "Nama produk tidak boleh kosong"),
  price: z.string().min(1, "Harga produk tidak boleh kosong"),
  stock: z.string().min(1, "Stok produk tidak boleh kosong"),
  description: z
    .string({ required_error: "Deskripsi produk tidak boleh kosong" })
    .min(1, "Deskripsi produk tidak boleh kosong")
    .max(500, "Deskripsi produk tidak boleh lebih dari 500 karakter"),
  image: z
    .instanceof(File, { message: "Gambar produk tidak boleh kosong" })
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      { message: "Hanya file JPG, JPEG, atau PNG yang diperbolehkan" },
    )
    .refine((file) => file.size <= 1024 * 1024 * 3, {
      message: "Ukuran gambar maksimal 3MB",
    })
    .refine((file) => file !== undefined, {
      message: "Gambar produk tidak boleh kosong",
    }),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const updateProductSchema = productSchema.omit({ image: true }).extend({
  id: z
    .string({ required_error: "ID produk tidak boleh kosong" })
    .min(1, "ID produk tidak boleh kosong"),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      { message: "Hanya file JPG, JPEG, atau PNG yang diperbolehkan" },
    )
    .refine((file) => !file || file.size <= 1024 * 1024 * 3, {
      message: "Ukuran gambar maksimal 3MB",
    }),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
