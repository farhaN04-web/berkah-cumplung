import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AddToCartFormSchema } from "@/schemas/cart";
import { Loader2, Minus, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

type AddToCartFormProps = {
  onSubmit: (values: AddToCartFormSchema) => void;
  addToCartLoading: boolean;
  addToCartError: boolean;
  addToCartErrorMessage: string;
};

export const AddToCartForm = ({
  onSubmit,
  addToCartLoading,
  addToCartError,
  addToCartErrorMessage,
}: AddToCartFormProps) => {
  const form = useFormContext<AddToCartFormSchema>();

  const decrementQuantity = () => {
    const currentQuantity = form.getValues("quantity");
    form.setValue("quantity", currentQuantity - 1, {
      shouldValidate: true,
    });
  };

  const incrementQuantity = () => {
    const currentQuantity = form.getValues("quantity");
    form.setValue("quantity", currentQuantity + 1, {
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={field.value <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <FormControl>
                <p className="w-6 text-center font-bold">{field.value}</p>
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </FormItem>
        )}
      />
      <FormMessage />
      <Button
        type="submit"
        className="w-full bg-amber-800 text-base text-white hover:bg-amber-500 hover:opacity-90 sm:w-auto md:text-lg"
        disabled={
          addToCartLoading ||
          form.getValues("quantity") <= 0 ||
          !form.formState.isValid
        }
      >
        {addToCartLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Tambah ke Keranjang"
        )}
      </Button>
      {addToCartError && (
        <p className="text-destructive">{addToCartErrorMessage}</p>
      )}
    </form>
  );
};
