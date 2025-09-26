import PageTitle from "@/components/dashboard/PageTitle";
import { Outlet } from "react-router-dom";

export default function DashboardOrderStatsLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between w-full h-12 gap-4">
        <PageTitle title="Statistik Penjualan" />
      </div>
      <Outlet />
    </div>
  );
}
