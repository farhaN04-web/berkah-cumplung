import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

type LogoutProps = {
  isDashboard?: boolean;
};

export default function Logout({ isDashboard = false }: LogoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signOut = useSignOut();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut("/");
      setIsOpen(false);
    } catch (error) {
      toast.error("Gagal keluar");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className="w-full" asChild>
        {isDashboard ? (
          <Button
            variant="ghost"
            className="W-full justify-start rounded-none px-6 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="mr-1 !size-5" />
            Logout
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-destructive text-lg text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Keluar
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Keluar...
              </>
            ) : (
              "Keluar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
