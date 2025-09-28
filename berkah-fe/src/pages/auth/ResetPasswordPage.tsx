import { Link, useLocation } from "react-router-dom";
import { ResetPasswordForm } from "@/features/auth/form/ResetPasswordForm";
import { Button } from "@/components/ui/button";

const ResetPasswordPage = () => {
  // Gunakan useLocation untuk mengakses state yang dikirim via navigate()
  const location = useLocation();
  const email = location.state?.email as string; // Ambil email dari state

  return (
    <main className="grid flex-1 place-content-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Buat Kata Sandi Baru</h1>
          <p className="text-sm text-gray-500">
            Kata sandi baru Anda harus berbeda dari yang sebelumnya.
          </p>
        </div>

        {/* Lakukan pengecekan, jika ada email, tampilkan form */}
        {email ? (
          <div>
            <p className="mb-4 text-center text-sm">
              Anda akan mengatur ulang kata sandi untuk akun: <br />
              <span className="font-semibold">{email}</span>
            </p>
            <ResetPasswordForm email={email} />
          </div>
        ) : (
          // Jika tidak ada email (misal, user akses URL langsung), tampilkan pesan error
          <div className="text-center text-sm text-red-600">
            <p className="font-semibold">Sesi Tidak Valid</p>
            <p>
              Kami tidak bisa menemukan email Anda. Silakan ulangi proses dari
              awal.
            </p>
            <Button variant="link" asChild className="mt-2">
              <Link to="/forgot-password">Kembali ke Lupa Password</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordPage;