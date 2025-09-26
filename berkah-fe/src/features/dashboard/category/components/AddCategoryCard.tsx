import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateCategory } from "@/hooks/useAdminCategory";
import { AddCategoryForm } from "../form/AddCategoryForm";
import { categorySchema, CategorySchema } from "@/schemas/category";

export default function AddCategoryCard() {
  const navigate = useNavigate();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSuccess = useCallback(() => {
    navigate("/dashboard/category");
  }, [navigate]);

  const { mutate: createCategory } = useCreateCategory();

  const handleSubmit = (values: CategorySchema) => {
    createCategory(values, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Tambah Kategori Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <AddCategoryForm onSubmit={handleSubmit} />
        </Form>
      </CardContent>
    </Card>
  );
}
