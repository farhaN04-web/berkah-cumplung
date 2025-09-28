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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Tipe data form berdasarkan skema Zod
type FormData = z.infer<typeof resetPasswordSchema>;

// Komponen menerima prop 'email'
interface ResetPasswordFormProps {
  email: string;
}

export const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmationPassword: false,
  });

  // Inisialisasi form dengan react-hook-form dan zodResolver
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmationPassword: "",
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
          toast.error(err.response?.message || "Gagal mengubah kata sandi.");
        },
      },
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
                <div className="relative">
                  <Input
                    type={showPasswords.password ? "text" : "password"}
                    placeholder="******"
                    {...field}
                    disabled={isPending}
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    {showPasswords.password ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmationPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={
                      showPasswords.confirmationPassword ? "text" : "password"
                    }
                    placeholder="******"
                    {...field}
                    disabled={isPending}
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirmationPassword: !prev.confirmationPassword,
                      }))
                    }
                  >
                    {showPasswords.confirmationPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </div>
                </div>
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
