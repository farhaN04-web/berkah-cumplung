import {
  FormMessage,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
type ForgotPasswordFormProps = {
  onForgotPasswordSubmit: (values: ForgotPasswordSchema) => void;
  isLoading: boolean;
};

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const form = useFormContext<ForgotPasswordSchema>();

  return (
    <form onSubmit={form.handleSubmit(props.onForgotPasswordSubmit)}>
      <CardContent className="space-y-4">
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
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <Button
          type="submit"
          className="w-full bg-amber-800 text-base text-white hover:bg-amber-500 hover:opacity-90 md:text-lg"
        >
          Kirim
        </Button>
        <Link to="/login">
          <Button
            variant="link"
            className="ms-2 p-0 text-xs font-semibold text-amber-800 md:text-sm"
            disabled={props.isLoading}
          >
            {props.isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Memuat...</span>
              </>
            ) : (
              "Kembali ke halaman login"
            )}
          </Button>
        </Link>
      </CardFooter>
    </form>
  );
};
