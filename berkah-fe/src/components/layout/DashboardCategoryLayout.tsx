import PageTitle from "@/components/dashboard/PageTitle";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardCategoryLayout() {
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between w-full h-12 gap-4">
        <PageTitle title="Kelola Kategori" />
        <div id="btn-dashboard-product-portal" ref={portalRef}></div>
      </div>
      <Outlet />
    </div>
  );
}
