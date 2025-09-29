import { ErrorState, LoadingState } from "@/components/layout";
import HistoryItem from "@/features/history/components/HistoryItem";
import { useOrderHistory } from "@/hooks/useOrderHistory";

const HistoryPage = () => {
  const { data, isLoading, isError, errorMessage } = useOrderHistory();

  return (
    <div className="min-h-[calc(100vh-20rem)]">
      <div className="container mx-auto space-y-10 px-4 py-10">
        <h1 className="mb-10 text-2xl font-bold text-amber-800 md:text-[32px]">
          Riwayat Pesanan
        </h1>
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState
            message={errorMessage || "Gagal memuat riwayat pesanan"}
          />
        ) : (
          <div className="space-y-4">
            {data?.data.map((history, idx) => (
              <HistoryItem
                key={idx}
                code={history.code}
                date={history.createdAt}
                status={history.status}
                shipping_status={history.shipping_status}
                shipping_number={history.shipping_number}
                total={history.total}
                details={history.TransactionDetails.map((detail) => ({
                  image: detail.product.image,
                  name: detail.product.name,
                  quantity: detail.qty,
                  price: detail.price,
                }))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
