import { ProductCard } from "@/components/user/ProductCard";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: productList, isLoading, isError, errorMessage } = useProducts();

  const topProduct = useMemo(
    () => productList?.data.slice(0, 3),
    [productList?.data],
  );

  return (
    <div className="w-full">
      <section className="relative flex h-[90vh] items-center justify-center px-4 text-center md:h-[70vh]">
        <div className="absolute inset-0 bg-[url('/images/header.png')] bg-cover bg-center bg-no-repeat"></div>

        <div className="relative z-10 text-white">
          <h1 className="mb-6 text-[36px] font-bold md:text-5xl lg:text-[56px]">
            Pusat Kerajinan Kayu Handmade
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl">
            Ciptakan dapur yang hangat dan estetik dengan
            <br className="hidden sm:block" /> peralatan fungsional dari kayu dan batok kelapa.
          </p>
          <Link to="/catalog">
            <Button className="text-base rounded-full bg-amber-800 hover:bg-amber-500 md:text-lg">
              Lihat Katalog <ArrowRight />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-10 bg-amber-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
            Tentang Berkah Cumplung
          </h2>
          <p className="mx-auto text-lg text-black max-w-7xl md:text-2xl">
            Tidak hanya kayu atau batok kelapa yang memiliki nilai guna, tetapi juga dapat menjadi ornamen <br className="hidden sm:block" />indah yang menghadirkan kebahagiaan bagi siapa pun yang melihatnya. Hal inilah yang selalu kami{" "}
            <br className="hidden sm:block" />  tampilkan pada setiap karya, dengan desain yang melibatkan banyak detail alami serta sentuhan finishing yang menarik.
          </p>
          <p className="mx-auto my-6 text-lg text-black max-w-7xl md:text-2xl">
            Kreativitas seorang pengrajin yang berawal dari sebuah hobi sederhana, hingga pada <br className="hidden sm:block" /> tahun 2021 menghadirkan karya yang mampu menarik minat banyak orang, baik anak-anak
            <br className="hidden sm:block" /> maupun dewasa, berupa produk kerajinan unik dengan nilai seni yang tinggi.
          </p>
          <Link to="/about">
            <Button className="text-base text-black bg-white border border-neutral-300 hover:bg-neutral-300 md:text-lg">
              Baca Selengkapnya
            </Button>
          </Link>
        </div>
      </section>
      {/* About Section End */}

      {/* Product Section Start */}
      <section className="py-10">
        <div className="container px-4 mx-auto">
          <div className="mb-10 text-center">
            <h1 className="mb-8 text-2xl font-bold text-amber-800 md:text-[32px]">
              Produk Unggulan
            </h1>
            <p className="mx-auto text-lg max-w-7xl text-neutral_500 md:text-2xl">
              Produk sulaman handmade dengan desain yang unik dan berkualitas
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {isLoading ? (
              <LoadingState className="w-full min-h-64" />
            ) : isError ? (
              <ErrorState className="w-full min-h-64" message={errorMessage!} />
            ) : productList?.data.length === 0 ? (
              <EmptyState
                className="w-full min-h-64"
                message="Belum ada produk"
              />
            ) : (
              topProduct?.map((product) => (
                <ProductCard
                  stok={product.stock}
                  key={product.id}
                  {...product}
                />
              ))
            )}
          </div>
          <div className="pt-8 text-center">
            <Link to="/catalog">
              <Button className="text-base bg-amber-800 hover:bg-amber-500 hover:opacity-90 md:text-lg">
                Lihat Semua Produk <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </div>
  );
};

export default HomePage;
