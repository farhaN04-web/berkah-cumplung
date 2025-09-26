import { Button } from "@/components/ui/button";
import { useUpdateCartItem } from "@/hooks/useCart";
import { formatRupiah } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { DeleteCartItem } from "./DeleteCartItem";

type CartItemProps = {
  id: string;
  price: number;
  product_name: string;
  product_image: string;
  qty: number;
  subtotal: number;
};

export const CartItemComponent = ({
  id,
  price,
  product_name,
  product_image,
  qty,
}: CartItemProps) => {
  const { mutate: updateCartItem, isPending } = useUpdateCartItem();
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const handleUpdateCartItem = (id: string, qty: number) => {
    updateCartItem({ cartId: id, quantity: qty });
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useDebounce(
    () => {
      if (quantity > 0 && quantity !== qty) {
        handleUpdateCartItem(id, quantity);
      }
    },
    500,
    [quantity],
  );

  return (
    <div className="flex items-center gap-4 pb-4">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${product_image}`}
        alt={product_name}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-black md:text-base">
          {product_name}
        </h3>
        <p className="text-sm text-neutral_500 md:text-base">
          Rp{price.toLocaleString("id-ID")} / item
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={decrementQuantity}
            disabled={isPending || quantity <= 1}
          >
            <Minus className="size-4" />
          </Button>
          <span>{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={incrementQuantity}
            disabled={isPending}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="mb-4 text-lg font-bold text-black md:text-2xl">
          {formatRupiah(price * quantity)}
        </p>
        <DeleteCartItem cartId={id} />
      </div>
    </div>
  );
};
