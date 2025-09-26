import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { Loader2, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { attachNavbarScrollListener } from "../../utils/scrollHandler";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

const menus = [
  {
    label: "Beranda",
    path: "/",
  },
  {
    label: "Katalog Produk",
    path: "/catalog",
  },
  {
    label: "Tentang Kami",
    path: "/about",
  },
  {
    label: "Kontak",
    path: "/contact",
  },
];
export const Header = () => {
  const { session, sessionLoading } = useSession();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: cartItems } = useCart(!sessionLoading && !!session);

  const cartCount = Array.isArray(cartItems?.data) ? cartItems.data.length : 0;

  useEffect(() => {
    const cleanup = attachNavbarScrollListener(setIsScrolled);
    return cleanup;
  }, []);

  const isActive = (path: string) => {
    return path === "/" && location.pathname === "/"
      ? true
      : path !== "/" && location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 z-50 flex flex-row items-center w-full">
      <nav
        className={cn(
          "z-50 h-20 w-full bg-white py-4 transition-all duration-300",
          isScrolled && "bg-white/80 shadow backdrop-blur-md",
        )}
      >
        <div className="container flex items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Logo Berkah Cumplung"
                className="h-12"
              />
            </Link>

            <ul className="hidden gap-8 text-lg md:flex md:text-xl">
              {menus.map((menu) => (
                <li key={menu.path}>
                  <Link
                    to={menu.path}
                    className={cn(
                      "text-neutral_500 hover:text-black",
                      isActive(menu.path) && "font-semibold text-black",
                    )}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="items-center hidden gap-4 md:flex">
            {session ? (
              <>
                {session.user.role === "user" && (
                  <>
                    <Link to="/cart" className="relative">
                      <Button size="icon" className="px-4" variant="ghost">
                        <ShoppingCart className="cursor-pointer" />
                        {cartCount > 0 && (
                          <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full right-1 top-1">
                            {cartCount}
                          </span>
                        )}
                      </Button>
                    </Link>

                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}
                <ProfileMenu />
              </>
            ) : sessionLoading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="text-lg border-amber-800 text-amber-800 hover:border-amber-800 hover:bg-amber-500 hover:text-white"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="text-lg bg-amber-800 hover:bg-amber-500">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-white shadow-md md:hidden">
            <div className="flex items-center justify-between mb-6">
              <img
                src="/images/logo.png"
                alt="Logo Berkah Cumplung"
                className="h-12"
              />
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <ul className="space-y-4 text-xl">
              {menus.map((menu) => (
                <li key={menu.path}>
                  <Link
                    to={menu.path}
                    className={cn(
                      "font-medium",
                      isActive(menu.path) && "text-amber-800",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-6">
              {session ? (
                <div className="flex items-center justify-between">
                  <ProfileMenu />
                  {session.user.role === "user" && (
                    <>
                      <Link
                        to="/cart"
                        className="relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button size="icon" className="px-4" variant="ghost">
                          <ShoppingCart className="cursor-pointer" />
                          {cartCount > 0 && (
                            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full right-1 top-1">
                              {cartCount}
                            </span>
                          )}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              ) : sessionLoading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <div className="flex flex-row justify-between w-full space-x-2">
                  <Link to="/login" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full text-lg border-amber-800 text-amber-800 hover:border-amber-800 hover:bg-amber-500 hover:text-white"
                    >
                      Masuk
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full text-lg bg-amber-800 hover:bg-amber-500">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
