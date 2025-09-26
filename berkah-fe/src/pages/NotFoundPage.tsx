import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <img src="/images/illustration.png" alt="Illustration" className="w-72 h-auto"/>
      <p className="text-center text-xl font-bold text-black sm:text-2xl">
        Ups, halaman tidak ditemukan
      </p>
      <div className="text-center text-xs text-neutral_500 sm:text-base">
        <p>Mungkin benangmu tersangkut dan arahnya jadi melenceng.</p>
        <p>Yuk, kembali menjahit ke halaman yang benar</p>
      </div>
      <Link to="/">
        <Button className="rounded-lg bg-amber-800 text-xs font-medium hover:bg-amber-500 hover:opacity-90 sm:text-sm">
          Kembali
        </Button>
      </Link>
    </main>
  );
};

export default NotFoundPage;
