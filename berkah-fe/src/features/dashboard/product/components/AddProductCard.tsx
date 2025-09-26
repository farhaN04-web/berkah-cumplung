import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { AddProductForm } from "@/features/dashboard/product/form/AddProductForm";
import { useCreateProduct } from "@/hooks/useAdminProducts";
import { productSchema, ProductSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategory";

export default function AddProductCard() {
  const navigate = useNavigate();
  const { data: categoryData } = useCategories();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      description: "",
      image: undefined,
      category_id: "",
    },
  });

  const handleSuccess = useCallback(() => {
    navigate("/dashboard/product");
  }, [navigate]);

  const { mutate: createProduct } = useCreateProduct();

  const handleSubmit = (values: ProductSchema) => {
    createProduct(values, {
      onSuccess: handleSuccess,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Tambah Produk Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <AddProductForm
            onSubmit={handleSubmit}
            categories={categoryData?.data || []}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
