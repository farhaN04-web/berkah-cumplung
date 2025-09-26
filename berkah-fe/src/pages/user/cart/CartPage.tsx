import { ErrorState } from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { CartItemComponent } from "@/features/cart/components/CartItem";
import { CartOrder } from "@/features/cart/components/CartOrder";
import { useCart } from "@/hooks/useCart";
import { useSession } from "@/hooks/useSession";
import { Loader2, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { session, sessionLoading } = useSession();
  const { data: cartItems, isLoading, isError, errorMessage } = useCart();

  useEffect(() => {
    if (session?.user.role === "admin") {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="container mx-auto space-y-10 px-4 py-10">
      <h1 className="text-2xl font-bold text-amber-800 md:text-[32px]">
        Keranjang Belanja
      </h1>

      {isLoading || sessionLoading ? (
        <div className="flex h-[500px] items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : isError ? (
        <ErrorState
          className="h-[500px]"
          message={errorMessage ?? "Gagal memuat keranjang"}
        />
      ) : cartItems?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-44 text-center">
          <div className="rounded-full bg-amber-300 p-6">
            <ShoppingBag className="h-8 w-8 text-amber-800" />
          </div>
          <h2 className="text-lg font-medium text-black md:text-2xl">
            Keranjang Anda Kosong
          </h2>
          <p className="text-lg text-neutral_500 md:text-2xl">
            Sepertinya Anda belum menambahkan produk apapun ke keranjang
          </p>
          <Link to="/login">
            <Button className="bg-amber-800 text-base hover:bg-amber-500 hover:opacity-90 md:text-lg">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full rounded-lg border p-6 lg:w-2/3">
            <h2 className="mb-4 text-lg font-bold text-black md:text-2xl">
              Produk ({cartItems?.data.length})
            </h2>
            <div className="space-y-4">
              {cartItems?.data.map((item) => (
                <CartItemComponent
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  product_name={item.product_name}
                  product_image={item.product_image}
                  qty={item.qty}
                  subtotal={item.subtotal}
                />
              ))}
            </div>
          </div>

          <CartOrder items={cartItems?.data ?? []} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
