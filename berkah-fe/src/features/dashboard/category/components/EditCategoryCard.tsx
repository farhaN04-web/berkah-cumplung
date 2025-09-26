import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingState, ErrorState } from "@/components/layout";
import { updateCategorySchema, UpdateCategorySchema } from "@/schemas/category";
import { useAdminCategory, useUpdateCategory } from "@/hooks/useAdminCategory";
import { EditCategoryForm } from "../form/EditCategoryForm";

export default function EditCategoryCard({
  categoryId,
}: {
  categoryId: string;
}) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useAdminCategory(categoryId);

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: categoryId,
      name: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        id: categoryId,
        name: data.data.name || "",
      });
    }
  }, [data?.data, categoryId, form]);

  const handleSuccess = useCallback(() => {
    navigate("/dashboard/category");
  }, [navigate]);

  const { mutate: updateCategory } = useUpdateCategory();

  const handleSubmit = (values: UpdateCategorySchema) => {
    console.log(values);
    values.id = categoryId;
    updateCategory(values, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Edit Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState message="Gagal memuat data produk" />
        ) : (
          <Form {...form}>
            <EditCategoryForm onSubmit={handleSubmit} />
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
