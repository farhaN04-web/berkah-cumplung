import {
  EmptyState,
  ErrorState,
  LoadingState,
  PaginationWrapper,
} from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusFilter } from "@/features/dashboard/order/components/StatusOrderFilter";
import { useAdminOrders } from "@/hooks/useAdminOrder";
import { cn, formatDate, formatRupiah, statusWords } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function OrderPage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const status = searchParams.get("status") || "";

  const { data, isLoading, isError, errorMessage } = useAdminOrders(
    status,
    parseInt(page),
    10,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Daftar Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderStatusFilter />
        {isLoading ? (
          <LoadingState className="min-h-64 w-full" />
        ) : isError ? (
          <ErrorState className="min-h-64 w-full" message={errorMessage!} />
        ) : data?.data.length === 0 ? (
          <EmptyState
            className="min-h-64 w-full"
            message="Belum ada data pesanan"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Nama Pembeli</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Tanggal Pesanan</TableHead>
                <TableHead>Status Pembayaran</TableHead>
                <TableHead>Status Pengiriman</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{formatRupiah(order.total)}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      className={cn(
                        order.status === "pending" &&
                          "bg-yellow-100 text-amber-700",
                        order.status === "success" &&
                          "bg-green-100 text-green-600",
                        order.status === "failed" &&
                          "bg-red-100 text-destructive",
                      )}
                    >
                      {statusWords(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      className={cn(
                        order.shipping_status === "pending" &&
                          "bg-yellow-100 text-amber-700",
                        order.shipping_status === "success" &&
                          "bg-green-100 text-green-600",
                        order.shipping_status === "failed" &&
                          "bg-red-100 text-destructive",
                      )}
                    >
                      {statusWords(order.shipping_status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/dashboard/order/${order.id}/edit`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <PaginationWrapper
          paging={
            data?.paging
              ? {
                  ...data.paging,
                  current_page: parseInt(page), // Ensure the current page is explicit
                }
              : undefined
          }
          className="mt-4"
        />
      </CardContent>
    </Card>
  );
}
