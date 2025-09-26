import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCartItem } from "@/hooks/useCart";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteCartItem({ cartId }: { cartId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteCartItem, isPending } = useDeleteCartItem();

  const handleDelete = () => {
    deleteCartItem(
      { cartId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          size="icon"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Item Keranjang</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus item keranjang ini? Tindakan ini
            tidak dapat dibatalkan dan akan menghapus item keranjang secara
            permanen dari sistem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Hapus Item"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
