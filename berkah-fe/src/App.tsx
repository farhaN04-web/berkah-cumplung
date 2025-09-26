import { AboutUsPage } from "@/pages/user/about";
import { ContactPage } from "@/pages/user/contact";
import { HomePage } from "@/pages/user";
import NotFoundPage from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/user/profile";
import { ScrollToTop } from "@/utils/scrollToTop";
import { Route, Routes } from "react-router-dom";
import {
  ProductPage,
  AddProductPage,
  EditProductPage,
} from "@/pages/dashboard/product";
import {
  BaseLayout,
  DashboardLayout,
  DashboardProductLayout,
  DashboardOrderLayout,
  DashboardCustomerLayout,
} from "@/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/provider/SessionProvider";
import { Toaster } from "react-hot-toast";
import { OrderPage, EditOrderPage } from "@/pages/dashboard/order";
import { CustomerPage } from "@/pages/dashboard/customer";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/pages/auth";
import { CatalogProductPage, ProductDetailPage } from "@/pages/user/catalog";
import { CartPage } from "@/pages/user/cart";
import { DashboardPage } from "@/pages/dashboard";
import { HistoryPage } from "@/pages/user/history";
import CategoryPage from "./pages/dashboard/category/CategoryPage";
import AddCategoryPage from "./pages/dashboard/category/AddCategoryPage";
import EditCategoryPage from "./pages/dashboard/category/EditCategoryPage";
import DashboardCategoryLayout from "./components/layout/DashboardCategoryLayout";
import OrderStatsPage from "./pages/dashboard/order-stats/OrderStatsPage";
import DashboardOrderStatsLayout from "./components/layout/DashboardOrderStatsLayout";
import OrderStatsByCategoryPage from "./pages/dashboard/order-stats/OrderStatsByCategoryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <ScrollToTop />

        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogProductPage />} />
            <Route path="/catalog/:productId" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route element={<DashboardProductLayout />}>
              <Route path="/dashboard/product" element={<ProductPage />} />
              <Route
                path="/dashboard/product/add"
                element={<AddProductPage />}
              />
              <Route
                path="/dashboard/product/:productId/edit"
                element={<EditProductPage />}
              />
            </Route>
            <Route element={<DashboardOrderLayout />}>
              <Route path="/dashboard/order" element={<OrderPage />} />
              <Route
                path="/dashboard/order/:orderId/edit"
                element={<EditOrderPage />}
              />
            </Route>
            <Route element={<DashboardCategoryLayout />}>
              <Route path="/dashboard/category" element={<CategoryPage />} />
              <Route
                path="/dashboard/category/add"
                element={<AddCategoryPage />}
              />
              <Route
                path="/dashboard/category/:categoryId/edit"
                element={<EditCategoryPage />}
              />
            </Route>
            <Route element={<DashboardCustomerLayout />}>
              <Route path="/dashboard/customer" element={<CustomerPage />} />
            </Route>
            <Route element={<DashboardOrderStatsLayout />}>
              <Route
                path="/dashboard/order-stats"
                element={<OrderStatsPage />}
              />
              <Route
                path="/dashboard/order-stats/by-category"
                element={<OrderStatsByCategoryPage />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
