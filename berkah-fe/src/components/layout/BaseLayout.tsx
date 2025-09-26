import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
