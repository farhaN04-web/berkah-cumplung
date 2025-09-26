import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatRupiah } from "@/lib/utils";

type LatestOrderItemProps = {
  code: string;
  name: string;
  price: number;
  date: string;
};

export default function LatestOrderItem({
  code,
  name,
  price,
  date,
}: LatestOrderItemProps) {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between">
        <CardHeader className="p-4">
          <CardTitle className="font-medium text-md md:text-xl">
            {code}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            {name}
          </CardDescription>
        </CardHeader>
        <CardHeader className="items-end p-4">
          <CardTitle className="font-medium text-md md:text-xl">
            {formatRupiah(price)}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            {formatDate(date)}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
}
