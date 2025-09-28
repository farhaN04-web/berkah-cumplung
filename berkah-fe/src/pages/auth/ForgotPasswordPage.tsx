import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ForgotPasswordForm } from "@/features/auth/form/ForgotPasswordForm";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <div className="h-[calc(100vh-5.25rem)] w-full bg-amber-50">
      <div className="container mx-auto flex h-full w-full flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black md:text-2xl">
              Lupa Kata Sandi
            </CardTitle>
            <p className="text-sm text-neutral_500 md:text-base">
              Masukkan email Anda untuk menerima reset kata sandi
            </p>
          </CardHeader>

          <Form {...form}>
            <ForgotPasswordForm />
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
