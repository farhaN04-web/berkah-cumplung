import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  id: string;
  stok: number;
};

export const ProductCard = ({
  name,
  price,
  image,
  id,
  stok,
}: ProductCardProps) => {
  return (
    <Link to={`/catalog/${id}`}>
      <Card className="flex flex-col w-full overflow-hidden">
        <CardContent className="p-0">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
            alt={name}
            className="h-[250px] w-full object-cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 space-y-1">
          <p className="text-sm text-gray-800">{name}</p>
          <p className="font-bold text-brown-600">
            Rp{price.toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-gray-800">Stok: {stok}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
