import { Button } from "@/components/ui/button";
import { useCheckoutCart } from "@/hooks/useCart";
import { formatRupiah, sendMessageToWhatsapp } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

type CartOrderProps = {
  items: {
    id: string;
    price: number;
    product_name: string;
    product_image: string;
    qty: number;
  }[];
};

export const CartOrder = ({ items }: CartOrderProps) => {
  const { mutate: checkoutCart, isLoading } = useCheckoutCart();
  const [selectedCourier, setSelectedCourier] = useState("Pos");
  const courierOptions = ["Pos", "JNE", "J&T", "SiCepat"];

  const handleCheckout = () => {
    checkoutCart(
      {
        cartId: items.map((item) => item.id),
      },
      {
        onSuccess: (response) => {
          sendMessageToWhatsapp({
            orderId: response.data.code,
            items: items.map((item) => ({
              productName: item.product_name,
              qty: item.qty,
              price: item.price * item.qty,
            })),
            expedition: selectedCourier,
          });
        },
      }
    );
  };

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [items]
  );

  return (
    <div className="h-fit w-full rounded-lg border p-6 lg:w-1/3">
      <h2 className="mb-4 text-lg font-bold text-black md:text-2xl">Pesanan</h2>
      <div className="mb-2 flex justify-between text-sm">
        <p className="text-sm text-black md:text-base">Subtotal</p>
        <p className="text-sm text-black md:text-base">
          {formatRupiah(subtotal)}
        </p>
      </div>
      <div className="my-4 border-b text-neutral_300"></div>
      <div className="mb-4 flex justify-between">
        <p className="text-sm font-medium text-black md:text-base">Total</p>
        <p className="text-sm font-medium text-black md:text-base">
          {formatRupiah(subtotal)}
        </p>
      </div>

      {/*  Tambahkan UI Dropdown untuk memilih kurir */}
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="courier"
          className="text-sm font-medium text-black md:text-base"
        >
          Pilih Ekspedisi
        </label>
        <select
          id="courier"
          value={selectedCourier}
          onChange={(e) => setSelectedCourier(e.target.value)}
          className="w-full rounded-md border bg-white p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-amber-500 md:text-base"
        >
          {courierOptions.map((courier) => (
            <option key={courier} value={courier}>
              {courier}
            </option>
          ))}
        </select>
      </div>

      <Button
        className="w-full bg-amber-800 text-base hover:bg-amber-500 md:text-lg"
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Checkout via WhatsApp"
        )}
      </Button>
    </div>
  );
};