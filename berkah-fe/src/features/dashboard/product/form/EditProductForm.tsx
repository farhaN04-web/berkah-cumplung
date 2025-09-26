import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UpdateProductSchema } from "@/schemas/product";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

type EditProductFormProps = {
  onSubmit: (values: UpdateProductSchema) => void;
  categories: { id: string; name: string }[];
};

export const EditProductForm = (props: EditProductFormProps) => {
  const form = useFormContext<UpdateProductSchema>();

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Produk</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukkan nama produk"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-2">
            <FormLabel>Kategori Produk</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? props.categories.find((cat) => cat.id === field.value)
                          ?.name
                      : "Pilih Kategori"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="p-0"
                style={{ width: "100%" }}
              >
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {props.categories.map((cat) => (
                        <CommandItem
                          key={cat.id}
                          value={cat.name}
                          onSelect={() => {
                            field.onChange(cat.id);
                          }}
                        >
                          {cat.name}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              cat.id === field.value
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
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga Produk</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute text-sm -translate-y-1/2 left-3 top-1/2">
                  Rp
                </span>
                <Input
                  type="text"
                  className="pl-9"
                  value={
                    field.value
                      ? field.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      : ""
                  }
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    field.onChange(numericValue);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stok Produk</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={field.value || ""}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  field.onChange(numericValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deskripsi Produk</FormLabel>
            <FormControl>
              <Textarea placeholder="Deskripsi produk" {...field} rows={6} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormLabel>Gambar Produk</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    form.setValue("image", file as File);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CardFooter className="flex flex-row justify-end gap-4 p-0 pt-2">
        <Button variant="outline" asChild>
          <Link to="/dashboard/product">Batal</Link>
        </Button>
        <Button type="submit" className="bg-amber-800 hover:bg-amber-500">
          Simpan
        </Button>
      </CardFooter>
    </form>
  );
};
