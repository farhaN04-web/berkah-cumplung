import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  InformationFormSchema,
  informationFormSchema,
} from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PersonalInformationForm from "@/features/profile/form/PersonalInformationForm";
import { useUpdatePersonalInformation } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";

export default function PersonalInformation() {
  const { session } = useSession();

  const form = useForm<InformationFormSchema>({
    resolver: zodResolver(informationFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (session) {
      form.setValue("name", session.user.name);
    }
  }, [session, form]);

  const { mutate: updatePersonalInformation, isLoading } =
    useUpdatePersonalInformation();

  const onUpdatePersonalInformation = (values: InformationFormSchema) => {
    updatePersonalInformation(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-lg font-bold text-black md:text-2xl">
            Informasi Pribadi
          </h1>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-neutral_500 md:text-base">
            Perbarui informasi profil Anda
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <PersonalInformationForm
            onSubmit={onUpdatePersonalInformation}
            isLoading={isLoading}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
