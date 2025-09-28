import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCheckEmail } from "@/hooks/useAuth";
import { forgotPasswordSchema } from "@/schemas/auth";
import { ResponseError } from "@/types";

// Tipe data form berdasarkan skema Zod
type FormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  // Inisialisasi form dengan react-hook-form dan zodResolver
  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Menggunakan custom hook untuk mutasi pengecekan email
  const { mutate: checkEmail, isPending } = useCheckEmail();

  // Fungsi yang dijalankan saat form disubmit
  const onSubmit = (data: FormData) => {
    checkEmail(data, {
      onSuccess: () => {
        toast.success("Email ditemukan!", {
          description: "Anda akan diarahkan untuk membuat kata sandi baru.",
        });
        // Jika berhasil, navigasi ke halaman reset-password
        // sambil mengirimkan email melalui 'state'
        navigate("/reset-password", { state: { email: data.email } });
      },
      onError: (error) => {
        const err = error as ResponseError;
        toast.error(err.response?.message || "Email tidak terdaftar.");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="masukkan@emailanda.com"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Memeriksa..." : "Cari Akun"}
        </Button>
      </form>
    </Form>
  );
};
