import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// DTO/Type KHUSUS untuk data yang dibutuhkan oleh pesan WhatsApp
export type WhatsappMessageDTO = {
  orderId: string; // Akan diisi dari `code` pada respons checkout
  items: {
    productName: string;
    qty: number;
    price: number; // Ini adalah subtotal per item (harga * qty)
  }[];
  expedition: string; // Nama ekspedisi yang dipilih dari dropdown
};

export function sendMessageToWhatsapp(request: WhatsappMessageDTO) {
  let message = "Halo, saya ingin memesan produk berikut:\n";

  request.items.forEach((item) => {
    message += `- ${item.productName} (${item.qty}x) - ${formatRupiah(
      item.price
    )}\n`;
  });

  // Tambahkan info Ekspedisi ke dalam pesan
  message += `\nEkspedisi: ${request.expedition}`;
  message += `\nNo. Pesanan: ${request.orderId}`;

  const url = `https://wa.me/${
    import.meta.env.VITE_WHATSAPP_NUMBER
  }?text=${encodeURIComponent(message)}`;
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