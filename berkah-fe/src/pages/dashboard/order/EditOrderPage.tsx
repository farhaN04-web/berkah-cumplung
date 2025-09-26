import { Button } from "@/components/ui/button";
import DetailOrderCard from "@/features/dashboard/order/components/DetailOrderCard";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";

export default function EditOrderPage() {
  const { orderId } = useParams();
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);

  useEffect(() => {
    const container = document.getElementById("btn-dashboard-order-portal");
    setPortalContainer(container);
  }, []);

  return (
    <>
      {portalContainer &&
        createPortal(
          <Button className="bg-amber-800 hover:bg-amber-500" asChild>
            <Link to="/dashboard/order">
              <MoveLeft className="mr-2 size-4" />
              Kembali
            </Link>
          </Button>,
          portalContainer,
        )}
      <div className="space-y-4 md:w-3/4">
        <DetailOrderCard orderId={orderId!} />
      </div>
    </>
  );
}
