import { ResetPasswordForm } from "@/features/auth/form/ResetPasswordForm";

export const ResetPasswordPage = () => {
  return (
    <main className="grid flex-1 place-content-center">
      <div className="w-[400px] space-y-4 rounded-lg border p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Buat Kata Sandi Baru</h1>
          <p className="text-sm text-gray-500">
            Kata sandi baru Anda harus berbeda dari yang sebelumnya.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </main>
  );
};