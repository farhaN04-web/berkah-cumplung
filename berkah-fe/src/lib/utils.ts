import { CheckoutItemDTO } from "@/server/dto/cart.dto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

export function sendMessageToWhatsapp(request: CheckoutItemDTO) {
  let message = "Halo, saya ingin memesan produk berikut:\n";

  request.items.forEach((item) => {
    message += `- ${item.productName} (${item.qty}x) - ${formatRupiah(item.price)}\n`;
  });

  message += `\nNo. Pesanan: ${request.orderId}`;

  const url = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export function statusWords(status: string) {
  switch (status) {
    case "success":
      return "berhasil";
    case "failed":
      return "gagal";
    default:
      return "menunggu";
  }
}
