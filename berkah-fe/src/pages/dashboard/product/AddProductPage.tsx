import { Button } from "@/components/ui/button";
import AddProductCard from "@/features/dashboard/product/components/AddProductCard";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function AddProductPage() {
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);

  useEffect(() => {
    const container = document.getElementById("btn-dashboard-product-portal");
    setPortalContainer(container);
  }, []);

  return (
    <>
      {portalContainer &&
        createPortal(
          <Button className="bg-amber-800 hover:bg-amber-500" asChild>
            <Link to="/dashboard/product">
              <MoveLeft className="size-4" />
              <span className="hidden md:block">Kembali</span>
            </Link>
          </Button>,
          portalContainer,
        )}
      <div className="md:w-1/2">
        <AddProductCard />
      </div>
    </>
  );
}
