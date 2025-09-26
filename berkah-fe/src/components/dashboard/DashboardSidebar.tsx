import {
  Box,
  ChevronDown,
  ChevronUp,
  Home,
  LineChart,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logout from "@/components/profile/Logout";
import { useCountTransaction } from "@/hooks/useDashboard";
import { useEffect, useState } from "react";

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

export function DashboardSidebar() {
  const location = useLocation();
  const { data: countTransaction } = useCountTransaction();
  const orderCount = countTransaction?.data ? countTransaction?.data : 0;

  const [openSalesMenu, setOpenSalesMenu] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  useEffect(() => {
    const shouldOpen =
      location.pathname === "/dashboard/order-stats" ||
      location.pathname.startsWith("/dashboard/order-stats/");
    setOpenSalesMenu(shouldOpen);
  }, [location.pathname]);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-center w-full h-16 border-b text-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="text-2xl font-medium text-center">Berkah Cumplung</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      "flex h-12 flex-row items-center gap-3 rounded-none px-6 text-foreground transition-colors duration-150 hover:bg-amber-500 hover:text-primary-foreground",
                      isActive(item.url) &&
                        "bg-amber-800 text-primary-foreground hover:bg-amber-500 hover:text-primary-foreground",
                    )}
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon className="!size-5" />
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
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenSalesMenu(!openSalesMenu)}
                  className={cn(
                    "flex h-12 w-full flex-row items-center gap-3 rounded-none px-6 text-foreground transition-colors duration-150 hover:bg-amber-500 hover:text-primary-foreground",
                    isActive("/dashboard/order-stats") &&
                      "bg-amber-800 text-primary-foreground hover:bg-amber-500 hover:text-primary-foreground",
                  )}
                >
                  <LineChart className="!size-5" />
                  <span className="font-medium">Daftar Penjualan</span>
                  {openSalesMenu ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </SidebarMenuButton>

                {openSalesMenu && (
                  <div className="flex flex-col ml-10">
                    <Link
                      to="/dashboard/order-stats"
                      className={cn(
                        "flex h-10 items-center text-sm text-muted-foreground hover:font-medium hover:text-primary",
                        location.pathname === "/dashboard/order-stats" &&
                          "font-medium text-primary",
                      )}
                    >
                      Semua
                    </Link>
                    <Link
                      to="/dashboard/order-stats/by-category"
                      className={cn(
                        "flex h-10 items-center text-sm text-muted-foreground hover:font-medium hover:text-primary",
                        location.pathname ===
                          "/dashboard/order-stats/by-category" &&
                          "font-medium text-primary",
                      )}
                    >
                      Per Kategori
                    </Link>
                  </div>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Logout isDashboard />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
