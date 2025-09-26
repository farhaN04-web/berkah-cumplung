import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type PeriodType = "daily" | "monthly" | "yearly";

const PERIODS: { label: string; value: PeriodType }[] = [
  { label: "Hari", value: "daily" },
  { label: "Bulan", value: "monthly" },
  { label: "Tahun", value: "yearly" },
];

export function SalesFilter({
  period,
  value,
  onChange,
}: {
  period: PeriodType;
  value: string;
  onChange: (period: PeriodType, value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handlePeriodChange = (newPeriod: PeriodType) => {
    let newValue = "";

    if (newPeriod === "daily")
      newValue = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    if (newPeriod === "monthly")
      newValue = new Date().toISOString().slice(0, 7); // yyyy-mm
    if (newPeriod === "yearly") newValue = new Date().getFullYear().toString(); // yyyy

    onChange(newPeriod, newValue);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div className="w-full sm:w-60">
        <label className="block mb-1 text-sm font-medium">Periode</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between w-full"
              role="combobox"
              aria-expanded={open}
            >
              {PERIODS.find((item) => item.value === period)?.label ??
                "Pilih periode"}
              <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Cari..." />
              <CommandEmpty>Periode tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {PERIODS.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handlePeriodChange(item.value)}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          {period === "daily"
            ? "Tanggal"
            : period === "monthly"
              ? "Bulan"
              : "Tahun"}
        </label>
        {period === "daily" && (
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(period, e.target.value)}
          />
        )}
        {period === "monthly" && (
          <Input
            type="month"
            value={value}
            onChange={(e) => onChange(period, e.target.value)}
          />
        )}
        {period === "yearly" && (
          <Input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={value}
            onChange={(e) => onChange(period, e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
