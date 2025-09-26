import { formatRupiah } from "@/lib/utils";

type DetailOrderItemProps = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  subTotal: number;
  image: string;
};

export default function DetailOrderItem({
  productName,
  productPrice,
  productQuantity,
  subTotal,
  image,
}: DetailOrderItemProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full py-4 border-b last:border-b-0">
      <div className="flex flex-row items-start w-full h-full gap-4">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
          alt={productName}
          className="object-cover rounded-md size-32"
        />
        <div className="flex flex-col justify-between w-full md:flex-row md:items-center">
          <div className="space-y-1">
            <h3 className="font-medium">{productName}</h3>
            <p>
              {formatRupiah(productPrice)} x {productQuantity}
            </p>
          </div>
          <p className="font-medium">{formatRupiah(subTotal)}</p>
        </div>
      </div>
    </div>
  );
}
