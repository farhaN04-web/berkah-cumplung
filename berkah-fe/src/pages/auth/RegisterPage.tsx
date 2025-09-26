import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { RegisterForm } from "@/features/auth/form/RegisterForm";
import { useSignUp } from "@/hooks/useAuth";
import { registerSchema, RegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useSignUp();

  const handleRegister = async (values: RegisterSchema) => {
    registerUser(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmationPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          form.setError("name", {
            type: "manual",
            message: error.message,
          });
        },
      },
    );
  };

  return (
    <div className="h-[calc(100vh-5.25rem)] w-full bg-amber-50">
      <div className="container mx-auto flex h-full w-full flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black md:text-2xl">
              Buat Akun Baru
            </CardTitle>
            <p className="text-sm text-neutral_500 md:text-base">
              Daftar untuk mulai berbelanja di Berkah Cumplung
            </p>
          </CardHeader>

          <Form {...form}>
            <RegisterForm
              onRegisterSubmit={handleRegister}
              isLoading={isPending}
            />
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
