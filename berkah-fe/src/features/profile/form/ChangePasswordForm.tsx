import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ChangePasswordSchema } from "@/schemas/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ChangePasswordFormProps = {
  onSubmit: (values: ChangePasswordSchema) => void;
  isLoading: boolean;
};

export default function ChangePasswordForm({
  onSubmit,
  isLoading,
}: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const form = useFormContext<ChangePasswordSchema>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="currentPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">Kata Sandi Saat Ini</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Kata Sandi Saat Ini"
                  className="pr-10"
                  {...field}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                >
                  {showPassword.current ? (
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
        name="newPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">Kata Sandi Baru</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="Kata Sandi Baru"
                  className="pr-10"
                  {...field}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                >
                  {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
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
            <FormLabel className="font-bold">Konfirmasi Kata Sandi</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Konfirmasi Kata Sandi"
                  className="pr-10"
                  {...field}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                >
                  {showPassword.confirm ? (
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
      <Button
        className="bg-amber-800 text-base hover:bg-amber-500 md:text-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            "Menyimpan..."
          </>
        ) : (
          "Ubah Kata Sandi"
        )}
      </Button>
    </form>
  );
}
