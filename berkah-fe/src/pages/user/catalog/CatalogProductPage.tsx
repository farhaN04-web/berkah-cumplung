import { PaginationWrapper } from "@/components/layout";
import { ErrorState, ProductLoading } from "@/components/layout/Loading";
import { ProductSearch } from "@/components/ui/input-search";
import { ProductCard } from "@/components/user/ProductCard";
import { useCategories } from "@/hooks/useCategory";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams } from "react-router-dom";

const CatalogProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useCategories();

  const categoryId = searchParams.get("categoryId") || "";
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";

  const { data, isLoading, isError, errorMessage } = useProducts(
    query,
    parseInt(page),
    8,
    categoryId,
  );

  return (
    <div className="container px-4 py-10 mx-auto space-y-10">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-amber-800 md:text-[32px]">
          Katalog Produk
        </h1>
        <ProductSearch />
        <div className="flex flex-wrap items-center gap-2">
          {/* Tombol Hapus Filter */}
          {categoryId && (
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("categoryId");
                params.set("page", "1");
                setSearchParams(params);
              }}
              className="px-4 py-2 text-sm text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-50"
            >
              Hapus Filter
            </button>
          )}

          {/* Tombol-tombol kategori */}
          {categories?.data.map((cat) => {
            const isSelected = categoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  if (isSelected) {
                    params.delete("categoryId");
                  } else {
                    params.set("categoryId", cat.id);
                  }
                  params.set("page", "1");
                  setSearchParams(params);
                }}
                className={`rounded-full border px-4 py-2 text-sm ${
                  isSelected
                    ? "bg-amber-800 text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        {isLoading ? (
          [...Array(4)].map((_, index) => <ProductLoading key={index} />)
        ) : isError ? (
          <ErrorState message={errorMessage!} />
        ) : (
          <>
            {data?.data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                stok={product.stock}
              />
            ))}
          </>
        )}
      </div>
      <PaginationWrapper
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        paging={
          data?.paging
            ? {
                ...data.paging,
                current_page: parseInt(page),
              }
            : undefined
        }
      />
    </div>
  );
};

export default CatalogProductPage;
