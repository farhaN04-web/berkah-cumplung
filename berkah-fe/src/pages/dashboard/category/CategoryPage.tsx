import {
  EmptyState,
  ErrorState,
  LoadingState,
  PaginationWrapper,
} from "@/components/layout";
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
import { DeleteCategory } from "@/features/dashboard/category/components/DeleteCategory";
import { useAdminCategories } from "@/hooks/useAdminCategory";
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";

export default function CategoryPage() {
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";

  useEffect(() => {
    const container = document.getElementById("btn-dashboard-product-portal");
    setPortalContainer(container);
  }, []);

  const { data, isLoading, isError, errorMessage } = useAdminCategories(
    parseInt(page),
    10,
  );

  console.log({ data });

  return (
    <>
      {portalContainer &&
        createPortal(
          <Button className="bg-amber-800 hover:bg-amber-500" asChild>
            <Link to="/dashboard/category/add">
              <Plus className="size-4" />
              <span className="hidden md:block">Tambah Kategori</span>
            </Link>
          </Button>,
          portalContainer,
        )}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Daftar Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState className="w-full min-h-64" />
          ) : isError ? (
            <ErrorState className="w-full min-h-64" message={errorMessage!} />
          ) : data?.data.length === 0 ? (
            <EmptyState
              className="w-full min-h-64"
              message="Belum ada data produk"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/dashboard/category/${product.id}/edit`}>
                          <Edit className="size-4" />
                        </Link>
                      </Button>
                      <DeleteCategory categoryId={product.id} />
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
                    current_page: parseInt(page),
                  }
                : undefined
            }
            className="mt-4"
          />
        </CardContent>
      </Card>
    </>
  );
}
