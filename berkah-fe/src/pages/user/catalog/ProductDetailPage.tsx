import { ErrorState } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AddToCartForm } from "@/features/cart/form/AddToCartForm";
import { useAddToCart } from "@/hooks/useCart";
import { useProductById } from "@/hooks/useProducts";
import { useSession } from "@/hooks/useSession";
import { formatRupiah } from "@/lib/utils";
import { addToCartFormSchema, AddToCartFormSchema } from "@/schemas/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { session, sessionLoading } = useSession();

  const {
    data: product,
    isLoading,
    isError,
    errorMessage,
  } = useProductById(productId!);

  const {
    mutate: addToCart,
    isLoading: addToCartLoading,
    isError: addToCartError,
    errorMessage: addToCartErrorMessage,
  } = useAddToCart();

  const form = useForm<AddToCartFormSchema>({
    resolver: zodResolver(addToCartFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (values: AddToCartFormSchema) => {
    addToCart(
      {
        productId: productId!,
        quantity: values.quantity,
      },
      {
        onSuccess: () => {
          form.reset({ quantity: 1 });
        },
      },
    );
  };

  return (
    <div className="h-[calc(100vh-5.25rem)] w-full">
      <div className="container flex flex-col justify-center w-full h-full mx-auto space-y-6">
        <Button
          className="max-w-max bg-amber-800 hover:bg-amber-500"
          asChild
        >
          <Link to="/catalog">
            <ArrowLeft className="size-4" />
            Kembali
          </Link>
        </Button>
        <div className="flex flex-wrap space-x-6 md:flex-nowrap">
          {isLoading || sessionLoading ? (
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-10 animate-spin" />
            </div>
          ) : isError ? (
            <ErrorState
              className="h-[500px]"
              message={errorMessage ?? "Gagal memuat produk"}
            />
          ) : (
            <>
              <div className="w-1/2 mx-auto overflow-hidden rounded-lg aspect-square md:mx-0">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${product?.data.image}`}
                  alt={product?.data.name}
                  className="object-cover w-full"
                />
              </div>
              <div className="w-full md:1/2 md:mt-0">
                <h1 className="mb-4 text-2xl font-bold text-black md:text-[32px]">
                  {product?.data.name}
                </h1>
                <h5 className="mb-4 text-lg text-black md:text-md">
                  Stok: {product?.data.stock}
                </h5>
                <h3 className="mb-4 text-lg text-black font-bold md:text-2xl">
                  {formatRupiah(product?.data.price ?? 0)}
                </h3>
                <h2 className="mb-2 text-lg font-bold text-black md:text-xl">
                  Deskripsi
                </h2>
                <p className="text-sm text-black md:text-base">
                  {product?.data.description}
                </p>

                {session && !sessionLoading ? (
                  <Form {...form}>
                    <AddToCartForm
                      onSubmit={onSubmit}
                      addToCartLoading={addToCartLoading}
                      addToCartError={addToCartError}
                      addToCartErrorMessage={addToCartErrorMessage ?? ""}
                    />
                  </Form>
                ) : (
                  <div className="mt-6">
                    <Button
                      className="w-full max-w-max bg-amber-800 hover:bg-amber-500"
                      asChild
                    >
                      <Link to="/login">Login untuk membeli</Link>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
