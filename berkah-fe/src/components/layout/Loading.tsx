import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter } from "../ui/card";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function FullScreenLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}

export function LoadingState({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}

export function ErrorState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
}

export function EmptyState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ProductLoading() {
  return (
    <Card className="flex w-full flex-col overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-1 p-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-6 w-full" />
      </CardFooter>
    </Card>
  );
}
