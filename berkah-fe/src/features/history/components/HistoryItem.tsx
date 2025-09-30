import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import HistoryDetailItem from "./HistoryDetailItem";
import { cn, formatDate, formatRupiah, statusWords } from "@/lib/utils";

type HistoryItemProps = {
  code: string;
  date: string;
  status: string;
  shipping_status: string;
  shipping_number: string;
  total: number;
  details: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export default function HistoryItem({
  code,
  date,
  status,
  shipping_status,
  total,
  details,
}: HistoryItemProps) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={code} className="border rounded-lg">
        <div className="flex items-start justify-between p-4">
          <div>
            <p className="text-sm font-medium text-black md:text-base">
              Pesanan #{code}
            </p>
            <p className="text-xs text-neutral_500 md:text-sm">
              Tanggal: {formatDate(date)}
            </p>
            {shipping_status == "success" && (
              <p className="text-xs text-neutral_500 md:text-sm">
              </p>
            )}
          </div>
          <div className="space-y-4 text-right md:space-y-2">
            <div className="flex flex-col space-x-4 space-y-2 md:flex-row md:space-y-0">
              <div className="flex flex-col space-x-2 md:flex-row">
                <p className="text-xs md:text-sm">Status Pembayaran:</p>
                <div>
                  <Badge
                    className={cn(
                      "capitalize",
                      status === "pending" && "bg-yellow-100 text-amber-700",
                      status === "success" && "bg-green-100 text-green-600",
                      status === "failed" && "bg-red-100 text-destructive",
                    )}
                  >
                    {statusWords(status)}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col space-x-2 md:flex-row">
                <p className="text-xs md:text-sm">Status Pengiriman:</p>
                <div>
                  <Badge
                    className={cn(
                      "capitalize",
                      shipping_status === "pending" &&
                        "bg-yellow-100 text-amber-700",
                      shipping_status === "success" &&
                        "bg-green-100 text-green-600",
                      shipping_status === "failed" &&
                        "bg-red-100 text-destructive",
                    )}
                  >
                    {statusWords(shipping_status)}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-black md:text-sm">
              {formatRupiah(total)}
            </p>
          </div>
        </div>
        <AccordionTrigger
          onClick={() => setAccordionOpen(!accordionOpen)}
          data-state={accordionOpen ? "open" : "closed"}
          className="px-4 py-2 text-xs text-black hover:underline md:text-sm"
        >
          {accordionOpen ? "Sembunyikan Detail" : "Lihat Detail"}
        </AccordionTrigger>
        <AccordionContent className="p-4 border-t">
          {details.length > 0 ? (
            details.map((item, idx) => (
              <HistoryDetailItem
                key={idx}
                image={item.image}
                product_name={item.name}
                quantity={item.quantity}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-sm text-neutral_500 md:text-sm">
              Tidak ada detail.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
