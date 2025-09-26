import { ErrorState, LoadingState } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import DetailOrderItem from "@/features/dashboard/order/components/DetailOrderItem";
import { UpdateOrderStatusForm } from "@/features/dashboard/order/form/UpdateOrderStatusForm";
import { useAdminOrder, useUpdateOrderStatus } from "@/hooks/useAdminOrder";
import { formatRupiah } from "@/lib/utils";
import {
  updateOrderStatusSchema,
  UpdateOrderStatusSchema,
} from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function DetailOrderCard({ orderId }: { orderId: string }) {
  const { data, isLoading, isError, errorMessage } = useAdminOrder(orderId);
  const {
    mutate: updateOrderStatus,
    isLoading: isUpdating,
    isError: isUpdatingError,
    errorMessage: updatingErrorMessage,
  } = useUpdateOrderStatus();

  console.log(data);

  const form = useForm<UpdateOrderStatusSchema>({
    resolver: zodResolver(updateOrderStatusSchema),
    defaultValues: {
      status: undefined,
      id: "",
      shipping_status: undefined,
      shipping_number: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.setValue("id", data.data.id);
      form.setValue(
        "status",
        data.data.status as "pending" | "success" | "failed",
      );
      form.setValue(
        "shipping_status",
        data.data.shipping_status as "pending" | "success" | "failed",
      );
      form.setValue("shipping_number", data.data.shipping_number);

      console.log("Nilai setelah diatur:", form.getValues());
    }
  }, [data?.data, form]);

  const onSubmit = (values: UpdateOrderStatusSchema) => {
    console.log("Mengirim nilai:", values);
    updateOrderStatus(values);
  };

  return (
    <>
      <Card>
        <CardHeader className="inline-flex items-center justify-between">
          <CardTitle className="text-xl font-bold md:text-2xl">
            Detail Pesanan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState className="w-full min-h-64" />
          ) : isError ? (
            <ErrorState className="w-full min-h-64" message={errorMessage!} />
          ) : (
            data?.data.TransactionDetails.map((detail) => (
              <DetailOrderItem
                key={detail.id}
                productName={detail.product_name}
                productPrice={detail.price}
                productQuantity={detail.qty}
                subTotal={detail.sub_total}
                image={detail.product_image}
              />
            ))
          )}
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-between w-full md:flex-row">
        <Form {...form}>
          <UpdateOrderStatusForm onSubmit={onSubmit} />
        </Form>
        <p className="mt-4 text-xl font-semibold md:mt-0 md:text-base">
          Total: {formatRupiah(data?.data.total ?? 0)}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-4 md:justify-end">
        <Button variant="outline" disabled={isUpdating} asChild>
          <Link to="/dashboard/order">Batal</Link>
        </Button>
        <Button
          className="bg-amber-800 hover:bg-amber-500"
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Memperbarui status...
            </>
          ) : (
            "Simpan"
          )}
        </Button>
      </div>
      {isUpdatingError && (
        <ErrorState
          className="w-full min-h-12"
          message={updatingErrorMessage!}
        />
      )}
    </>
  );
}
