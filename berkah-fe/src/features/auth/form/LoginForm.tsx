import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { LoginSchema } from "@/schemas/auth";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type LoginFormProps = {
  onLoginSubmit: (values: LoginSchema) => void;
  isLoading?: boolean;
};

export const LoginForm = ({
  onLoginSubmit,
  isLoading = false,
}: LoginFormProps) => {
  const form = useFormContext<LoginSchema>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={form.handleSubmit(onLoginSubmit)}>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="nama@gmail.com"
                  disabled={isLoading}
                  {...field}
                />
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
              <div className="flex items-center justify-between">
                <FormLabel className="font-bold">Kata Sandi</FormLabel>
                <Link to="/forgot-password">
                  <Button
                    type="button"
                    variant="link"
                    disabled={isLoading}
                    className="p-0 text-xs text-amber-800 md:text-sm"
                  >
                    Lupa kata sandi?
                  </Button>
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Kata Sandi"
                    className="pr-10"
                    disabled={isLoading}
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-neutral_500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          disabled={isLoading}
          className="w-full bg-amber-800 text-base text-white hover:bg-amber-500 hover:opacity-90 md:text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Masuk"
          )}
        </Button>
        <p className="text-center text-xs text-black md:text-sm">
          Belum punya akun?{" "}
          <Button
            variant="link"
            disabled={isLoading}
            className="p-0 text-xs font-semibold text-amber-800 underline-offset-2 md:text-sm"
            asChild
          >
            <Link to="/register">Daftar sekarang</Link>
          </Button>
        </p>
      </CardFooter>
    </form>
  );
};
