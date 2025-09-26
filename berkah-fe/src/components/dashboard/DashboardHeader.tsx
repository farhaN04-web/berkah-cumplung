import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Box,
  ChevronDown,
  ChevronUp,
  Home,
  LineChart,
  Loader2,
  LogOut,
  Menu,
  ShoppingBag,
  Store,
  Tag,
  Users,
  X,
} from "lucide-react";
import { useCountTransaction } from "@/hooks/useDashboard";
import { cn } from "@/lib/utils";
import { useSignOut } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Produk",
    url: "/dashboard/product",
    icon: Box,
  },
  {
    title: "Pesanan",
    url: "/dashboard/order",
    icon: ShoppingBag,
  },
  {
    title: "Kategori",
    url: "/dashboard/category",
    icon: Tag,
  },
  {
    title: "Pelanggan",
    url: "/dashboard/customer",
    icon: Users,
  },
];

export default function DashboardHeader() {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: countTransaction } = useCountTransaction();
  const orderCount = countTransaction?.data ? countTransaction?.data : 0;
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signOut = useSignOut();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut("/");
      setIsOpen(false);
    } catch (error) {
      toast.error("Gagal keluar");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const shouldOpen =
      location.pathname === "/dashboard/order-stats" ||
      location.pathname.startsWith("/dashboard/order-stats/");
    setOpenSalesMenu(shouldOpen);
  }, [location.pathname]);

  const [openSalesMenu, setOpenSalesMenu] = useState(false);

  return (
    <>
      <header className="flex flex-row items-center justify-between w-full h-16 px-4 border-b bg-background">
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={28} />
        </Button>
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <Link to="/">
          <Button variant="outline">
            <Store className="md:hidden" />
            <span className="hidden md:block">Lihat Toko</span>
          </Button>
        </Link>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          <aside className="relative z-50 w-64 h-full bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              {items.map((item) => (
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex justify-start",
                    isActive(item.url) &&
                      "bg-amber-800 text-primary-foreground hover:bg-amber-500 hover:text-primary-foreground",
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                  asChild
                >
                  <Link to={item.url} className="flex space-x-2">
                    <item.icon className="!size-5" />
                    <div className="flex justify-between w-full">
                      <span className="font-medium">{item.title}</span>
                      {orderCount > 0 &&
                        (item.title === "Pesanan" ||
                          item.url === "/dashboard/order") && (
                          <span
                            className={cn(
                              "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white",
                              isActive(item.url) && "bg-white text-amber-800",
                            )}
                          >
                            {orderCount}
                          </span>
                        )}
                    </div>
                  </Link>
                </Button>
              ))}
              <Button
                variant={"outline"}
                className="flex justify-start cursor-pointer"
                onClick={() => setOpenSalesMenu(!openSalesMenu)}
                asChild
              >
                <div className="flex space-x-2">
                  <LineChart className="!size-5" />
                  <span className="font-medium">Daftar Penjualan</span>
                  {openSalesMenu ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </div>
              </Button>
              {openSalesMenu && (
                <div className="flex flex-col space-y-2">
                  <Button variant={"outline"} asChild>
                    <Link
                      to="/dashboard/order-stats"
                      className={cn(
                        "flex h-10 items-center text-sm text-muted-foreground hover:font-medium hover:text-primary",
                        location.pathname === "/dashboard/order-stats" &&
                          "font-medium text-primary",
                      )}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Semua
                    </Link>
                  </Button>
                  <Button variant={"outline"} asChild>
                    <Link
                      to="/dashboard/order-stats/by-category"
                      className={cn(
                        "flex h-10 items-center text-sm text-muted-foreground hover:font-medium hover:text-primary",
                        location.pathname ===
                          "/dashboard/order-stats/by-category" &&
                          "font-medium text-primary",
                      )}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Per Kategori
                    </Link>
                  </Button>
                </div>
              )}
              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger className="w-full" asChild>
                  <Button
                    variant="outline"
                    color="destructive"
                    className="justify-start px-6 W-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="mr-1 !size-5" />
                    Keluar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah Anda yakin ingin keluar?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                      Batal
                    </AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Keluar...
                        </>
                      ) : (
                        "Keluar"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
