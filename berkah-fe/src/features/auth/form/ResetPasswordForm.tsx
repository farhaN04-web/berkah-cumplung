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
import { useResetPassword } from "@/hooks/useAuth";
import { resetPasswordSchema } from "@/schemas/auth";
import { ResponseError } from "@/types";

// Tipe data form berdasarkan skema Zod
type FormData = z.infer<typeof resetPasswordSchema>;

// Komponen menerima prop 'email'
interface ResetPasswordFormProps {
  email: string;
}

export const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const navigate = useNavigate();

  // Inisialisasi form dengan react-hook-form dan zodResolver
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Menggunakan custom hook untuk mutasi reset password
  const { mutate: resetPassword, isPending } = useResetPassword();

  // Fungsi yang dijalankan saat form disubmit
  const onSubmit = (data: FormData) => {
    // Panggil mutasi dengan data password baru dan email dari prop
    resetPassword(
      { ...data, email },
      {
        onSuccess: () => {
          toast.success("Kata sandi berhasil diubah!", {
            description: "Silakan masuk dengan kata sandi baru Anda.",
          });
          // Jika berhasil, arahkan pengguna ke halaman login
          navigate("/login");
        },
        onError: (error) => {
          const err = error as ResponseError;
          toast.error(
            err.response?.message || "Gagal mengubah kata sandi."
          );
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Sandi Baru</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
        </Button>
      </form>
    </Form>
  );
};