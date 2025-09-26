import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAdminProduct, useUpdateProduct } from "@/hooks/useAdminProducts";
import { updateProductSchema, UpdateProductSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EditProductForm } from "@/features/dashboard/product/form/EditProductForm";
import { LoadingState, ErrorState } from "@/components/layout";
import { useCategories } from "@/hooks/useCategory";

export default function EditProductCard({ productId }: { productId: string }) {
  const navigate = useNavigate();
  const { data: categoryData } = useCategories();

  const { data, isLoading, isError } = useAdminProduct(productId);

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: productId,
      name: "",
      price: "",
      stock: "",
      description: "",
      image: undefined,
      category_id: "",
    },
  });

  // Fill form when data is loaded
  useEffect(() => {
    if (data?.data) {
      form.reset({
        id: productId,
        name: data.data.name || "",
        price: data.data.price?.toString() || "",
        stock: data.data.stock?.toString() || "",
        description: data.data.description || "",
        image: undefined,
        category_id: data.data.category_id || "",
      });
    }
  }, [data?.data, productId, form]);

  const handleSuccess = useCallback(() => {
    navigate("/dashboard/product");
  }, [navigate]);

  const { mutate: updateProduct } = useUpdateProduct();

  const handleSubmit = (values: UpdateProductSchema) => {
    console.log(values);
    values.id = productId;
    updateProduct(values, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Edit Produk</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState message="Gagal memuat data produk" />
        ) : (
          <Form {...form}>
            <EditProductForm
              onSubmit={handleSubmit}
              categories={categoryData?.data || []}
            />
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
