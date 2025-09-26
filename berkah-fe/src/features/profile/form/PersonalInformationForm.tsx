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
import { InformationFormSchema } from "@/schemas/profile";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

type PersonalInformationFormProps = {
  onSubmit: (values: InformationFormSchema) => void;
  isLoading: boolean;
};

export default function PersonalInformationForm({
  onSubmit,
  isLoading,
}: PersonalInformationFormProps) {
  const form = useFormContext<InformationFormSchema>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="User Name" {...field} />
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
                <Input
                  type="email"
                  placeholder="user@gmail.com"
                  disabled
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button
        type="submit"
        className="bg-amber-800 text-base hover:bg-amber-500"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            "Menyimpan..."
          </>
        ) : (
          "Simpan Perubahan"
        )}
      </Button>
    </form>
  );
}
