import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UpdateOrderStatusSchema } from "@/schemas/order";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type UpdateOrderStatusProps = {
  onSubmit: (values: UpdateOrderStatusSchema) => void;
};

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Berhasil", value: "success" },
  { label: "Gagal", value: "failed" },
];

export const UpdateOrderStatusForm = (props: UpdateOrderStatusProps) => {
  const form = useFormContext<UpdateOrderStatusSchema>();

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "shipping_status" && value.shipping_status !== "success") {
        form.setValue("shipping_number", "");
      }

      if (name === "status" && value.status !== "success") {
        form.setValue("shipping_status", "pending");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <form
      onSubmit={form.handleSubmit(props.onSubmit)}
      className="flex flex-col items-center w-full gap-2 space-y-2 md:w-auto md:flex-row md:space-y-0"
    >
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full space-y-2 md:w-auto">
            <FormLabel>Status Pembayaran</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between md:w-[200px]",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? statusOptions.find(
                          (statusOptions) =>
                            statusOptions.value === field.value,
                        )?.label
                      : "Pilih Status"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {statusOptions.map((status) => (
                        <CommandItem
                          value={status.label}
                          key={status.value}
                          onSelect={() => {
                            form.setValue(
                              "status",
                              status.value as "pending" | "success" | "failed",
                            );
                          }}
                        >
                          {status.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              status.value === field.value
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
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping_status"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full space-y-2 md:w-auto">
            <FormLabel>Status Pengiriman</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between md:w-[200px]",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={form.watch("status") !== "success"}
                  >
                    {field.value
                      ? statusOptions.find((opt) => opt.value === field.value)
                          ?.label
                      : "Status Pengiriman"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {statusOptions.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.label}
                          onSelect={() =>
                            form.setValue(
                              "shipping_status",
                              status.value as "pending" | "success" | "failed",
                            )
                          }
                        >
                          {status.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              status.value === field.value
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
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping_number"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full space-y-2">
            <FormLabel>Nomor Resi</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nomor resi"
                {...field}
                disabled={form.watch("shipping_status") !== "success"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
