import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ChangePasswordSchema, changePasswordSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangePasswordForm from "@/features/profile/form/ChangePasswordForm";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "@/hooks/useProfile";

export default function ChangePassword() {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: updatePassword, isLoading } = useUpdatePassword();

  const onChangePassword = (values: ChangePasswordSchema) => {
    updatePassword({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
      newConfirmPassword: values.confirmPassword,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold">Ubah Kata Sandi</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-neutral_500 md:text-base">
            Perbarui kata sandi akun Anda
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <ChangePasswordForm
            onSubmit={onChangePassword}
            isLoading={isLoading}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
