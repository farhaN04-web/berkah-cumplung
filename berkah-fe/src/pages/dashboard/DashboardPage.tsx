import PageTitle from "@/components/dashboard/PageTitle";
import { EmptyState, LoadingState } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LatestOrderItem from "@/features/dashboard/components/LatestOrderItem";
import StatisticCard from "@/features/dashboard/components/StatisticCard";
import { useAdminOrders } from "@/hooks/useAdminOrder";
import {
  useCountTransaction,
  useTotalCustomer,
  useTotalProduct,
  useTotalTransaction,
} from "@/hooks/useDashboard";
import { formatRupiah } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const query = {
    status: "",
    page: 1,
    size: 5,
  };

  const { data: totalTransaction, isLoading: totalTransactionLoading } =
    useTotalTransaction();
  const { data: countTransaction, isLoading: countTransactionLoading } =
    useCountTransaction();
  const { data: totalProduct, isLoading: totalProductLoading } =
    useTotalProduct();
  const { data: totalCustomer, isLoading: totalCustomerLoading } =
    useTotalCustomer();

  const { data: latestOrder, isLoading: latestOrderLoading } = useAdminOrders(
    query.status,
    query.page,
    query.size,
  );

  console.log({ latestOrder });

  const isLoading =
    totalTransactionLoading ||
    countTransactionLoading ||
    totalProductLoading ||
    totalCustomerLoading ||
    latestOrderLoading;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-row items-center h-12 gap-4">
        <PageTitle title="Dashboard" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-28" />
          ))
        ) : (
          <>
            <StatisticCard
              title="Total Pendapatan"
              value={formatRupiah(totalTransaction?.data || 0)}
            />
            <StatisticCard
              title="Pesanan"
              value={countTransaction?.data || 0}
            />
            <StatisticCard title="Produk" value={totalProduct?.data || 0} />
            <StatisticCard title="Pelanggan" value={totalCustomer?.data || 0} />
          </>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-center">
            Pesanan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-end w-full">
            <Button
              variant="link"
              className="p-0 text-base text-amber-800"
              asChild
            >
              <Link to="/dashboard/order">
                Lihat Semua
                <ArrowUpRight className="size-6" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <LoadingState className="w-full min-h-64" />
            ) : !isLoading && (latestOrder?.data ?? []).length < 1 ? (
              <EmptyState
                className="w-full min-h-32"
                message="Belum ada pesanan terbaru"
              />
            ) : (
              latestOrder?.data?.map((order) => (
                <LatestOrderItem
                  key={order.id}
                  code={order.orderId}
                  name={order.name}
                  price={order.total}
                  date={order.createdAt}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
