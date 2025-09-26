import { Button } from "@/components/ui/button";
import EditCategoryCard from "@/features/dashboard/category/components/EditCategoryCard";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";

export default function EditCategoryPage() {
  const { categoryId } = useParams();

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
            <Link to="/dashboard/category">
              <MoveLeft className="mr-2 size-4" />
              Kembali
            </Link>
          </Button>,
          portalContainer,
        )}
      <div className="md:w-1/2">
        <EditCategoryCard categoryId={categoryId!} />
      </div>
    </>
  );
}
