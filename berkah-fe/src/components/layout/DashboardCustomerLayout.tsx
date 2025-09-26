import PageTitle from "@/components/dashboard/PageTitle";
import { Outlet } from "react-router-dom";

export default function DashboardCustomerLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-full flex-row items-center justify-between gap-4">
        <PageTitle title="Kelola Pelanggan" />
      </div>
      <Outlet />
    </div>
  );
}
