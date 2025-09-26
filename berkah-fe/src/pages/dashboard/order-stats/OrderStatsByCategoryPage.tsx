import { EmptyState, ErrorState, LoadingState } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSalesByCategory } from "@/hooks/useSalesByCategory";
// import { useSearchParams } from "react-router-dom";
import { formatRupiah } from "@/lib/utils";
import { useState } from "react";
import { SalesFilter } from "./components/SalesFilter";

export default function OrderStatsByCategoryPage() {
  const [period, setPeriod] = useState<"daily" | "monthly" | "yearly">("daily");
  const [value, setValue] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const { data, isLoading, isError, errorMessage } = useSalesByCategory(
    period,
    value,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">
          Daftar Penjualan Per Kategori
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SalesFilter
          period={period}
          value={value}
          onChange={(newPeriod, newValue) => {
            setPeriod(newPeriod);
            setValue(newValue);
          }}
        />
        {isLoading ? (
          <LoadingState className="w-full min-h-64" />
        ) : isError ? (
          <ErrorState
            className="w-full min-h-64"
            message={errorMessage || "Gagal memuat data penjualan"}
          />
        ) : !data?.data || data.data.length === 0 ? (
          <EmptyState
            className="w-full min-h-64"
            message="Belum ada data penjualan"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Total Produk Terjual</TableHead>
                <TableHead>Total Penjualan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item) => (
                <TableRow key={item.categoryId}>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.totalSold}</TableCell>
                  <TableCell>{formatRupiah(item.totalRevenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
