import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSignOut } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import {
  History,
  LayoutDashboard,
  Loader2,
  LogOut,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menus = [
  {
    label: "Profil",
    href: "/profile",
    icon: UserCircle2,
  },
  {
    label: "Riwayat Pemesanan",
    href: "/history",
    icon: History,
  },
];

export function ProfileMenu() {
  const { session, sessionLoading } = useSession();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signOut = useSignOut();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut("/");
      setIsAlertOpen(false);
    } catch (error) {
      toast.error("Gagal keluar");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsAlertOpen(true);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="p-0 m-0 rounded-full h-fit w-fit">
          {sessionLoading ? (
            <Loader2 className="size-10 animate-spin" />
          ) : (
            <div className="flex flex-row items-center gap-2">
              <Avatar className="size-8 md:size-10">
                <AvatarImage
                  src={
                    session?.user.photo
                      ? `${import.meta.env.VITE_API_BASE_URL}/${session?.user.photo}`
                      : "https://github.com/shadcn.png"
                  }
                  alt={session?.user.name ?? "User"}
                  className="object-cover cursor-pointer"
                />
                <AvatarFallback>
                  {session?.user?.name![0]!.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{session?.user.name}</p>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative space-y-1 left-3 w-60 md:right-16">
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name ?? ""}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session?.user.role === "admin" && (
            <DropdownMenuItem className="p-0">
              <Link
                to="/dashboard"
                className="inline-flex w-full min-w-48 items-center rounded px-2 py-1.5 hover:cursor-pointer"
              >
                <LayoutDashboard className="mr-4 size-2" />
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          {menus.map((menu, idx) => (
            <DropdownMenuItem key={idx}>
              <Link
                to={menu.href}
                className="inline-flex items-center w-full rounded min-w-48 hover:cursor-pointer"
              >
                <menu.icon className="mr-4 size-2" />
                {menu.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="inline-flex w-full min-w-48 items-center text-destructive hover:cursor-pointer hover:!bg-destructive hover:!text-destructive-foreground"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-2 size-2" />
            <p>Keluar</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
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
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Keluar...
                </>
              ) : (
                "Keluar"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
