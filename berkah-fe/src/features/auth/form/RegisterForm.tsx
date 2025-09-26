import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormProps = {
  onRegisterSubmit: (values: RegisterSchema) => void;
  isLoading: boolean;
};

export const RegisterForm = ({
  onRegisterSubmit,
  isLoading = false,
}: RegisterFormProps) => {
  const form = useFormContext<RegisterSchema>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <form onSubmit={form.handleSubmit(onRegisterSubmit)}>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nama@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Kata Sandi</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Kata Sandi"
                    className="pr-10"
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    {showPassword.password ? (
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Konfirmasi Kata Sandi</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi Kata Sandi"
                    className="pr-10"
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    {showPassword.confirmPassword ? (
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
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <Button
          type="submit"
          className="w-full bg-amber-800 text-base text-white hover:bg-amber-500 hover:opacity-90 md:text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Daftar"
          )}
        </Button>
        <p className="text-center text-xs text-black md:text-sm">
          Sudah punya akun?{" "}
          <Button
            variant="link"
            className="p-0 text-xs font-semibold text-amber-800 md:text-sm"
            asChild
          >
            <Link to="/login">Masuk sekarang</Link>
          </Button>
        </p>
      </CardFooter>
    </form>
  );
};
