import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, Navigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSession } from "@/hooks/useSession";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FullScreenLoading } from "@/components/layout/Loading";

export default function DashboardLayout() {
  const { session, sessionLoading } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!sessionLoading && session?.user.role !== "admin") {
      toast.error("Anda tidak memiliki akses ke halaman ini");
      setShouldRedirect(true);
    }
  }, [session, sessionLoading]);

  if (sessionLoading) {
    return <FullScreenLoading />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
