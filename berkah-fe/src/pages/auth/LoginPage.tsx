import { FullScreenLoading } from "@/components/layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoginForm } from "@/features/auth/form/LoginForm";
import { useSignIn } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { session, sessionLoading } = useSession();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutate: signIn, isPending } = useSignIn();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleLogin = async (values: LoginSchema) => {
    signIn(values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
      },
    });
  };

  return sessionLoading ? (
    <FullScreenLoading />
  ) : (
    <div className="h-[calc(100vh-5.25rem)] w-full bg-amber-50">
      <div className="container mx-auto flex h-full w-full flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black md:text-2xl">
              Masuk ke Akun Anda
            </CardTitle>
            <p className="text-sm text-neutral_500 md:text-base">
              Masukkan email dan kata sandi untuk mengakses akun Anda
            </p>
          </CardHeader>

          <Form {...form}>
            <LoginForm onLoginSubmit={handleLogin} isLoading={isPending} />
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
