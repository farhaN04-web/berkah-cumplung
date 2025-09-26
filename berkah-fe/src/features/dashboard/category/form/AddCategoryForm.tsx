import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schemas/category";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

type AddCategoryFormProps = {
  onSubmit: (values: CategorySchema) => void;
};

export const AddCategoryForm = (props: AddCategoryFormProps) => {
  const form = useFormContext<CategorySchema>();

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Kategori</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukkan nama kategori"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <CardFooter className="flex flex-row justify-end gap-4 p-0 pt-2">
        <Button variant="outline" asChild>
          <Link to="/dashboard/category">Batal</Link>
        </Button>
        <Button type="submit" className="bg-amber-800 hover:bg-amber-500">
          Simpan
        </Button>
      </CardFooter>
    </form>
  );
};
