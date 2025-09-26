import { formatRupiah } from "@/lib/utils";

type HistoryDetailItemProps = {
  image: string;
  product_name: string;
  quantity: number;
  price: number;
};

export default function HistoryDetailItem({
  image,
  product_name,
  quantity,
  price,
}: HistoryDetailItemProps) {
  return (
    <div className="flex flex-row items-center gap-4 border-b py-4 first:pt-0 last:mb-0 last:border-b-0 last:pb-0">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
        alt={product_name}
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{product_name}</span>
        <span className="text-xs text-neutral_500 md:text-sm">
          {formatRupiah(price)} x {quantity}
        </span>
      </div>
      <div className="text-bold ml-auto text-xs font-semibold md:text-sm">
        {formatRupiah(price * quantity)}
      </div>
    </div>
  );
}
