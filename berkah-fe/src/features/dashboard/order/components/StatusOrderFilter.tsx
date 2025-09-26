import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const statusOptions = [
  { label: "Semua Status", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Berhasil", value: "success" },
  { label: "Gagal", value: "failed" },
];

export function OrderStatusFilter() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentStatus = searchParams.get("status") || "";

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status === "") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    params.set("page", "1");

    navigate(`?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filter Status:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {currentStatus
                ? statusOptions.find((option) => option.value === currentStatus)
                    ?.label
                : "Semua Status"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {statusOptions.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.label}
                      onSelect={() => handleStatusChange(status.value)}
                    >
                      {status.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          status.value === currentStatus
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
