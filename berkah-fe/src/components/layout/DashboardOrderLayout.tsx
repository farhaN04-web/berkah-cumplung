import PageTitle from "@/components/dashboard/PageTitle";
import { useRef } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardOrderLayout() {
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-full flex-row items-center justify-between gap-4">
        <PageTitle title="Kelola Pesanan" />
        <div id="btn-dashboard-order-portal" ref={portalRef}></div>
      </div>

      <Outlet />
    </div>
  );
}
