import {
  EmptyState,
  ErrorState,
  LoadingState,
  PaginationWrapper,
} from "@/components/layout";
import { TableBody, TableCell, TableHead } from "@/components/ui/table";
import { TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useCustomers } from "@/hooks/useCustomers";
import { formatDate } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

export default function CustomerPage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";

  const { data, isLoading, isError, errorMessage } = useCustomers(
    parseInt(page),
    10,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Daftar Pelanggan</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState className="min-h-64 w-full" />
        ) : isError ? (
          <ErrorState
            className="min-h-64 w-full"
            message={errorMessage || "Gagal memuat data pelanggan"}
          />
        ) : data?.data.length === 0 ? (
          <EmptyState
            className="min-h-64 w-full"
            message="Belum ada data pelanggan"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pesanan</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.transactionCount}</TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
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
